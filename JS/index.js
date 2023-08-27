import myJson from '../vocabulary/TOCFL-1.json' assert {type: 'json'};

let errors = 0;
const charCount = 135;

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

$(document).ready(() => {

  
  $('#start-button').on("click", () => {
    $('.corner-button').css('display', 'none');
    $('.word').css('display', 'inline-block');
    $('input[type=text]').css('pointer-events', 'all');
    $("#pinyin-character").attr("placeholder", $("#chinese-character").attr("pinyin"));
  });
  let x = Math.floor((Math.random() * charCount));
  $("#chinese-character").text(myJson[x].Word);
  $("#chinese-character").attr("pinyin", myJson[x].OtherPinyin);
  $("#chinese-character").attr("character", myJson[x].Word);
  $("#definition").text(myJson[x]['First Translation']);

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
    
    $("#body").attr("class", "correct");
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
    
    $("#body").attr("class", "correct");
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

