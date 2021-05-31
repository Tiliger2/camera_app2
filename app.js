const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    options = document.getElementById("options")

function starter(){
    var txt = ""

    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
        if (device.kind == "videoinput"){
            console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
            txt += '<li><button onclick="idsetter(' + device.deviceId +
            ')">' + device.label + "</button></li>";
        }
        })
        console.log(txt);
        options.innerHTML = txt;   
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });
   
    
 // document.getElementById("info").innerHTML = options.join('');

}



// Set constraints for the video stream

// Define constants

function idsetter(id){
    console.log(id);
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
document.getElementById("starting").onclick = function(){
    starter();
}



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