var number;


function startGame(){
  number = 0;
  $('#welcome-container').addClass("hidden");
  $('#quiz-container').removeClass("hidden");
  $('.answer-choices').css('color', 'black');
  console.log(questions[number].question);
  displayQuestion(number);
  console.log(questions[number].choices[0])
  answerChoices(number);
}

function displayQuestion(number){
  var questionArea = $('.questions');
  questionArea.html(questions[number].question);
}

function answerChoices(number){
  //iterate through answer choices for that question and fill in the choice inputs
  for (var i = 0; i < questions[number].choices.length; i++){
    $('#choice'+ i).html(questions[number].choices[i]);
  }
}

function checkAnswer(answer){
  var rightAnswer = questions[number].correctAnswer;
  if (answer === rightAnswer){
    console.log("Correct!");
    $('#choice'+answer).css('color', 'green')
    $('.js-next').removeClass('hidden');

  } else {
    console.log("Wrong answer");
    $('#choice'+answer).css('color', 'red');
    $('#choice'+rightAnswer).css('color', 'green');
    $('.js-next').removeClass('hidden');
  }
}



//Event Listeners
function handlePlayButton(){
  $('#welcome-container').on('click', '.js-play-button', startGame);
}

function handleRestartButton(){
  $('#quiz-container').on('click', '.js-restart', startGame);
}

function handleChoices() {
  $('#choice0').click(function(){ checkAnswer(0);})
  $('#choice1').click(function(){ checkAnswer(1);})
  $('#choice2').click(function(){ checkAnswer(2);})
  $('#choice3').click(function(){ checkAnswer(3);})
}

$(handlePlayButton);
$(handleRestartButton);
$(handleChoices);
