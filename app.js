const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    options = document.getElementById("options")
/*
function starter(){
    var txt = ''

    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
        if (device.kind == "videoinput"){
            console.log(device.kind + ": " + device.label +
                    " id = " + device.deviceId);
            txt = '<li><button onclick="myFunc(this)">' + device.label + "</button></li>";
        }
        })
        console.log(txt);
        //options.innerHTML = txt;
          
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });
   
    
 // document.getElementById("info").innerHTML = options.join('');

}

console.log(366566)

function myFunc(but){
    but.innerHTML = "opp";
    but.style.backgroundColor = "green";
}

// Set constraints for the video stream

// Define constants

function idsetter(id, but){
    but.style = "background-color : green;";
    console.log(id);
    var constraints = { video: { deviceId: id }, audio: false };
    cameraStart();
}
*/


var constraints = { video: { deviceId: "0ea60d4903810eecd640778c6dab7453fd35f442e6f6b1e1168605b0afa2e2fc" }, audio: false };
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
    cameraOutput.src = cameraSensor.toDataURL("image/jpeg");
    cameraOutput.classList.add("taken");
    cameraOutput.href = cameraOutput.src;

    var link = document.getElementById('link');
    link.setAttribute('download', 'MintyPaper.png');
    link.setAttribute('href', cameraSensor.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
};


// Start the video stream when the window loads
document.getElementById("starting").onclick = function(){
    cameraStart();   
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