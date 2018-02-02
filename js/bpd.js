var REGISTRIES = [];

var csvURL = "http://localhost:9001/src/pdcsvexport.csv";
var request = new XMLHttpRequest();
request.open('GET', csvURL);
request.responseType = 'text';
request.send();

request.onload = function(){
  var response = request.response;
  parteCSV(response);
  console.log(addExpenses(REGISTRIES));
}

function parteCSV(csv) {

  var lines = csv.split("\n").slice(11, -1);
      lines = lines.filter(isNumber);

  lines.forEach(function(registry){
    var registry = registry.split(",");
    var date     = registry[0].split('/');
    REGISTRIES.push(
      new Registry({
        date: new Date(2018,parseInt(date[1]-1), parseInt(date[0]) ),
        type: registry[1],
        amount: registry[2],
        id: registry[3],
        serial: registry[4],
        descripcion: registry[5]
      })
    );
  });
};

function addExpenses(registry) {
  var sum = 0;
  var expenses = filterByType(registry, "CR");
  expenses.forEach(function(el){
    sum += parseFloat(el.amount);
  });
  return sum.toFixed(2);
}


var Registry = function(obj) {
  this.date = obj.date;
  this.type = obj.type;
  this.amount = obj.amount;
  this.id = obj.id;
  this.serial = obj.serial;
  this.descripcion = obj.descripcion
}

function isNumber(item) {
  item = item.slice(0,1).trim();
  return item !== undefined && item !== "" && !isNaN(item);
}

function filterByType(array, type){
  return array.filter(function(el){ return el.type == type });
}

function removeLatinChars(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, ''); // remove invalid chars
  str = toCamelCase(str)

  return str;
}


function toCamelCase(str){
  return str.split(' ').map(function(word,index){
    // If it is the first word make sure to lowercase all the chars.
    if(index == 0){
      return word.toLowerCase();
    }
    // If it is not the first word only upper case the first char and lowercase the rest.
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
}