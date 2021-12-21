/* global data */
/* exported data */

var $photo = document.querySelector('.photoUrl');
var $image = document.querySelector('.img');

$photo.addEventListener('input', function (event) {
  $image.setAttribute('src', event.target.value);
});
