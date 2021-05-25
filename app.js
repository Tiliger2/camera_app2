// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
navigator.mediaDevices.enumerateDevices().then(function(devices) {

    var deviceToUse = "";
        var deviceLabel = ""; //Used to check if permissions have been accepted, enumerateDevices() runs without needing to accept permissions
        var isAndroid = false;
        //For android phones
        for(var i = 0; i < devices.length; i++){
            deviceLabel = devices[i].label;

            if(devices[i].kind === "videoinput"){
                console.log(deviceLabel);
                if(devices[i].label.includes("0")){
                    deviceToUse = devices[i].deviceId;
                    isAndroid = true;
                    break;
                }
            }
        }
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
