const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
       .then(localMediaStream => {
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
        let pixels = ctx.getImageData(0, 0, width, height);

        //pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        
        ctx.putImageData(pixels, 0, 0);
    }, 10);
}
function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src='${data}' alt ='Incredibly Handsome Man'/>`;
    strip.insertBefore(link, strip.firstChild);
}
function redEffect(px){
    for(let i = 0; i < px.data.length; i += 4){
        px.data[i + 0] = px.data[i + 0] +100;
        px.data[i + 1] = px.data[i + 1] -50;
        px.data[i + 2] = px.data[i + 2] *0.5;
    }
    return px;

}
function rgbSplit(px){
    for(let i = 0; i < px.data.length; i += 4){
        px.data[i - 150] = px.data[i + 0] +100;
        px.data[i + 100] = px.data[i + 1] -50;
        px.data[i - 150] = px.data[i + 2] *0.5;
    }
    return px;

}
getVideo();
video.addEventListener('canplay', paintToCanvas);
