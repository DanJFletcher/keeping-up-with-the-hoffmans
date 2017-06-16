import Dropbox from 'dropbox';

const dbx = new Dropbox(
    {
        accessToken: 'VMxqipghP2AAAAAAAAAAXQNBau2yjzg236l8yUzfGRGgd3rqtrZ4tf4wyViQCwle'
    });

dbx.filesDownload({path: 'apps/keepingupwiththehoffmans/glasses_hero.jpg'})
  .then(function(response) {
    console.log(response);
    var img = document.createElement('img');
    img.src=window.URL.createObjectURL(response.fileBlob);
    document.body.appendChild(img);
  })
  .catch(function(error) {
    console.log(error);
  });