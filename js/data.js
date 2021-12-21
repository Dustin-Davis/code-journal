/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  data.nextEntryId++;
  var savedData = JSON.stringify(data);
  localStorage.setItem('entry', savedData);
});
