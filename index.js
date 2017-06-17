import Dropbox from 'dropbox';
import LightBox from 'lightbox2';

const dbx = new Dropbox(
    {
        accessToken: 'VMxqipghP2AAAAAAAAAAcA0t8HpDYeQMrris9lrlja5OhdoCS1ZTOquO6GEEzD2T'
    });

dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
    response.entries.forEach(function(entry) {
      console.log(entry.name);
      dbx.filesGetThumbnail({
        path: '/' + entry.name,
        size: {".tag":"w1024h768"}
      })
        .then(function(response) {
          console.log(response);

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

window.uploadFile = function() {
  let fileInput = document.getElementById('file-upload');
  let file = fileInput.files[0];
  dbx.filesUpload({ path: '/' + file.name, contents: file })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}