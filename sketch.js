let faceapi;
let video;
let detections;

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}


function setup() {
    //createCanvas(800, 600);
    createCanvas(displayWidth-50, displayHeight-25);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // esconder el video inicial (sin trackeo)
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    textAlign(RIGHT);
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function draw(){
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    //background(220);
    image(video, 0,0, width, height)
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

//  background(0);

//  noStroke();
//  fill(255,255,0);
//  rect(0,0,displayWidth/3, displayHeight/2);


    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height

        noFill();

        if (x+boxWidth/2 < displayWidth / 3){stroke(0,255,0)}
        if (x+boxWidth/2 > displayWidth / 3){stroke(255,0,0)};
        strokeWeight(2);
        rect(x, y, boxWidth, boxHeight);
        circle(x+boxWidth/2, y+boxHeight/2, 10);
        console.log("x"+x);
        console.log("y"+y);
    }

}

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
