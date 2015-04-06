var getSortedHeads = require('./getSortedHeads'),
  insertHead = require('./insertHead');

function syncSortedMerge(logs, printer) {
  var oldest,
    heads = getSortedHeads(logs.map(function (log) {
      return log.pop();
    }));

  while (heads.length) {
    oldest = heads.shift();
    printer.print(oldest.log);

    var nextLog = logs[oldest.srcIdx].pop();
    if (nextLog) {
      insertHead(heads, {
        srcIdx: oldest.srcIdx,
        log: nextLog
      });
    }
  }
};

module.exports = syncSortedMerge;

