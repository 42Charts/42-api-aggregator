const parseHost = (host) => {
  let splited = host;
  const regexp = new RegExp('[^0-9]+[0-9]+', 'g');
  const regexpNumbers = new RegExp('[0-9]+', 'g');

  splited = splited.match(regexp);
  if (!splited || !splited.length || !splited[0] || !splited[1] || !splited[2]) {
    return null;
  }
  return {
    hostNotParsed: host,
    cluster: {
      name: splited[0],
      number: parseInt(splited[0].match(regexpNumbers)[0], 10),
    },
    row: {
      name: splited[1],
      number: parseInt(splited[1].match(regexpNumbers)[0], 10),
    },
    host: {
      name: splited[2],
      number: parseInt(splited[2].match(regexpNumbers)[0], 10),
    },
  };
};

module.exports = parseHost;
