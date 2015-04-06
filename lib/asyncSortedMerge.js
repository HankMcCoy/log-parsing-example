var async = require('async'),
  compareHeadsByDate = require('./compareHeadsByDate');

function asyncSortedMerge(logs, printer) {
  function processNext(heads) {
    heads.sort(compareHeadsByDate);
    var oldest = heads.shift();
    printer.print(oldest.log);

    logs[oldest.srcIdx].popAsync(function (err, log) {
      if (log) {
        heads.push({
          srcIdx: oldest.srcIdx,
          log: log
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

      var heads = results
        .map(function (log, idx) {
          return { srcIdx: idx, log: log };
        })
        .filter(function (data) { return data.log !== false; });

      processNext(heads);
    }
  );
};

module.exports = asyncSortedMerge;
