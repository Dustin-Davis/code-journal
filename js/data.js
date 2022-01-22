/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('data-storage');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

function beforeunloadContent(event) {

  var savedData = JSON.stringify(data);
  localStorage.setItem('data-storage', savedData);
}

window.addEventListener('beforeunload', beforeunloadContent);
