var async = require('async'),
  asyncIterators = require('async-iterators'),
  getSortedHeads = require('./getSortedHeads'),
  insertHead = require('./insertHead');

function asyncSortedMerge(logSources, printer) {
  var logIterators = getBufferedIterators(logSources);

  function processNext(heads) {
    var oldestHead = heads.shift();

    printer.print(oldestHead.log);

    logIterators[oldestHead.srcIdx].next(function (err, nextLog) {
      if (nextLog) {
        insertHead(heads, {
          srcIdx: oldestHead.srcIdx,
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
    function (err, results) {
      if (err) {
        throw err;
      }

      processNext(getSortedHeads(results));
    }
  );
};

/**
 * Converts log sources to iterators with a buffer size 10.
 *
 * Switching to buffered iterators, instead of just calling popAsync
 * every time I needed the next value, decreased the runtime of the
 * asyncSortedMerge from about 40 seconds to about 8.
 *
 * Allowing all the log sources to buffer up the next 10 items
 * significantly increased efficiency, by not wasting time just sitting
 * there doing nothing while waiting for the next item we need on the
 * current log source.
 */
function getBufferedIterators(logSources) {
  return logSources.map(function (logSource) {
    return asyncIterators.buffer({
      next: function (callback) {
        // Call the callback with `undefined` instead of `false` since
        // that's what async-iterator is expecting.
        logSource.popAsync(function (err, value) {
          callback(err, value || undefined);
        });
      }
    }, 10);
  });
}

module.exports = asyncSortedMerge;

