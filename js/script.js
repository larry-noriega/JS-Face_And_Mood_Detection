const video = document.getElementById('video')

var constraints = {
  audio: false,
  video: {
    width: 720,
    height: 560
  }
};

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/js/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/js/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/js/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/js/models')
]).then(startVideo)

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}


function startVideo() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (mediaStream) {
      if ("srcObject" in video) {
        video.srcObject = mediaStream;
      }  else {
        video.src = window.URL.createObjectURL(mediaStream);
      }
      video.onloadedmetadata = function (e) {
        video.play();
      };
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})