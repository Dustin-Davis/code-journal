/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('entries');
if (previousEntriesJSON !== null) {
  previousEntriesJSON = JSON.parse(data);
}

window.addEventListener('beforeunload', function (event) {
  var savedData = JSON.stringify(data);
  localStorage.setItem('Entries', savedData);
});
