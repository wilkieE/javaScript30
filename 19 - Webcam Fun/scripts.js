const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
       .then(localMediaStream => {
           console.log(localMediaStream);
           video.srcObject = localMediaStream;
           video.play();
       })
       .catch(err => {
           console.error('MERDE!', err);
       });
}
function paintToCanvas(){
    const height = video.videoHeight;
    const width = video.videoWidth;
    canvas.height = height;
    canvas.width = width;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 10);
}
function takePhoto(){
    snap.currentTime = 0;
    snap.play();
}

getVideo();
video.addEventListener('canplay', paintToCanvas);
