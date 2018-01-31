var number;
var scoreCorrect;
var scoreIncorrect;


function startGame(){
  number = 0;
  scoreCorrect = 0;
  scoreIncorrect = 0;
  $('#welcome-container').addClass("hidden");
  $('#quiz-container').removeClass("hidden");
  render();
}


function displayQuestion(){
  var questionArea = $('.questions');
  var questionNumber = $('.q-number');
  questionArea.html(questions[number].question);
  questionNumber.html(number + 1 + " of " + questions.length);

  console.log(questions[number].question);
  console.log(questions[number].choices[0])

}

function displayAnswers(){
  var answerChoices = questions[number].choices;
  //iterate through answer choices for that question and fill in the choice inputs
  for (var i = 0; i < answerChoices.length; i++){
    $('#choice'+ i).html(answerChoices[i]);
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

function nextQuestion(){
  if (number < 10){
    number++;
    console.log(number);
  }
  render();
}

function render(){
  displayQuestion()
  displayAnswers()
}



//Event Listeners
function handlePlayButton(){
  $('#welcome-container').on('click', '.js-play-button', startGame);
}

function handleRestartButton(){
  $('#quiz-container').on('click', '.js-restart', startGame);
  $('#quiz-container').on('click', '.js-next', function(){
    $('.js-next').addClass("hidden");
  });
}

function handleChoices() {
  $('#choice0').click(function(){ checkAnswer(0);})
  $('#choice1').click(function(){ checkAnswer(1);})
  $('#choice2').click(function(){ checkAnswer(2);})
  $('#choice3').click(function(){ checkAnswer(3);})
}

function handleNextButton() {
  $('#quiz-container').on('click', '.js-next', nextQuestion);
}

$(handlePlayButton);
$(handleRestartButton);
$(handleChoices);
$(handleNextButton);
