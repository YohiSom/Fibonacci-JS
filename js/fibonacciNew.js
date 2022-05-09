let button = document.getElementById("fiboButton");
let loader1 = document.getElementById("loader1");
let above50 = (document.getElementById("above50").style.opacity = "0");
let serverError = "";
let listCal = document.getElementById("list-cal");

function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n === 0) return 0;
    if (n <= 2) return 1;
    return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo));
  }
  
function fiboGet(number) {
  fetch(`http://localhost:5050/fibonacci/${number}`)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }

      return response;
    })

    .then((response) => response.json())
    .then((data) => {
      loader1.style.opacity = "0";
      answer.innerText = data.result;
    })
    .catch((err) => {
      answer.innerText = "Server " + err;
      answer.style.color = "red";
    });
}

function fiboNum() {
  let inputEntered = document.getElementById("inputEntered").value;
  
  if (inputEntered > 50) {
    document.getElementById("inputEntered").style.color = "red";
    document.getElementById("inputEntered").style.borderColor = "red";
    document.getElementById("above50").style.opacity = "0.4";
  }
  loader1.style.opacity = "0";

  fiboGet(inputEntered);
}



function FiboNotSave(){
    let answer = document.getElementById("answer");
    let inputEntered = document.getElementById("inputEntered").value;
    
  if (inputEntered > 50) {
    document.getElementById("inputEntered").style.color = "red";
    document.getElementById("inputEntered").style.borderColor = "red";
    document.getElementById("above50").style.opacity = "0.4";
    answer.style.display = "none";
  }
  loader1.style.opacity = "0";

  answer.innerText = fibonacci(inputEntered);
  
}


function buttonOn(){
let checkBox =  document.getElementById("flexCheckDefault");
let button = document.getElementById("fiboButton");

if (checkBox.checked == true){
button.addEventListener("click", fiboNum);}
else {
    button.addEventListener("click", FiboNotSave);}

}
buttonOn();

let myList = document.getElementById("myList");

function fetchFibo() {
  fetch(`http://localhost:5050/getFibonacciResults`)
    .then((response) => response.json())
    .then((data) => {
      getReport(data.results);
    });
}

fetchFibo();

function getReport(fiboReport) {
  fiboReport.forEach((item) => {
    let li = document.createElement("li");
    let milliesec = item.createdDate;
    let dateObj = new Date(milliesec);
    li.innerHTML = `The Fibonnaci Of <b>${item.number}</b> is <b>${item.result}</b>. Calculated at ${dateObj}`;
    li.style.borderBottom = "1px solid #000000";
    li.style.fontFamily = "open sans";
    li.style.fontSize = "22px";
    li.style.fontWeight = "400";
    myList.appendChild(li);
  });
}


