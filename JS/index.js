import tocflVocabList from '../vocabulary/TOCFL-1.json' assert {type: 'json'};

let errors = 0;
let correctCount = 0;
let countdownDuration = 30000;
const lvlOneStartIndex = 0;
const lvlOneEndIndex = 135;

const pickColorByPercentage = (percentage, time) => {
  switch (true) {
    case percentage >= 75:
      return '#17a2b8'; // blue
    case percentage >= 50 && percentage < 75:
      return '#17a2b8'; // blue
    case percentage >= 30 && percentage < 50:
      return '#17a2b8'; // blue
    default:
      return '#dc3545'; // red
  }
}

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

function startGame() {
  setNewCharacter(lvlOneStartIndex, lvlOneEndIndex);
  $('.corner-button').css('display', 'none');
  $('.word').css('display', 'inline-block');
  $('input[type=text]').css('pointer-events', 'all');
  $("#pinyin-character").attr("placeholder", $("#chinese-character").attr("pinyin"));
  $('#countdown-canvas').css('opacity', '.3');
}

function resetContinue() {
  setNewCharacter(lvlOneStartIndex, lvlOneEndIndex);
  setCorrectHighlights();
  hideScoreModal();
  removeInputText();
  $("#pinyin-character").attr("placeholder", $("#chinese-character").attr("pinyin"));
  correctCount = 0;
}

function showScoreModal() {
  $('.modal-container').css('display', 'flex');
      $('input[type=text]').css('pointer-events', 'none');
      $('#countdown-canvas').css('opacity', '0');
}

function hideScoreModal() {
  $('.modal-container').css('display', 'none');
  $('input[type=text]').css('pointer-events', 'all');
  $('#countdown-canvas').css('opacity', '.3');
}

function assignLocalScores() {
  if ((correctCount > localStorage.getItem("highscore")) || (localStorage.getItem("highscore") === undefined)) {
    localStorage.setItem("highscore", correctCount);
    
    
    $("#currentScore").text(correctCount);
    $("#highScore").text(localStorage.getItem("highscore"));
  }
  else if (correctCount <= localStorage.getItem("highscore")) {
    $("#currentScore").text(correctCount);
    $("#highScore").text(localStorage.getItem("highscore"));
  }
}

function randomWordIndex(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setNewCharacter(startIndex, endIndex) {
  let x = randomWordIndex(startIndex, endIndex);
  $("#chinese-character").text(tocflVocabList[x].Word);
  $("#chinese-character").attr("pinyin", tocflVocabList[x].OtherPinyin);
  $("#chinese-character").attr("character", tocflVocabList[x].Word);
  $("#definition").text(tocflVocabList[x]['First Translation']);
}

function removeInputText() {
  $("#pinyin-character").val("");
}

function removeInputPlaceholder () {
  $("#pinyin-character").attr("placeholder", "");
}

function setCorrectHighlights() {
  $('.tooltip').css('border-color', '#73bdc293');
  $('input[type=text]').css('border-bottom', '.2em solid #73bdc293');
}

function setIncorrectHighlights() {
  $('input[type=text]').css('border-bottom', '.2em solid #c2787359');
  $('.tooltip').css('border-color', '#c2787359');
}

function showHint() {
  $("#pinyin-character").attr("placeholder", $("#chinese-character").attr("pinyin"));
}

function correctAnswer() {
  setNewCharacter(lvlOneStartIndex, lvlOneEndIndex);
  removeInputText();
  removeInputPlaceholder();
  setCorrectHighlights();
  correctCount++;
  let errors = 0;
}

function incorrectAnswer() {
  removeInputText();
  setIncorrectHighlights();
  $('#chinese-character').effect('shake', 300);
  errors++;
}

function checkInput(e) {
  if (e.which === 13 && ($("#chinese-character").attr("pinyin") === $("#pinyin-character").val())) { 
    correctAnswer();
}
  else if (e.which === 13 && ($("#chinese-character").attr("character") !== $("#pinyin-character").val()) && errors < 7) {
    incorrectAnswer();
  }
  else if (e.which === 36 && ($("#chinese-character").attr("pinyin") === $("#pinyin-character").val())) {  
    correctAnswer();
  }
  else if (e.which === 36 && ($("#chinese-character").attr("character") !== $("#pinyin-character").val()) && errors < 7) {
    incorrectAnswer();
  }
  else if (errors == 7){
    removeInputText();
    showHint();
    errors = 4;
  }
}

$(document).ready(() => {
  
  adjustFontSize();
  $('#start-button').on("click", () => {
    startGame();
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
      assignLocalScores();
      showScoreModal();
    }, countdownDuration); 
  });
  $('#continue-btn').on("click", () => {
    resetContinue();
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
      assignLocalScores();
      showScoreModal();
    }, countdownDuration);
  });
  $('.pinyin-textbox').on('submit', () => {
      return false;
  });
  $('.pinyin-textbox').keypress((e) => {
    checkInput(e);
    adjustFontSize();
    })
});