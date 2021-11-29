song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('PoseNet Is Initialized');
}
function draw() {
    image(video, 0, 0, 600, 500);
    if (scoreleftwrist > 0.2) {
    fill("pink")
    circle(leftWristX,leftWristY,20)
    newleftWristY = Number(leftWristY)
    newleftWristY = floor(newleftWristY)
    newleftWristY = newleftWristY/500
    song.setVolume(newleftWristY)
    document.getElementById("volume").innerHTML = "volume="+newleftWristY  
    }
    if (scorerightwrist > 0.2) {
        fill("pink")
        circle(rightWristX,rightWristY,20)
        if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5)
            document.getElementById("speed").innerHTML = "speed = 0.5x"
        }
        if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1)
            document.getElementById("speed").innerHTML = "speed = 1x"
        }
        if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5)
            document.getElementById("speed").innerHTML = "speed = 1.5x"
        }
        if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2)
            document.getElementById("speed").innerHTML = "speed = 2x"
        }
        if (rightWristY > 400 && rightWristY <= 500) {
            song.rate(2.5)
            document.getElementById("speed").innerHTML = "speed = 2.5x"
        }
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
    }
}