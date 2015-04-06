var compareHeadsByDate = require('./compareHeadsByDate');

function syncSortedMerge(logs, printer) {
  var heads = logs
    .map(function (log, idx) {
      return {
        sourceIndex: idx,
        log: log.pop(),
      };
    })
    .filter(function (data) {
      return data.log !== false;
    });

  // While some sources are still firing.
  while (heads.length) {
    // Find the oldest log of the current heads.
    heads.sort(compareHeadsByDate);

    var oldest = heads.shift();
    printer.print(oldest.log);

    // Move the head for the source.
    var nextLog = logs[oldest.sourceIndex].pop();
    if (nextLog) {
      heads.push({
        sourceIndex: oldest.sourceIndex,
        log: nextLog
      });
    }
  }
}

function syncSortedMerge2(logs, printer) {
  var heads = logs
    .map(function (log, idx) {
      return {
        sourceIndex: idx,
        log: log.pop(),
      };
    })
    .filter(function (data) {
      return data.log !== false;
    });
  var i;

  heads.sort(compareHeadsByDate);

  // While some sources are still firing.
  while (heads.length) {
    var oldest = heads.shift();
    printer.print(oldest.log);

    // Move the head for the source.
    var nextLog = logs[oldest.sourceIndex].pop();
    if (nextLog) {
      for (i = 0; i < heads.length; i++) {
        if (heads[i].log.date > nextLog.date)
          break;
      }

      heads.splice(i, 0, {
        sourceIndex: oldest.sourceIndex,
        log: nextLog
      });
    }
  }
};

module.exports = syncSortedMerge;

