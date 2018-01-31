console.log('Hello');
var number;




function startGame(){
  number = 0;
  $('#welcome-container').addClass("hidden");
  $('#quiz-container').removeClass("hidden");
  console.log(questions[number].question);
}

function displayQuestion(number){
  var questionArea = $('#questions');
  questionArea.html(questions[number].question);
}




//Event Listeners
function handlePlayButton(){
  $('#welcome-container').on('click', startGame);
}

function handleRestartButton(){

}

$(handlePlayButton);
$(handleRestartButton);
