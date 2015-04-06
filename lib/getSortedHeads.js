function getSortedHeads(logs) {
  var heads = logs
    .map(function getHead(log, idx) {
      return {
        srcIdx: idx,
        log: log
      };
    })
    .filter(function isntDone(data) {
      return data.log !== false;
    });

  heads.sort(function compareHeadsByDate(a, b) {
    return a.log.date - b.log.date;
  });

  return heads;
}

module.exports = getSortedHeads;
