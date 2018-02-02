// Working with Json
// =========================

// Guardo la URL en una variable
var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json',
    superheroes;

// Llamo `XMLHttpRequest` (también llamado XHR). Este interactua con servidores para recuperar información desde un URL.
var request = new XMLHttpRequest();

// `XMLHttpRequest.open()` inicializa la solicitud.
//
// `XMLHttpRequest.open(method, url)` puede recibiar varios parámetros. En nuestro caso asignamos el método HTML `GET` y la URL. Los métodos pueden ser "GET", "POST", "PUT", "DELETE".
request.open('GET', requestURL);

// `XMLHttpRequest.responseType` enumera el tipo de valor que retorna la respuesta. También me permite establecer el tipo de respuesta. Con esto XHR sabe que el servidor retornará un JSON. De esta manera, javascript sabrá que debe convertir el JSON en un objeto de JavaScript.
request.responseType = 'json';

// `XMLHttpRequest.send()` envía ua solicitud.
request.send();

request.onload = function(){
  /* Aquí le asignamos el `response` a una variable. `.response` es uno de los items que pertenece al objeto XHR.*/
  var superheroes = request.response;
  populateHeader(superheroes);
  showHeroes(superheroes);
}

function populateHeader(jsonObj) {
  var container = document.getElementById('super'),
      h1 = document.createElement('h1');

  h1.textContent = jsonObj.squadName;
  container.appendChild(h1);

  var p = document.createElement('p');
  p.textContent = 'Hometown: ' + jsonObj.homeTown + ' // Formed: ' + jsonObj['formed'];
  container.appendChild(p);
}

function showHeroes(jsonObj) {
  var heros = jsonObj.members;
  var container = document.getElementById('heros');

  heros.forEach(function(hero){
    var col = document.createElement('div'),
        heroName = document.createElement('h3'),
        heroAge = document.createElement('p'),
        heroSecretIdentity = document.createElement('p'),
        heroPowers = document.createElement('ul'),
        powers = hero.powers;

    col.classList.add('columns', 'small-4');
    heroName.textContent = hero.name;
    heroAge.textContent = "Age: " + hero.age;
    heroSecretIdentity.textContent = "Secret Identity: " + hero.secretIdentity;

    powers.forEach(function(power){
      var li = document.createElement('li');
      li.textContent = power;
      heroPowers.appendChild(li);
    });

    col.appendChild(heroName);
    col.appendChild(heroAge);
    col.appendChild(heroSecretIdentity);
    col.appendChild(heroPowers);

    container.appendChild(col);
  });

}