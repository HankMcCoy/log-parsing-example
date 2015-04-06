function insertHead(heads, newHead) {
  for (var i = 0; i < heads.length; i++) {
    if (heads[i].log.date > newHead.log.date)
      break;
  }

  // Add the new head into the list, sorted by date.
  heads.splice(i, 0, newHead);
}

module.exports = insertHead;
