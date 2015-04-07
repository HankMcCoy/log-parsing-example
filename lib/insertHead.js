/**
 * Add the new head into the list, sorted by date.
 *
 * This is an O(n) operation as opposed to re-sorting the entire list
 * which is O(n log n). Admittedly where n = 5 this is a fairly minor
 * (though measurable) difference.
 */
function insertHead(heads, newHead) {
  for (var i = 0; i < heads.length; i++) {
    if (heads[i].log.date > newHead.log.date)
      break;
  }

  heads.splice(i, 0, newHead);
}

module.exports = insertHead;
