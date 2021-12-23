/* global data */
/* exported data */

var $photo = document.querySelector('.photoUrl');
var $image = document.querySelector('.img');

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
  $image.setAttribute('src', './images/placeholder-image-square.jpg');
  $form.reset();
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

for (var i = 0; i < data.entries.length - 1; i++) {
  ul.appendChild(renderEntries(data.entries[i]));
}
