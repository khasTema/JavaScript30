const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream)
            video.srcObject = localMediaStream
            video.style.transform = 'scale(-1,1)'
            video.play()
        }).catch(err => {
             alert("You denied the webcam!");
        })
}


function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight; 
    canvas.width = width;
    canvas.height = height; 
    canvas.style.transform = 'scale(-1,1)'


    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height );
        const pixels = ctx.getImageData(0, 0, width, height)
        pixels = edEffect(pixels)
    }, 16)
}

function takePhoto () {
     snap.currentTime = 0;
     snap.play()

     const data = canvas.toDataURL('image/jpeg');
     const link = document.createElement('a')
     link.href = data;
     link.setAttribute('download', 'handsome');
     link.innerHTML = `<img src="${data}" alt="download image" />`
     strip.insertBefore(link, strip.firstChild)
}

// function redEffect(pixels) {
     
// }

getVideo();

video.addEventListener('canplay', paintToCanvas)
