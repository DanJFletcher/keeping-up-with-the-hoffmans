import Dropbox from 'dropbox';
import LightBox from 'lightbox2';
import vegas from 'vegas';

$('#hero-slide-show').vegas({
  slides: [
    { src: './images/hearts_hero.jpg' },
    { src: './images/grump.jpg' }
  ]
});

const dbx = new Dropbox(
    {
        accessToken: 'VMxqipghP2AAAAAAAAAAcA0t8HpDYeQMrris9lrlja5OhdoCS1ZTOquO6GEEzD2T'
    });

dbx.filesListFolder({path: ''})
  .then(function(response) {
    response.entries.forEach(function(entry) {
      dbx.filesGetThumbnail({
        path: '/' + entry.name,
        size: {".tag":"w1024h768"}
      })
        .then(function(response) {
          let img = document.createElement('img');
          img.src = window.URL.createObjectURL(response.fileBlob);
          img.className = 'thumbnail'

          let anchor = document.createElement('a');
          anchor.href = img.src;
          anchor.dataset.lightbox = 'gallery';

          // select the modal body
          let modalBody = document.getElementById("gallery-modal-body");
          modalBody.appendChild(anchor);
          anchor.appendChild(img);
        })
        .catch(function(error) {
          console.log(error);
        })
    });
  })
  .catch(function(error) {
    console.log(error);
  });

const uploadFile = function() {

  let fileInput = document.getElementById('file-upload');

  if (fileInput.files.length < 1) {
    return;
  }

  console.log("uploading file...");

  document.getElementById("submit-upload").innerHTML = "Uploading Image...";

  let file = fileInput.files[0];
  dbx.filesUpload({ path: '/' + file.name, contents: file })
    .then(function(response) {
      console.log(response);
      document.getElementById("submit-upload").innerHTML = "Image Uploaded";
    })
    .catch(function(error) {
      console.log(error);
    });
}

document.getElementById("submit-upload").addEventListener("click", uploadFile);