var Log = require("./Logs").Log,
    Printer = require("./Logs").Printer,
    syncSortedMerge = require('./lib/syncSortedMerge'),
    asyncSortedMerge = require('./lib/asyncSortedMerge');

function getLogs() {
  return [
    new Log(),
    new Log(),
    new Log(),
    new Log(),
    new Log()
  ];
}

syncSortedMerge(getLogs(), new Printer());
asyncSortedMerge(getLogs(), new Printer());
