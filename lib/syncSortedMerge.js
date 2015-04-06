var getSortedHeads = require('./getSortedHeads'),
  insertHead = require('./insertHead');

function syncSortedMerge(logs, printer) {
  var oldest,
    nextLog,
    heads = getSortedHeads(logs.map(function (log) {
      return log.pop();
    }));

  while (heads.length) {
    oldest = heads.shift();
    nextLog = logs[oldest.srcIdx].pop();

    printer.print(oldest.log);

    if (nextLog) {
      insertHead(heads, {
        srcIdx: oldest.srcIdx,
        log: nextLog
      });
    }
  }
};

module.exports = syncSortedMerge;

