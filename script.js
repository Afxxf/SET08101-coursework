// initialise array containing question info
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

// initialise variables to hold elements
var quiz = document.getElementById('quiz');
var evaluate = document.getElementById('submit');

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
        for(option in questions[counter].answers){
          // add potential answers
          allAnswers = allAnswers + (
            '<input type="radio" name="id'+counter+'" value="'+option+'">'
              + questions[counter].answers[option]
            + '<br>'
          );
        }
        var currentDisplayImage = "<img src="+ questions[counter].id+'.jpg'+" width='350px' alt='image"+counter+"'><br>";
        // add html to the page
        document.getElementById('quiz').innerHTML += (
          '<div id="quizSection">' + currentDisplayImage + '<h4 style="text-align: center">Question '+(counter+1)+'</h4> <p class="question" style="text-align:center;">'
          + questions[counter].question + '</p><br>'
          + '<p class="answers" style="text-align:center;"><b>' + allAnswers + '</b></p><br>' +
          '<button id='+counter+'>SUBMIT</button></div>'
        );
      }
    }

    function checkAllAnswers(questions, quiz){
      // initialise relevant variables
      var answerSection = quiz.querySelectorAll('.answers');
      var correctAnswerIdList = []
      var selectedOption = '';
      // get submitted answers
      for(var id=0; id<questions.length; id++){
        // find selected answer
        selectedOption = (answerSection[id].querySelector('input[name=id' + id +']:checked')|| '').value;
        if(selectedOption===questions[id].correctAnswer){
          // if answer is correct add it to the list of correct answers for use on results page
          correctAnswerIdList.push(questions[id].id)
        }
      }
      // set key and value session storage
      sessionStorage.setItem('questionID', correctAnswerIdList);
      var seconds = document.getElementById('seconds').textContent;
      sessionStorage.setItem('seconds', seconds);
      var minutes = document.getElementById('minutes').textContent;
      sessionStorage.setItem('minutes', minutes);
      // direct user to results page
      window.location.href = "results.html";
    }

    display_questions(questions, quiz);
    // on click of button, evalute all questions
    evaluate.onclick = function(){
      checkAllAnswers(questions, quiz);
    }
    for (let id = 0; id < 8; id++) {
      // for every button add an onclick event to show single result
      document.getElementById(id).onclick = function(){
        getSingleAnswer(questions, quiz, id);
      }
    }
  var correctAudio = document.getElementById('audio-correct')
  var incorrectAudio = document.getElementById('audio-incorrect')
  function getSingleAnswer(questions, quiz, id){
    var answerSection = quiz.querySelectorAll('.answers');
    var selectedOption = '';

    selectedOption = (answerSection[id].querySelector('input[name=id' + id +']:checked')|| '').value;

    if(selectedOption===questions[id].correctAnswer){
      // style accordingly
      document.getElementById(id).style.color = 'green';
      document.getElementById(id).style.background = '#d0ece6';
      // play relevant sound
      correctAudio.play();
    }
    else{
      // stlye accordingly
      document.getElementById(id).style.color = '';
      document.getElementById(id).style.background = '#be4f62';
      // play revelant sound
      incorrectAudio.play();
      }
    }

  var audioVolume = 1;
  document.getElementById('increase').onclick = function(){
    if (audioVolume != 1){
    audioVolume = audioVolume + 0.2;
    correctAudio.volume = audioVolume;
    incorrectAudio.volume = audioVolume;
    }
  }
  document.getElementById('decrease').onclick = function(){
    if (audioVolume != 0){
    audioVolume = audioVolume - 0.2;
    correctAudio.volume = audioVolume;
    incorrectAudio.volume = audioVolume;
    }
  }
