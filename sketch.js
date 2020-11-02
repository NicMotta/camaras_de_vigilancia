let faceapi;
let video;
let detections;

//----
var vScale_video;
var vScale_camara;
let c;
let nx, ny;
let nboxw, nboxh;
let video_camara;

let nvideo;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}


function setup() {
    //createCanvas(800, 600);
    createCanvas(displayWidth-50, displayHeight-25);
    var vScale=14


    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    //video.hide(); // esconder el video inicial (sin trackeo)
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    pixelDensity(1);


    video_camara = createVideo('assets/cam_1.mp4',video_camaraLoad);
    video_camara.size(width, height);
    video_camara.hide();
}

function video_camaraLoad() {
  video_camara.loop();
  video_camara.volume(0);
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


    //image(video, 0,0, width, height)
    image(video_camara, 0, 0);
    nvideo = copy(video, nx, ny, nboxw, nboxh, nx, ny, nboxw, nboxh);

    if (detections) {
        if (detections.length == 1) {
            // console.log(detections)
            drawBox(detections)
            //drawLandmarks(detections)
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

        //c = get(x, y, boxWidth, boxHeight);

    }

}

function draw(){
  image(video, 0,0, width, height)
  video.loadPixels();
  loadPixels();
  for (var y=0; y < video.height;y ++){
    for (var x=0; x < video.width ;x ++){
      var index= (x+y*video.width)*4;
      var r = video.pixels[index+0]
      var g = video.pixels[index+1]
      var b = video.pixels[index+2]


      var bright= (r+g+b)/2;

      var alfa
      if (bright<150){
       alfa = 200
      }else{
        alfa=100
      }

      var w = map(bright,0, 255, 0, vScale)

      fill(bright,alfa)
      noStroke();
      //image(icono,x*vScale,y*vScale,w,w)
      rect(x*vScale,y*vScale,w,w)
      rectMode=CENTER


    }
  }
}



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
/*
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
