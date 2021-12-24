/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $nodeList = document.querySelectorAll('.view');

var previousEntriesJSON = localStorage.getItem('data-storage');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}

function beforeunloadContent(event) {
  for (var viewNode of $nodeList) {
    if (!viewNode.classList.contains('hidden')) {
      data.view = viewNode.getAttribute('data-view');
    }
  }
  var savedData = JSON.stringify(data);
  localStorage.setItem('data-storage', savedData);
}

window.addEventListener('beforeunload', beforeunloadContent);
