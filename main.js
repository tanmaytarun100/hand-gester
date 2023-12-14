prediction_1 = "";
prediction_2 = "";

Webcam.set({
  width: 350,
  height: 300,
  image_format: 'png',
  png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');


function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
  });
}

console.log('ml5 version:', ml5.version);


classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uSi19uiKn/model.json', modelLoaded);




function modelLoaded() {
  console.log('Model Loaded!');
}

function speak() {
  var v1 = window.speechSynthesis;
  var v2 = "The first prediction is " + prediction_1;
  var v3 = "And the second prediction is " + prediction_2;
  var m1 = new SpeechSynthesisUtterance(v2 + v3);
  v1.speak(m1);
}


function check() {
  img = document.getElementById('captured_image');
  classifier.classify(img, gotResult);
}


function gotResult(error, results) {
  if (error) 
  {
    console.error(error);
  }
  else 
  {

    console.log(results);

    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    
    speak();

    if (results[0].label == "amazing") {
      document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if (results[0].label == "cool") {
      document.getElementById("update_emoji").innerHTML = "&#129304;";
    }
    if (results[0].label == "thumbs up") {
      document.getElementById("update_emoji").innerHTML = "&#128077;";
    }

    if (results[1].label == "amazing") {
      document.getElementById("update_emoji2").innerHTML = "&#128076;";
    }
    if (results[1].label == "cool") {
      document.getElementById("update_emoji2").innerHTML = "&#129304;";
    }
    if (results[1].label == "thumbs up") {
      document.getElementById("update_emoji2").innerHTML = "&#128077;";
    }
  }
}

