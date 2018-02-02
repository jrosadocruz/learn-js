var questionURL = "http://localhost:9001/src/quizz.json";
var request = new XMLHttpRequest();
request.open('GET', questionURL);
request.responseType = 'json';
request.send();

request.onload = function () {
  var allQuestions = request.response;


  var currentQuestion = 0,
      correctAnswers = 0,
      userAnswers = [],
      calloutExist = false;

  var qForm = document.getElementById('q-form'),
      qQuestion = document.getElementById('q-question-name'),
      qContainer = document.getElementById('q-answers-container'),
      qNext = document.getElementById('q-next'),
      qBack = document.getElementById('q-back'),
      qCallout = document.getElementById('callout'),
      continueQ = false;

  function toggleBtn() {
    qBack.disabled = !qBack.disabled;
  }

  function previousQuestion(e) {
    e.preventDefault();
  }

  function createChoices(array) {
    var DOMelems = '',
      newHTML = '',
      html = '<label for="answer-%id%"><input id="answer-%id%" type="radio" name="answers" value="%id%">%value%</label>';

    array.forEach(function (choiceLabel, index, currArray) {
      newHTML = html.split('%id%').join(index);
      newHTML = newHTML.replace('%value%', choiceLabel)
      DOMelems += newHTML;
    });
    return DOMelems;
  }

  function createQuestions(qID) {
    qQuestion.innerHTML = allQuestions[qID].question
    qContainer.innerHTML = createChoices(allQuestions[qID].choices);

    if (userAnswers.length && userAnswers.indexOf(userAnswers[qID]) === qID) {
      var checkedInput = document.getElementById("answer-" + userAnswers[qID]);
      checkedInput.checked = true;
    }
  };

  function checkRadiosAnswer() {
    var result,
      radios = document.getElementsByName('answers');

    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
        break;
      }
    }

  }

  function hideCallout() {
    qCallout.style.display = 'none';
  }
  function showCallout() {
    qCallout.style.display = 'block';
  }


  function countCorrectAnswers() {
    allQuestions.forEach(function (currVal, index, currArray) {
      if (currVal.correctAnswer == userAnswers[index]) {
        correctAnswers++;
      }
    });
  };

  function printResultsMsg() {
    var html = '<h2>Finished</h2>';
    html += "<p>You got " + correctAnswers + " out of " + allQuestions.length + " questions correct";

    qForm.innerHTML = html;
  }



  qBack.addEventListener("click", function (e) {
    e.preventDefault();
    hideCallout();

    if (currentQuestion > 0) {
      currentQuestion--;
      createQuestions(currentQuestion);
    }
    if (currentQuestion === 0) { toggleBtn(); }

  });

  qNext.addEventListener("click", function (e) {
    e.preventDefault();

    var userInput = checkRadiosAnswer();

    if (!userInput) { showCallout() };

    if (userInput) {
      hideCallout();

      if (currentQuestion <= 0) { toggleBtn(); }

      if (currentQuestion < allQuestions.length - 1) {
        userAnswers[currentQuestion] = userInput;
        currentQuestion++;
        createQuestions(currentQuestion);
      } else {
        userAnswers[currentQuestion] = userInput;
        countCorrectAnswers();
        printResultsMsg();
      }
    };

  });

  createQuestions(0);

};