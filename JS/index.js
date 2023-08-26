import myJson from '../vocabulary/TOCFL-1.json' assert {type: 'json'};

let errors = 0;

function adjustFontSize() {
  $('#chinese-character').each(function() {
    const charCount = $(this).text().trim().length;
    
    if (charCount > 3) {
      $(this).css('font-size', '2.5rem');
    } else if (charCount <= 3) {
      $(this).css('font-size', '4rem');
    }
  });
}

$(document).ready(() => {
  
  
  adjustFontSize();
  

  $('.pinyin-textbox').on('submit', () => {
      return false;
  });
});
$('.pinyin-textbox').keypress((e) => {
  
  if (e.which === 13 && ($("#chinese-character").attr("pinyin") == $("#pinyin-character").val())) {
      
    let x = Math.floor((Math.random() * 135));
    $("#chinese-character").text(myJson[x].Word);
    $("#chinese-character").attr("pinyin", myJson[x].OtherPinyin)
    $("#chinese-character").attr("character", myJson[x].Word)
    $("#pinyin-character").val("");
    $("#pinyin-character").attr("placeholder", "");
    
    $("#body").attr("class", "correct");
    $("#definition").text(myJson[x]['First Translation']);
    adjustFontSize();
    let errors = 0;
}
else if (e.which === 13 && ($("#chinese-character").attr("character") != $("#pinyin-character").val()) && errors < 7) {
  $("#pinyin-character").val("");
  $("#body").attr("class", "incorrect");
  adjustFontSize();
  errors++;
}
else if (e.which === 36 && ($("#chinese-character").attr("pinyin") == $("#pinyin-character").val())) {
      
    let x = Math.floor((Math.random() * 135));
    $("#chinese-character").text(myJson[x].Word);
    $("#chinese-character").attr("pinyin", myJson[x].OtherPinyin)
    $("#chinese-character").attr("character", myJson[x].Word)
    $("#pinyin-character").val("");
    $("#pinyin-character").attr("placeholder", "");
    
    $("#body").attr("class", "correct");
    $("#definition").text(myJson[x]['First Translation']);
    adjustFontSize();
    let errors = 0;
}
else if (e.which === 36 && ($("#chinese-character").attr("character") != $("#pinyin-character").val()) && errors < 7) {
  $("#pinyin-character").val("");
  $("#body").attr("class", "incorrect");
  adjustFontSize();
  errors++;
}
else if (errors == 7){
  $("#pinyin-character").val("");
  $("#pinyin-character").attr("placeholder", $("#chinese-character").attr("pinyin"));
  adjustFontSize();
  errors = 4;
}
})

