const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    options = document.getElementById("info")

var videoin;

options.innerHTML = <ul>
async function starter(){
    var devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    const opt = videoDevices.map(videoDevice => {
        options.innerHTML += <li><button onclick="idsetter(videoDevice.deviceId)"> videoDevice.label</button></li>;
        return 0;
//        return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
    });
 // document.getElementById("info").innerHTML = options.join('');

}
options.innerHTML += </ul>


// Set constraints for the video stream

// Define constants

function idsetter(id){
    var constraints = { video: { deviceId: id }, audio: false };
    cameraStart();
}

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
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};
// Start the video stream when the window loads
window.addEventListener("load", starter, false);



/*(function myModule(){
    fun foo() = "Hello"
    val cameraId: String = ...
    val characteristics = cameraManager.getCameraCharacteristcs(cameraId)
    val capabalities = characteristics.get(
        CameraCharactaristics.REQUEST_AVAILABLE_CAPABILITIES)
    val isLogicalCamera = capabalities.contains(
        CameraCharactaristics.REQUEST_AVAILABLE_CAPABILITIES_LOGICAL_MULTI_CAMERA)

    if (isLogicalCamera){
        val isLogicalCameraId = cameraId

        val physicalCameras = characteristics.getPhysicalCameraIds()


    }
}())

alert(myModule.foo());*/