// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

let nx, ny;
let vw, vh;

var vScale;

let camara_vigilancia;

function setup() {
  //createCanvas(displayWidth-50, displayHeight-50);
  createCanvas(windowWidth - 20, windowHeight - 20);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);



  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();

  camara_vigilancia = createVideo('assets/cam_1.mp4', camara_vigilanciaLoad);
  camara_vigilancia.size(width, height);
  camara_vigilancia.hide();

}

function camara_vigilanciaLoad() {
  camara_vigilancia.loop();
  camara_vigilancia.volume(0);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  vScale = 8;
  background(0);
  image(camara_vigilancia, 0, 0); // camara de vigilancia
  //image(video, 0, 0, width, height); // webcam

  drawKeypoints();

  let n_video = copy(video, nx, ny, vw, vh, nx, ny, vw, vh);

  //filter(BLUR, 3);


}


// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      // 0 nariz
      // 1 y 2 ojos
      let keypoint = pose.keypoints[0];

      let ojo_1 = pose.keypoints[1];

      let distancia = dist(ojo_1.position.x, ojo_1.position.y, keypoint.position.x, keypoint.position.y) * 3;
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        //fill(255, 0, 0);
        //stroke('red');
        //noFill();
        //ellipse(keypoint.position.x, keypoint.position.y, distancia*1.2, distancia*1.5);
        //ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

        nx = keypoint.position.x - 100;
        ny = keypoint.position.y - 100;
        vw = distancia;
        vh = distancia;
      }
    }
  }
}



/*
// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
*/