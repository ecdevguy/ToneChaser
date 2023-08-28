import myJson from '../vocabulary/TOCFL-1.json' assert {type: 'json'};

let errors = 0;
const charCount = 135;
let countdownDuration = 60000;
let correctCount = 0;
let highscoreCount = localStorage.getItem("highscore");



function adjustFontSize() {
  $('#chinese-character').each(function() {
    const charCount = $(this).text().trim().length;
    
    if (charCount === 1) {
      $(this).css('font-size', '6rem');
    } else if (charCount === 2) {
      $(this).css('font-size', '5rem');
    } else if (charCount === 3) {
      $(this).css('font-size', '4rem');
    } else if (charCount === 4) {
      $(this).css('font-size', '3rem');
    } else if (charCount >= 5) {
      $(this).css('font-size', '2.5rem');
    }
  });
}

const pickColorByPercentage = (percentage, time) => {
  switch (true) {
    case percentage >= 75:
      return '#28a745'; // green
    case percentage >= 50 && percentage < 75:
      return '#17a2b8'; // blue
    case percentage >= 25 && percentage < 50:
      return '#ffc107'; // orange
    default:
      return '#dc3545'; // red
  }
}

$(document).ready(() => {
  
  $('#continue-btn').on("click", () => {
    $('.modal-container').css('display', 'none');
    $('input[type=text]').css('pointer-events', 'all');
    $('#countdown-canvas').css('opacity', '.3');
    correctCount = 0;
    new CanvasCircularCountdown(document.getElementById('countdown-canvas'), {
      "duration": countdownDuration,
      "elapsedTime": 0,
      "clockwise": true,
      "radius": 107,
      "progressBarWidth": 15,
      "progressBarOffset": 0,
      "circleBackgroundColor": "#e1f8f6",
      "emptyProgressBarBackgroundColor": "#dddddd",
      "filledProgressBarBackgroundColor": "#00bfeb",
      "showCaption": false,
      "captionColor": "#343a40",
      "captionFont": "20px sans-serif",
      "captionText": " ",
      filledProgressBarBackgroundColor: pickColorByPercentage,
      captionColor: pickColorByPercentage
    }).start();
    setTimeout(function() {
      $('.modal-container').css('display', 'flex');
      $('input[type=text]').css('pointer-events', 'none');
      $('#countdown-canvas').css('opacity', '0');
      if (correctCount > highscoreCount) {
        localStorage.setItem("highscore", correctCount);
        
        
        $("#currentScore").text(correctCount);
        $("#highScore").text(localStorage.getItem("highscore"));
      }
      else if (localStorage.getItem("highscore") === undefined){
        $("#currentScore").text(correctCount);
        $("#highScore").text(correctCount);
        localStorage.setItem("highscore", correctCount);
      }
      else{
        $("#currentScore").text(correctCount);
        $("#highScore").text(localStorage.getItem("highscore"));
      }
      
    }, countdownDuration);
  });
  
  $('#start-button').on("click", () => {
    $('.corner-button').css('display', 'none');
    $('.word').css('display', 'inline-block');
    $('input[type=text]').css('pointer-events', 'all');
    $("#pinyin-character").attr("placeholder", $("#chinese-character").attr("pinyin"));
    new CanvasCircularCountdown(document.getElementById('countdown-canvas'), {
      "duration": countdownDuration,
      "elapsedTime": 0,
      "clockwise": true,
      "radius": 107,
      "progressBarWidth": 15,
      "progressBarOffset": 0,
      "circleBackgroundColor": "#e1f8f6",
      "emptyProgressBarBackgroundColor": "#dddddd",
      "filledProgressBarBackgroundColor": "#00bfeb",
      "showCaption": false,
      "captionColor": "#343a40",
      "captionFont": "20px sans-serif",
      "captionText": " ",
      filledProgressBarBackgroundColor: pickColorByPercentage,
      captionColor: pickColorByPercentage
    }).start();
    $('#countdown-canvas').css('opacity', '.3');

    setTimeout(function() {
      $('.modal-container').css('display', 'flex');
      $('input[type=text]').css('pointer-events', 'none');
      
      if (correctCount > highscoreCount) {
        localStorage.setItem("highscore", correctCount);
        
        
        $("#currentScore").text(correctCount);
        $("#highScore").text(localStorage.getItem("highscore"));
      }
      else if (localStorage.getItem("highscore") === undefined){
        $("#currentScore").text(correctCount);
        $("#highScore").text(correctCount);
        localStorage.setItem("highscore", correctCount);
      }
      else{
        $("#currentScore").text(correctCount);
        $("#highScore").text(localStorage.getItem("highscore"));
      }
    }, countdownDuration);

    
    
  });
  let x = Math.floor((Math.random() * charCount));
  $("#chinese-character").text(myJson[x].Word);
  $("#chinese-character").attr("pinyin", myJson[x].OtherPinyin);
  $("#chinese-character").attr("character", myJson[x].Word);
  $("#definition").text(myJson[x]['First Translation']);

  const pickColorByPercentage = (percentage, time) => {
    switch (true) {
      case percentage >= 75:
        return '#17a2b8'; // blue
      case percentage >= 50 && percentage < 75:
        return '#17a2b8'; // blue
      case percentage >= 40 && percentage < 50:
        return '#17a2b8'; // blue
      default:
        return '#dc3545'; // red
    }
  }


  

adjustFontSize();
  

  $('.pinyin-textbox').on('submit', () => {
      return false;
  });
});
$('.pinyin-textbox').keypress((e) => {
  
  if (e.which === 13 && ($("#chinese-character").attr("pinyin") == $("#pinyin-character").val())) {
      
    let x = Math.floor((Math.random() * charCount));
    $("#chinese-character").text(myJson[x].Word);
    $("#chinese-character").attr("pinyin", myJson[x].OtherPinyin)
    $("#chinese-character").attr("character", myJson[x].Word)
    $("#pinyin-character").val("");
    $("#pinyin-character").attr("placeholder", "");
    correctCount++;
    //$("#body").attr("class", "correct");
    $("#definition").text(myJson[x]['First Translation']);
    //$('.character').css('background-color', '#dffcfa');
    $('.tooltip').css('border-color', '#73bdc293');
    $('input[type=text]').css('border-bottom', '.2em solid #73bdc293');
    //adjustFontSize();
    let errors = 0;
}
else if (e.which === 13 && ($("#chinese-character").attr("character") != $("#pinyin-character").val()) && errors < 7) {
  $("#pinyin-character").val("");
  $("#body").attr("class", "incorrect");
  //$('.character').css('background-color', '#f8eeee');
  $('input[type=text]').css('border-bottom', '.2em solid #c2787359');
  $('.tooltip').css('border-color', '#c2787359');
  $('#chinese-character').effect('shake', 300);
  //adjustFontSize();
  errors++;
}
else if (e.which === 36 && ($("#chinese-character").attr("pinyin") == $("#pinyin-character").val())) {
      
    let x = Math.floor((Math.random() * charCount));
    $("#chinese-character").text(myJson[x].Word);
    $("#chinese-character").attr("pinyin", myJson[x].OtherPinyin)
    $("#chinese-character").attr("character", myJson[x].Word)
    $("#pinyin-character").val("");
    $("#pinyin-character").attr("placeholder", "");
    correctCount++;
    //$("#body").attr("class", "correct");
    $("#definition").text(myJson[x]['First Translation']);
    //$('.character').css('background-color', '#dffcfa');
    $('.tooltip').css('border-color', '#73bdc293');
    $('input[type=text]').css('border-bottom', '.2em solid #73bdc293');
    //adjustFontSize();
    let errors = 0;
}
else if (e.which === 36 && ($("#chinese-character").attr("character") != $("#pinyin-character").val()) && errors < 7) {
  $("#pinyin-character").val("");
  $("#body").attr("class", "incorrect");
  //$('.character').css('background-color', '#f8eeee');
  $('input[type=text]').css('border-bottom', '.2em solid #c2787359');
  $('.tooltip').css('border-color', '#c2787359');
  //adjustFontSize();
  errors++;
}
else if (errors == 7){
  $("#pinyin-character").val("");
  $("#pinyin-character").attr("placeholder", $("#chinese-character").attr("pinyin"));
  //adjustFontSize();
  errors = 4;
}
adjustFontSize();
})

