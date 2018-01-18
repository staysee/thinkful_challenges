function turnToWords(text){
  var noPunct = text.replace(/[~+[\]|<>".,\/#!@$?%\^&\*;:{}=\-_`()]/g, "");
  var removedSpace = noPunct.replace(/\x{2,}/g," ");
  var wordArray = removedSpace.toLowerCase().trim().split(" ");

  return wordArray;
}

function countUniqueWords(words){
  var uniqueWords = [];

  //if word is not in the uniqueWords array, add it
  for(var i = 0; i < words.length; i++){
    if (uniqueWords.indexOf(words[i]) === -1){
      uniqueWords.push(words[i]);
    }
  }
  //length of array is number of unique words
  return uniqueWords.length;
}

function averageWordLength(){
  //take length of all words together and divide by number of words

}

function createTextReport(text){
  var words = turnToWords(text);
  var wordCount = words.split(" ").length;
  var uniqueWords = countUniqueWords(words);
  var avgWordLength;

  var textReport = $('.js-text-report');
  textReport.find('.js-word-count').html(wordCount);
  textReport.find('.js-unique-word-count').html(uniqueWords);

  textReport.removeClass('hidden'); //remove the hidden class to show the text report
}

function handleFormSubmit(){
  $('.js-text-form').submit(function(event){
    event.preventDefault();

    var userText = $(event.currentTarget).find('#user-text').val(); //get user's text from the form
    //alert(userText);

    createTextReport(turnToWords(userText));
  })
}

$(handleFormSubmit);
