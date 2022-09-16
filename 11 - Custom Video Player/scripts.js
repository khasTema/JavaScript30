const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full_screen')

function togglePlay () {
    if (video.paused) {
        video.play();
    } else {
        video.pause()
    }
}

function updateTheButton () {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}

function skip () {
    // console.log(this.dataset)
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate () {
    // console.log(this.name)
    // console.log(this.value)
    video[this.name] = this.value
}

function handleProgress () {
    const percent = ( video.currentTime / video.duration ) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

// this will handle progres bar chamge manualy
function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth ) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateTheButton)
video.addEventListener('pause', updateTheButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mouseDown = false;

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)

// MAKE THE VIDEO FULL SCREEN
// add a fulscreen button and make it work !!!!
function fullScreenOpen () {
    // console.log(document.fullScreenMode)
    // player.requestFullscreen()
    return fullSreenClicked ? player.requestFullscreen() : document.exitFullscreen()
}

let fullSreenClicked = false
fullScreen.addEventListener('click', () => {
    fullSreenClicked = !fullSreenClicked
    fullScreenOpen()
})