objects = [];
status = "";

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill("#097c69");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#e2742b");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label==object_name)
            {
            //video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name+" Is Found! "
            }
            else
            {
            document.getElementById("object_status").innerHTML = object_name+" Is Not Found "
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("text_input").value 
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}