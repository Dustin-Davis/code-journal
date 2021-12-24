/* global data */
/* exported data */

var $photo = document.querySelector('.photoUrl');
var $image = document.querySelector('.img');
var $entryForm = document.getElementById('entry-form');
var $divEntries = document.getElementById('div-entries');

$photo.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});

var $form = document.querySelector('.form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {
    entryId: data.nextEntryId,
    title: $form.elements.Title.value,
    photoUrl: $form.elements.photoUrl.value,
    notes: $form.elements.Notes.value
  };
  data.nextEntryId++;
  data.entries.unshift(entry);

  ul.prepend(renderEntries(data.entries[0]));

  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
  $divEntries.classList.remove('hidden');
  $entryForm.classList.add('hidden');
});

function renderEntries(newEntry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'row');

  var divImg = document.createElement('div');
  divImg.setAttribute('class', 'column-half');
  li.appendChild(divImg);

  var image = document.createElement('img');
  image.setAttribute('class', 'img');
  image.setAttribute('src', newEntry.photoUrl);
  divImg.appendChild(image);

  var divText = document.createElement('div');
  divText.setAttribute('class', 'column-half');
  li.appendChild(divText);

  var h2Title = document.createElement('h2');
  h2Title.setAttribute('class', '');
  h2Title.textContent = newEntry.title;
  divText.appendChild(h2Title);

  var pText = document.createElement('p');
  pText.setAttribute('class', '');
  pText.textContent = newEntry.notes;
  divText.appendChild(pText);

  return li;
}

var ul = document.querySelector('.entries-list');

function loaded(event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    ul.prepend(renderEntries(data.entries[i]));
  }
  if (data.view === 'entries') {
    $entryForm.classList.add('hidden');
    $divEntries.classList.remove('hidden');
  } else if (data.view === 'entry-form') {
    $entryForm.classList.remove('hidden');
    $divEntries.classList.add('hidden');
  }
}

window.addEventListener('DOMContentLoaded', loaded);

var $entriesLink = document.getElementById('entries-link');
var $nodeList = document.querySelectorAll('.view');
var $entriesButton = document.getElementById('entries-button');

function viewSwap(event) {
  if (!event.target.matches('.link')) {
    return;
  }

  var TdataView = event.target.getAttribute('data-view');

  for (var node of $nodeList) {
    if (node.getAttribute('data-view') === TdataView) {
      node.classList.remove('hidden');
    } else {
      node.classList.add('hidden');
    }
  }
}

$entriesLink.addEventListener('click', viewSwap);
$entriesButton.addEventListener('click', viewSwap);
