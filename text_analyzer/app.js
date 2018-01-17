function removePunctuation(text){
  return text.toLowerCase().replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,"");
}

function countUniqueWords(){

}

function averageWordLength(){

}

function createTextReport(text){
  var wordBank = removePunctuation(text);
  var wordCount = wordBank.length;
  var uniqeWords;
  var avgWordLength;

  var textReport = $('.js-text-report');
  textReport.find('.js-word-count').text(wordCount);

  textReport.removeClass('hidden');


}

function handleFormSubmit(){
  $('.js-text-form').submit(function(event){
    event.preventDefault();
    //get user's text from the form
    var userText = $(event.currentTarget).find('#user-text').val();
    //alert(userText);

    createTextReport(removePunctuation(userText));
  })
}

$(handleFormSubmit);
