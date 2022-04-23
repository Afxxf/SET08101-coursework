var questions = [
  {
    question: "Scotland's capital Edinburgh is famous for its castle that looks over the city. But when did constuction start on the castle?",
    answers: {
      a: '9th Century',
      b: '11th Century',
      c: '17th Century',
      d: '19th Century'
    },
    correctAnswer: 'b',
    id: '1'
  },
  {
    question: "Scotland's whisky is enjoyed all over the world and is one of Scotland's biggest exports. But which Scottish island produces the most whisky?",
    answers: {
      a: 'Skye',
      b: 'Mull',
      c: 'Islay',
      d: 'Jura'
    },
    correctAnswer: 'c',
    id: '2'
  },
  {
    question: "Who wrote Scotland's national anthem, Flower of Scotland?",
    answers: {
      a: 'Roy Williamson',
      b: 'William Wallace',
      c: 'Ronnie Browne',
      d: 'Robert Burns'
    },
    correctAnswer: 'a',
    id: '3'
  },
  {
    question: "What battle was fought against England in 1314 near Stirling?",
    answers: {
      a: 'Battle of Loudoun Hill',
      b: 'Battle of Bannockburn',
      c: 'Battle of Culloden',
      d: 'Battle of Boroughmuir'
    },
    correctAnswer: 'b',
    id: '4'
  },
  {
    question: "Scotland has many islands that stretch far out into the North sea and Atlantic Ocean. But where is the most northerly point on mainland Scotland?",
    answers: {
      a: "John o' Groats",
      b: 'Lerwick',
      c: 'Inverness',
      d: 'Fort William'
    },
    correctAnswer: 'a',
    id: '5'
  },
  {
    question: "Which Scottish novelist wrote the famous books 'Treasure Island', and 'Kidnapped'?",
    answers: {
      a: 'Sir Walter Scott',
      b: 'Ian Rankin',
      c: 'James Hogg',
      d: 'Robert Louis Stevenson'
    },
    correctAnswer: 'd',
    id: '6'
  },
  {
    question: 'When did a 35 year long ban on wearing Highland dress, such as kilts, begin?',
    answers: {
      a: '1746',
      b: '1314',
      c: '1689',
      d: '1805'
    },
    correctAnswer: 'a',
    id: '7'
  },
  {
    question: 'Scottish Gaelic used to be the most popular language in Scotland, but in the most recent census how many people reported being able to speak it?',
    answers: {
      a: '6.3%',
      b: '0.8%',
      c: '1.1%',
      d: '14.5%'
    },
    correctAnswer: 'c',
    id: '8'
  }
];

// Randomisation of array adapted from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// this is done at the start of the quiz everytime
var index = questions.length,  ranIndex;
for(var counter=0; counter<questions.length; counter++){
  randomIndex = Math.floor(Math.random() * index);
  index--;
  // swap current and random indexs
  [questions[index], questions[randomIndex]] = [
    questions[randomIndex], questions[index]];
}

var quiz = document.getElementById('quiz');
var evaluate = document.getElementById('submit');
var results = document.getElementById('results');

// if the user decides to restart, refresh the page and set them at the top of the page
document.getElementById('restart').onclick = function(){
  location.reload();
  scroll(0,0);
}


    function display_questions(questions, quiz){

      var answers;

      // do for each q
      for(var counter=0; counter<questions.length; counter++){

        var allAnswers = ''
        // for each available answer...
        for(letter in questions[counter].answers){
          // add potential answers
          allAnswers = allAnswers + (
            '<input type="radio" name="id'+counter+'" value="'+letter+'">'
              + questions[counter].answers[letter]
            + '<br>'
          );
        }
        var currentDisplayImage = "<img src="+ questions[counter].id+'.jpg'+" width='350px' alt='image"+counter+"'><br>";
        // add output
        document.getElementById('quiz').innerHTML += (
          '<div id="quizSection">' + currentDisplayImage + '<h4 style="text-align: center">Question '+(counter+1)+'</h4> <p class="question" style="text-align:center;">'
          + questions[counter].question + '</p><br>'
          + '<p class="answers" style="text-align:center;"><b>' + allAnswers + '</b></p><br>' +
          '<button id='+counter+'>SUBMIT</button></div>'
        );
      }
    }

    function allAnswersShow(questions, quiz, results){
      // gather answer containers from our quiz
      var answerContainers = quiz.querySelectorAll('.answers');
      var correctAnswerIdList = []
      // keep track of user's answers
      var userAnswer = '';
      var numCorrect = 0;
      //
      for(var id=0; id<questions.length; id++){
        // find selected answer
        userAnswer = (answerContainers[id].querySelector('input[name=id' + id +']:checked')|| '').value;
        if(userAnswer===questions[id].correctAnswer){
          numCorrect = numCorrect + 1;
          // store correctly answered questions
          correctAnswerIdList.push(questions[id].id)
        }
      }
      results.innerHTML = numCorrect + ' out of ' + questions.length;
      sessionStorage.setItem('questionID', correctAnswerIdList);
      var seconds = document.getElementById('seconds').textContent;
      sessionStorage.setItem('seconds', seconds);
      var minutes = document.getElementById('minutes').textContent;
      sessionStorage.setItem('minutes', minutes);
      window.location.href = "results.html";
    }

    display_questions(questions, quiz);

    // on submit, show results
    evaluate.onclick = function(){
      allAnswersShow(questions, quiz, results);
    }
    for (let id = 0; id < 8; id++) {
      document.getElementById(id).onclick = function(){
        getSingleAnswer(questions, quiz, results, id)
      }
    }

  function getSingleAnswer(questions, quiz, results, id){
    var answerContainers = quiz.querySelectorAll('.answers');
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    // find selected answer
    userAnswer = (answerContainers[id].querySelector('input[name=id' + id +']:checked')|| '').value;

    if(userAnswer===questions[id].correctAnswer){
      numCorrect = numCorrect + 1;
      document.getElementById(id).style.color = 'green';
      document.getElementById(id).style.background = '#d0ece6';
      document.getElementById('audio-correct').play();
    }
    else{
      document.getElementById(id).style.color = '';
      document.getElementById(id).style.background = '#be4f62';
      document.getElementById('audio-incorrect').play();
      }
    }
