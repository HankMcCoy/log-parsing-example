var async = require('async'),
  getSortedHeads = require('./getSortedHeads'),
  insertHead = require('./insertHead');

function asyncSortedMerge(logs, printer) {
  function processNext(heads) {
    var oldest = heads.shift();

    printer.print(oldest.log);

    logs[oldest.srcIdx].popAsync(function (err, nextLog) {
      if (nextLog) {
        insertHead(heads, {
          srcIdx: oldest.srcIdx,
          log: nextLog
        });
      }

      if (heads.length)
        processNext(heads);
    });
  }

  async.series(
    logs.map(function (log) {
      return log.popAsync.bind(log);
    }),
    function (err, results) {
      if (err)
        throw err;

      processNext(getSortedHeads(results));
    }
  );
};

module.exports = asyncSortedMerge;

