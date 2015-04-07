/**
 * Takes a list of first logs, one from each log source, and returns a
 * list of heads sorted by log date.
 *
 * A head in this case refers to a representation of the most recent log
 * from a log source as well as an index indicating which log source it
 * came from.
 *
 * I didn't bother optimizing this code since it's only called once at
 * the start of the merge operation.
 */
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
