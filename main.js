song1 = "";
song2 = "";
score_right_wrist = 0;
score_left_wrist = 0;
song1_status="";
song2_status="";
left_wrist_x = 0;
right_wrist_x = 0;
left_wrist_y = 0;
right_wrist_y = 0;

function preload()
{
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup()
{
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose'.gotPoses);
}

function gotPoses(results){
    score_left_wrist = result[0].pose.keypoints[9].score;
    score_left_wrist = result[0].pose.keypoints[10].score;
    left_wrist_x = results[0].pose.left_wrist.x;
    left_wrist_y = results[0].pose.left_wrist.y;
    right_wrist_x = results[0].pose.right_wrist.x;
    right_wrist_y = results[0].pose.right_wrist.y;
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function draw()
{
    image(video, 0, 0, 600, 400);
    song1_status = song1.isPlaying();
    song2_status =song2.isPlaying();
    fill('#FF0000')
    stroke('red');
    if(score_right_wrist > 0.2){
        circle(right_wrist_x, right_wrist_y, 20);
        song2.stop();
        if(song1_status == flase){
            document.getElementById("song").innerHTML = "Playin Song";
            song1.play();
        }
    }
if(score_left_wrist > 0.2){
    circle(left_wrist_x, left_wrist_y, 20)
    song1.stop();
    if(song2_status == false){
        document.getElementById("song").innerHTML = "Playing Song";
        song2.play();
    }
}

}