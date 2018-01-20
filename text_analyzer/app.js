function turnToWords(text){
  var noPunct = text.replace(/[~+[\]|<>".,\/#!@$?%\^&\*;:{}=\-_`()]/g, "");
  var removedSpace = noPunct.replace(/\x{2,}/g," ");
  var allWords = removedSpace.toLowerCase().trim();

  return allWords;
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

function averageWordLength(words){
  //take length of all words together and divide by number of words
  var totalLength = words.join("").length;
  return (totalLength / words.length).toFixed(2);

}

function createTextReport(text){
  var wordArray = text.split(" ");
  var wordCount = wordArray.length;
  var uniqueWords = countUniqueWords(wordArray);
  var avgWordLength = averageWordLength(wordArray);

  var textReport = $('.js-text-report');
  textReport.find('.js-word-count').html(wordCount);
  textReport.find('.js-unique-word-count').html(uniqueWords);
  textReport.find('.js-avg-word-length').html(avgWordLength);

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
