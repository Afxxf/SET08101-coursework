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

var displayImage =''
var correctAnswers = sessionStorage.getItem('questionID');
var name = sessionStorage.getItem('name');
var minutes = sessionStorage.getItem('minutes');
var seconds = sessionStorage.getItem('seconds');
// do for each q
document.getElementById('intro').innerHTML = ("<h4 style='text-align: center;'> Here's how you did, " + name + '!</h4>'+
'<h5 style="text-align: center"> You completed the quiz in...</h5> <h4 style="text-align: center"><span id="minutes">'+minutes+'</span>:<span id="seconds">'+seconds+'</span></h5>');
for(var counter=0; counter<questions.length; counter++){

  if (correctAnswers.includes(questions[counter].id)){
    displayImage = '<img src="tick.png" alt="correct">'
  }else{
    displayImage = '<img src="cross.png" alt="incorrect">'
  }
  // for each available answer...
  // add output
  document.getElementById('results').innerHTML += (
    '<div id="quizSectionAnswers" style="background-color: #a8c0d3">'+displayImage+'<p style="display:inline">Question '+(counter+1)+':  '
    + questions[counter].question + '</p><p id = "correct" style="float: right;">Correct Answer: <b>'+questions[counter].answers[(questions[counter].correctAnswer)]+'</b></p></div>'
  );
  }

document.getElementById('restartGame').onclick = function(){
  sessionStorage.removeItem('minutes');
  sessionStorage.removeItem('seconds');
  sessionStorage.removeItem('questionID');
  window.location.href = 'startGame.html';
}
