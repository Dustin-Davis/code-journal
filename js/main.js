/* global data */
/* exported data */
var $photo = document.querySelector('.photoUrl');
var $image = document.querySelector('.img');
var $entryForm = document.getElementById('entry-form');
var $entryPage = document.getElementById('entry-page');
var $noEntriesText = document.querySelector('#no-entries');
var $ul = document.querySelector('ul');
var $nodeList = document.querySelectorAll('.view');
var $delete = document.querySelector('.delete-button');
var $saveRow = document.querySelector('#save-row');
var $modal = document.querySelector('#modal');
var $cancel = document.querySelector('.cancel-button');
var $confirm = document.querySelector('.confirm-button');

function updateImg(event) {
  $image.setAttribute('src', $photo.value);
}

var $form = document.querySelector('.form');

function handleSubmit(event) {
  event.preventDefault();
  var entry = {
    entryId: data.nextEntryId,
    title: $form.elements.Title.value,
    photoUrl: $form.elements.photoUrl.value,
    notes: $form.elements.Notes.value
  };
  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entry);
    var newEntry = renderEntries(entry);
    $ul.prepend(newEntry);
  }
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing === data.entries[i].entryId) {

      data.entries[i].title = entry.title;
      data.entries[i].photoUrl = entry.photoUrl;
      data.entries[i].notes = entry.notes;
      updateImg();
      var editedEntry = renderEntries(entry);
      $ul.children[i].replaceWith(editedEntry);
      data.editing = null;
    }
  }

  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
  $noEntriesText.className = 'hidden';
  swapView('entries');
}

function renderEntries(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');
  li.setAttribute('data-entry-id', entry.entryId);

  var divImg = document.createElement('div');
  divImg.setAttribute('class', 'column-half');
  li.appendChild(divImg);

  var image = document.createElement('img');
  image.setAttribute('class', 'img');
  image.setAttribute('src', entry.photoUrl);
  divImg.appendChild(image);

  var divText = document.createElement('div');
  divText.setAttribute('class', 'column-half');
  li.appendChild(divText);

  var h2Title = document.createElement('h2');
  h2Title.setAttribute('class', '');
  h2Title.textContent = entry.title;
  divText.appendChild(h2Title);

  var editIcon = document.createElement('a');
  editIcon.setAttribute('class', 'fas fa-pen edit-icon');
  editIcon.setAttribute('href', '#');
  editIcon.setAttribute('data-entry-id', entry.entryId);
  editIcon.setAttribute('data-view', 'entry-form');
  h2Title.appendChild(editIcon);

  var pText = document.createElement('p');
  pText.setAttribute('class', '');
  pText.textContent = entry.notes;
  divText.appendChild(pText);

  return li;
}

function appendDom(entry) {
  swapView(data.view);
  if (data.entries.length !== 0) {
    $noEntriesText.className = 'hidden';
  }
  for (var i = 0; i < data.entries.length; i++) {
    var returnObject = renderEntries(data.entries[i]);
    $ul.appendChild(returnObject);
  }
}
function swapView(string) {
  data.view = string;
  if (string === 'entries') {
    data.editing = null;
  }
  for (var i = 0; i < $nodeList.length; i++) {
    if ($nodeList[i].getAttribute('data-view') === string) {
      $nodeList[i].className = 'view';
    } else {
      $nodeList[i].className = 'hidden';
    }
  }
}

function dataView(event) {
  var dataViewValue = event.target.getAttribute('data-view');
  if (dataViewValue === null) {
    return;
  }
  var entry = event.target.closest('[data-entry-id]');
  if (entry !== null) {
    $entryPage.textContent = 'Edit Entry';
    $delete.className = 'delete-button';
    $saveRow.className = 'column-full row space-between';
    var dataEntryIdNum = parseInt(event.target.getAttribute('data-entry-id'));
    data.editing = dataEntryIdNum;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i].entryId) {
        $entryForm.elements.Title.value = data.entries[i].title;
        $entryForm.elements.photoUrl.value = data.entries[i].photoUrl;
        $entryForm.elements.Notes.value = data.entries[i].notes;
        updateImg();
      }
    }
  } else if (dataViewValue === 'entry-form') {
    $entryForm.reset();
    $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
    $entryPage.textContent = 'New Entry';
    $delete.className = 'hidden';
    $saveRow.className = 'column-full row';
  }
  swapView(dataViewValue);
}

function handleDelete(event) {
  if (event.target === $delete) {
    $modal.className = 'row modal-on';
  }
  if (event.target === $cancel) {
    $modal.className = 'row hidden';
  }
}

function handleModalButtons(event) {
  if (event.target === $cancel) {
    $modal.className = 'row hidden';
  }
  if (event.target === $confirm) {
    var entry = data.editing;
    for (var i = 0; i < data.entries.length; i++) {
      if (entry === data.entries[i].entryId) {
        $ul.children[i].remove();
        data.entries.splice(data.entries[i], 1);
        entry = null;
        $modal.className = 'row hidden';
        swapView('entries');
        if (data.entries.length === 0) {
          $noEntriesText.className = 'column-full no-entries';
        }
      }
    }
  }
}

$modal.addEventListener('click', handleModalButtons);
$delete.addEventListener('click', handleDelete);
document.addEventListener('click', dataView);
document.addEventListener('DOMContentLoaded', appendDom);
$photo.addEventListener('input', updateImg);
$entryForm.addEventListener('submit', handleSubmit);
