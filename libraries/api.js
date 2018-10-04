const fetch = require('node-fetch');
const Bottleneck = require('bottleneck');

let APItoken = null;

const limiter = new Bottleneck({
  maxConcurrent: 2,
  minTime: 1000 / process.env.FT_API_RATE_LIMIT_PER_SECOND || 500,
  reservoir: process.env.FT_API_RATE_LIMIT_PER_HOUR || 1200,
  reservoirRefreshAmount: process.env.FT_API_RATE_LIMIT_PER_HOUR || 1200,
  reservoirRefreshInterval: 60 * 1000 * 60, // one hour
});

const call = (endpoint, method, params, body, headers, force) => {
  let currentDate = new Date();
  currentDate.setUTCHours(13);
  currentDate = currentDate.getTime() / 1000;
  if (!force && (!APItoken || (APItoken.created_at + APItoken.expires_in) < currentDate)) {
    return getToken()
      .then((token) => {
        APItoken = token;
        return call(endpoint, method, params, body, headers);
      });
  }
  return new Promise((resolve, reject) => {
    let url = `${process.env.FT_API_ENDPOINT}${endpoint}`;
    if (params) {
      url += '?';
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          url += `${key}=${params[key]}&`;
        } else {
          url += `${key}&`;
        }
      });
    }
    let fetchHeaders = headers || {};
    if (APItoken) {
      fetchHeaders.Authorization = `Bearer ${APItoken.access_token}`;
    }
    console.info('New Api Call', url);
    limiter.schedule(() => fetch(url, {
      method,
      body,
      headers: fetchHeaders,
      timeout: 25000, // 25 sec we are not to picky with 42Api
    }))
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          return reject(json);
        }
        resolve(json);
      })
      .catch(err => reject(err));
  });
};


const getToken = () => call('/oauth/token', 'POST', {
  grant_type: 'client_credentials',
  client_id: process.env.FT_API_UID,
  client_secret: process.env.FT_API_SECRET,
}, null, null, true);

const getCampus = () => call('/v2/campus', 'GET', {
  'page[size]': 100,
});

const getCoalitions = () => call('/v2/coalitions', 'GET', {
  'page[size]': 100,
});

const getCursus = () => call('/v2/cursus', 'GET', {
  'page[size]': 100,
});

const getProjects = (page, size) => call('/v2/projects', 'GET', {
  'page[number]': page,
  'page[size]': size,
});

const getSubProjects = (projectId) => call(`/v2/projects/${projectId}/projects`, 'GET', {
  'page[size]': 30,
});

module.exports = {
  getCampus,
  getCoalitions,
  getCursus,
  getProjects,
  getSubProjects,
};
