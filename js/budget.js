var budgetController = (function(){

  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [{id:1, description:"Primer Gasto", value: 1, percentage: -1}, {id:2, description:"Segundo Gasto", value: 1, percentage: -1}],
      inc: [{id:1, description:"Primera Ganancia", value: 2},{id:2, description:"Segunda Ganancia", value: 2}]
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  var calculateTotal = function(type) {
    var sum = 0;
    var items = data.allItems[type];
    items.forEach(function(item){
      sum += parseInt(item.value);
    });
    data.totals[type] = sum;
    data.percentage = (data.totals.inc > 0) ?  Math.round((data.totals.exp / data.totals.inc) * 100) : -1;
  };

  var calculatePercentage = function() {

  };

  return {
    calculateBudget: function(){
      calculateTotal('inc');
      calculateTotal('exp');
      data.budget = data.totals.inc - data.totals.exp;
    },
    addItem: function(type, description, value){
      var newItem, ID;

      if( data.allItems[type].length > 0  ) {
        ID = data.allItems[type][data.allItems[type].length -1 ].id + 1;
      } else {
        ID = 0;
      }

      if ( type === "inc" ) {
        newItem = new Income(ID, description, value);
      } else if ( type === "exp" ) {
        newItem = new Expense(ID, description, value);
      }

      data.allItems[type].push(newItem);

      return newItem;
    },
    getData: function() {
      return data.allItems
    },
    deleteItem: function(ID, type) {
      var items = data.allItems[type];
      // console.log(items);
      for (var i = 0; i < items.length; i++) {
        if(parseInt(items[i].id) === parseInt(ID)) {
          data.allItems[type].splice(i,1);
          return;
        };
      }

    },
    getBudget: function() {
      return {
        expenses: data.totals.exp,
        income: data.totals.inc,
        budget: data.budget,
        percentage: data.percentage
      };
    },
    getAllData: function() {
      return data;
    }
  }


})();

var UIController = (function(){

  var DOMelements = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    addBtn: '.add__btn',
    container: '.container',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetValLbl: '.budget__value',
    budgetIncLbl: '.budget__income--value',
    budgetIncPerLbl: '.budget__income--percentage',
    budgetExpLbl: '.budget__expenses--value',
    budgetExpPerLbl: '.budget__expenses--percentage'
  };

  return {
    getInput: function(){
      return {
        type: document.querySelector(DOMelements.inputType).value,
        description: document.querySelector(DOMelements.inputDescription).value,
        value: document.querySelector(DOMelements.inputValue).value
      }
    },
    addToList: function(itemObj, type) {
      var container, html, newHTML;

      if(type === "inc") {
        container = DOMelements.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn">x</button></div></div></div>';
      } else if (type === "exp") {
        container = DOMelements.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__delete"><button class="item__delete--btn">x</button></div></div></div>';
      };

      newHTML = html.replace('%description%', itemObj.description);
      newHTML = newHTML.replace('%value%', itemObj.value);
      newHTML = newHTML.replace('%id%', itemObj.id);

      document.querySelector(container).insertAdjacentHTML('beforeend', newHTML);
    },
    showList: function(itemsArray, type) {
      itemsArray.forEach(function(item, index, array) {
        UIController.addToList(item, type);
      });
    },
    deleteFromList: function(id){
      var el = document.getElementById(id)
      el.parentNode.removeChild(el);
    },
    getUIelements: function() {
      return {
        addBtn: document.querySelector(DOMelements.addBtn),
        container: document.querySelector(DOMelements.container)
      }
    },
    clearInputs: function() {
      document.querySelector(DOMelements.inputDescription).value = "";
      document.querySelector(DOMelements.inputValue).value = "";
      document.querySelector(DOMelements.inputDescription).focus();
    },
    updateUI: function(obj) {
      document.querySelector(DOMelements.budgetValLbl).textContent = obj.budget;
      document.querySelector(DOMelements.budgetExpLbl).textContent = "- " + obj.expenses;
      document.querySelector(DOMelements.budgetIncLbl).textContent = "+ " + obj.income;
      document.querySelector(DOMelements.budgetExpPerLbl).textContent = obj.percentage + "%";
    }
  }


})();

var controller = (function( UICtrl, budgetCtrl ){
  var DOMelems = UICtrl.getUIelements();

  DOMelems.addBtn.addEventListener('click', function(){
    var userInput = UICtrl.getInput();

    if( !userInput.description  || !userInput.value  && !isNaN(userInput.value) ) {
      return;
    }

    var newItem = budgetCtrl.addItem(userInput.type, userInput.description, userInput.value);

    UICtrl.addToList(newItem, userInput.type);

    budgetCtrl.calculateBudget();

    UICtrl.updateUI(budgetCtrl.getBudget());

    UICtrl.clearInputs();

  });

  DOMelems.container.addEventListener('click', function(e) {
    var itemID, ID;
    itemID = e.target.parentNode.parentNode.parentNode.id;

    if(itemID){
      UICtrl.deleteFromList(itemID);
      var ID = itemID.split('-')[1];
      var type = (itemID.split('-')[0] === "income") ? "inc" : "exp";
      budgetCtrl.deleteItem(ID, type);
      budgetCtrl.calculateBudget();
      UICtrl.updateUI(budgetCtrl.getBudget());
      console.log(budgetCtrl.getData());
    }

  });

  return {
    init: function(){

      budgetCtrl.calculateBudget();

      var data = budgetCtrl.getData();

      UICtrl.showList(data.inc, "inc");
      UICtrl.showList(data.exp, "exp");
      UICtrl.updateUI(budgetCtrl.getBudget());
      UICtrl.clearInputs();

    },
    logData: function(){
      console.log(budgetCtrl.getAllData());
    }
  }

})(UIController,budgetController);

controller.init();