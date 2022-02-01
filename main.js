// https://teachablemachine.withgoogle.com/models/LbH96cXrX/

prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result_div").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 Version: ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LbH96cXrX/model.json', model_loaded);

function model_loaded(){
    console.log('Model loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = 'The first prediction is '+prediction_1;
    speak_data_2 = ' and the second prediction is '+prediction_2;
    utter_this = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utter_this);
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, got_result);
}

function got_result(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("prediction_1").innerHTML = prediction_1;
        document.getElementById("prediction_2").innerHTML = prediction_2;
        speak();
        if(prediction_1 == "Happy"){
            document.getElementById("emoji_1").innerHTML = "&#128522";
            document.getElementById("motivational_q_1").innerHTML = "Happiness is always a by-product. It is probably a matter of temperament, and for anything I know it may be glandular. But it is not something that can be demanded from life, and if you are not happy you had better stop worrying about it and see what treasures you can pluck from your own brand of unhappiness.";
        }else if(prediction_1 == "Sad"){
            document.getElementById("emoji_1").innerHTML = "&#128532;";
            document.getElementById("motivational_q_1").innerHTML = "The way sadness works is one of the strange riddles of the world. If you are stricken with a great sadness, you may feel as if you have been set aflame, not only because of the enormous pain but also because your sadness may spread over your life, like smoke from an enormous fire.";
        }else if(prediction_1 == "Angry"){
            document.getElementById("emoji_1").innerHTML = "&#128545;";
            document.getElementById("motivational_q_1").innerHTML = "Every day we have plenty of opportunities to get angry, stressed or offended. But what you're doing when you indulge these negative emotions is giving something outside yourself power over your happiness. You can choose to not let little things upset you.";
        }


        if(prediction_2 == "Happy"){
            document.getElementById("emoji_2").innerHTML = "&#128522";
            document.getElementById("motivational_q_2").innerHTML = "Happiness is always a by-product. It is probably a matter of temperament, and for anything I know it may be glandular. But it is not something that can be demanded from life, and if you are not happy you had better stop worrying about it and see what treasures you can pluck from your own brand of unhappiness.";
        }else if(prediction_2 == "Sad"){
            document.getElementById("emoji_2").innerHTML = "&#128532;";
            document.getElementById("motivational_q_2").innerHTML = "The way sadness works is one of the strange riddles of the world. If you are stricken with a great sadness, you may feel as if you have been set aflame, not only because of the enormous pain but also because your sadness may spread over your life, like smoke from an enormous fire.";
        }else if(prediction_2 == "Angry"){
            document.getElementById("emoji_2").innerHTML = "&#128545;";
            document.getElementById("motivational_q_2").innerHTML = "Every day we have plenty of opportunities to get angry, stressed or offended. But what you're doing when you indulge these negative emotions is giving something outside yourself power over your happiness. You can choose to not let little things upset you.";
        }
    }
}