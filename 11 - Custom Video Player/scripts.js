const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
let mousedown = false;

//functions
function togglePlay(){
    if(video.paused){
        video.play();
    } 
    else{
        video.pause();
    }
}
function updateBtn(){
    const icon = this.paused? '►' : '❚ ❚';
    toggle.textContent = icon;
}
function skipBtn(){
    video.currentTime += parseFloat(this.dataset.skip);

}
function updateRange(){
    video[this.name] = this.value;
}
function handleProgress(){
    const percent = ((video.currentTime / video.duration) * 100);
    progressBar.style.flexBasis = `${percent}%`;
}
function handleProgressBar(e){
    const barTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = barTime;
}

//Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skip => skip.addEventListener('click', skipBtn));
ranges.forEach(range => range.addEventListener('change', updateRange));

progress.addEventListener('click', handleProgressBar);
progress.addEventListener('mousemove',(e) =>{
    if(mousedown) handleProgress(e);
} );
progress.addEventListener('mouseup',() => mousedown= false);
progress.addEventListener('mousedown',() => mousedown = true)


