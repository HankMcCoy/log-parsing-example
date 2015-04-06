function insertIntoSortedList(heads, newHead) {
  for (var i = 0; i < heads.length; i++) {
    if (heads[i].log.date > newHead.log.date)
      break;
  }

  heads.splice(i, 0, newHead);
}

module.exports = insertThenSort;
