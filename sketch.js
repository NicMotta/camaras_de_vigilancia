let faceapi;
let camara_web;
let detections;

//----
var vScale_video;
var vScale_camara;
let c;
let nx, ny;
let nboxw, nboxh;
let camara_vigilancia;

let nvideo;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}


function setup() {
    //createCanvas(800, 600);
    createCanvas(windowWidth-20, windowHeight-20);
    var vScale=8


    // load up your video
    camara_web = createCapture(VIDEO);
    camara_web.size(width, height);
    camara_web.hide(); // esconder el video inicial (sin trackeo)
    faceapi = ml5.faceApi(camara_web, detection_options, modelReady)
    pixelDensity(1);

    camara_vigilancia = createVideo('assets/cam_1.mp4',camara_vigilanciaLoad);
    camara_vigilancia.size(width, height);
    camara_vigilancia.hide();
}

function camara_vigilanciaLoad() {
  camara_vigilancia.loop();
  camara_vigilancia.volume(0);
}


function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    detections = result;

    if (detections) {
        if (detections.length == 1) {
            drawBox(detections)
        }

        if (detections.length > 1){
           detections = 1
           drawBox(detections)
         }
    }
    faceapi.detect(gotResults)
}

function drawBox(detections){

    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height

        nx = x;
        ny = y;
        nboxw = boxWidth;
        nboxh = boxHeight;
    }
}


function draw(){
  background(0);
  image(camara_vigilancia, 0, 0);
  nvideo = copy(camara_web, nx, ny, nboxw, nboxh, nx, ny, nboxw, nboxh);
  //filter(BLUR, 3);
}



/*
function drawPart(feature, closed){

    beginShape();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x
        const y = feature[i]._y
        vertex(x, y)
    }

    if(closed === true){
        endShape(CLOSE);
    } else {
        endShape();
    }

}

// ACTIVAR DETECCION DE OTRAS COSAS

function drawLandmarks(detections){
    noFill();
    stroke(161, 95, 251)
    strokeWeight(2)

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth;
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        drawPart(mouth, false);
        drawPart(nose, false);
        drawPart(leftEye, false);
        drawPart(leftEyeBrow, false);
        drawPart(rightEye, false);
        drawPart(rightEyeBrow, false);

    }

}

*/
