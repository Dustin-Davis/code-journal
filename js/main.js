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
