document.getElementById('play').onclick = function(){
var name = document.getElementById("name").value;
if (name === ''){
  alert("Please enter your name!");
}else{
  sessionStorage.setItem('name', name);
  window.location.href = "startGame.html";
}
}
