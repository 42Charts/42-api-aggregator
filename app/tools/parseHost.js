const parseHost = (host) => {
  let splited = host;
  let post;
  let zone;
  let row;
  let cluster;
  let zoneNumber = null;
  let clusterNumber = null;

  const regexpNumbers = new RegExp('[0-9]+', 'g');
  const regexZone = new RegExp('[z]+[0-9]+', 'g');
  const regexCluster = new RegExp('[e,f]+[0-9]+', 'g');
  const regexRow = new RegExp('[r]+[0-9]+', 'g');
  const regexPost = new RegExp('[p,s]+[0-9]+', 'g');

  post = splited.match(regexPost);
  row = splited.match(regexRow);
  zone = splited.match(regexZone);
  cluster = splited.match(regexCluster);
  if (!post || !row || (!zone && !cluster)) {
    return null;
  }
  if (zone) {
    zone = zone[0];
    zoneNumber = parseInt(zone.match(regexpNumbers)[0], 10);
  }
  if (cluster) {
    cluster = cluster[0];
    clusterNumber = parseInt(cluster.match(regexpNumbers)[0], 10);
  }
  return {
    hostNotParsed: host,
    zone: {
      name: zone,
      number: zoneNumber,
    },
    cluster: {
      name: cluster,
      number: clusterNumber,
    },
    row: {
      name: row[0],
      number: parseInt(row[0].match(regexpNumbers)[0], 10),
    },
    host: {
      name: post[0],
      number: parseInt(post[0].match(regexpNumbers)[0], 10),
    },
  };
};

module.exports = parseHost;
