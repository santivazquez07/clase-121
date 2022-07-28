function setup() {
  canvas = createCanvas(350, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw(){
  image(video, 0, 0, 350, 300);
  classifier.classify(video, gotResult);
}

function modelLoaded(){
  console.log('modelLoaded'); 

}
var previus_result = "";

function gotResult(error, results){
  if(error){
    console.error(error);
  }else{
    if((results [0].confidence > 0.5) && (previus_result != results[0].label) ){
      console.log(results);
      previus_result = results [0].label
      var synth = window.speechSynthesis
      speak_data  = "El objeto detectado es: " + results [0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);
      document.getElementById("result_object_name").innerHTML = results [0].label;
      document.getElementById("result_object_accuracy").innerHTML = results [0].confidence.toFixed(3);
    }
  }
}



