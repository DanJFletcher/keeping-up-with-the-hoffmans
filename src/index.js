import Dropbox from 'dropbox';
import LightBox from 'lightbox2';

const dbx = new Dropbox(
    {
        accessToken: 'VMxqipghP2AAAAAAAAAAXQNBau2yjzg236l8yUzfGRGgd3rqtrZ4tf4wyViQCwle'
    });

dbx.filesListFolder({path: '/apps/keepingupwiththehoffmans'})
  .then(function(response) {
    console.log(response);
    response.entries.forEach(function(entry) {
      console.log(entry.name);
      dbx.filesGetThumbnail({
        path: '/apps/keepingupwiththehoffmans/' + entry.name,
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