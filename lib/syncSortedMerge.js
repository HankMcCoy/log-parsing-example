var getSortedHeads = require('./getSortedHeads'),
  insertHead = require('./insertHead');

function syncSortedMerge(logSources, printer) {
  var oldest,
    nextLog,
    heads = getSortedHeads(logSources.map(function (logSource) {
      return logSource.pop();
    }));

  while (heads.length) {
    oldest = heads.shift();
    nextLog = logSources[oldest.srcIdx].pop();

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

