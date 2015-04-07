var async = require('async'),
  asyncIterators = require('async-iterators'),
  getSortedHeads = require('./getSortedHeads'),
  insertHead = require('./insertHead');

function asyncSortedMerge(logs, printer) {
  var logIterators = logs.map(function (logSource) {
    return asyncIterators.buffer({
      next: function (cb) {
        logSource.popAsync(function (err, value) {
          cb(err, value || undefined);
        });
      }
    }, 10)
  });

  function processNext(heads) {
    var oldest = heads.shift();

    printer.print(oldest.log);

    logIterators[oldest.srcIdx].next(function (err, nextLog) {
      if (nextLog) {
        insertHead(heads, {
          srcIdx: oldest.srcIdx,
          log: nextLog
        });
      }

      if (heads.length) {
        processNext(heads);
      }
    });
  }

  async.series(
    logIterators.map(function (iterator) {
      return iterator.next;
    }),
    function startProcessing(err, results) {
      if (err) {
        throw err;
      }

      processNext(getSortedHeads(results));
    }
  );
};

module.exports = asyncSortedMerge;

