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

function startVideo() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (mediaStream) {
      video.srcObject = mediaStream;
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