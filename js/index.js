// Try Another Recipe Button

var tryAnotherRecipeBtn = document.querySelector("#tryAnotherRecipeBtn");

tryAnotherRecipeBtn.addEventListener("click", function () {
  mainApp(dishes);
});

// Rating Badge Component
var ratingBadge = document.querySelector("#ratingBadge");

// Dish Image Element
var dishImage = document.querySelector("#dishImage");

// Dish time and serve table component
var dishTimeServeTable = document.querySelector("#dishTimeServeTable");
var prepTime = dishTimeServeTable.querySelector("#prepTime");
var cookTime = dishTimeServeTable.querySelector("#cookTime");
var serveNum = dishTimeServeTable.querySelector("#serveNum");

// Dish difficalties and type badge component
var dishDiffTypeCom = document.querySelector("#dishDiffTypeCom");
var difficaltyType = dishDiffTypeCom.querySelector("#difficaltyType");
var dishType = dishDiffTypeCom.querySelector("#dishType");

// Dish name and description
var dishName = document.querySelector("#dishName");
var dishDescription = dishName.nextElementSibling;

// Dish Attention or Warning Component
var dishFlagCom = document.querySelector("#dishFlagCom");
var dishFlagIcon = dishFlagCom.querySelector("#dishFlagIcon");
var dishFlagTitle = dishFlagCom.querySelector("#dishFlagDesc");
var dishFlagDesc = dishFlagCom.querySelector("#dishFlagDesc");

// Navs and Tabs contents
var navTabContent = document.querySelector("#nav-tabContent");
// 1-Get ingredient, instructions and chief Lists
var ingredientList = navTabContent.querySelector(".ingredients-list");
var instructionsList = navTabContent.querySelector(".instructions-list");
var chiefList = navTabContent.querySelector(".chief-list");

// Nutrition tab content
var nutritionTab = document.querySelector("#nav-nutrition");
var caloryUnit = nutritionTab.querySelector("#caloryUnit");
var proteinUnit = nutritionTab.querySelector("#proteinUnit");
var carbsUnit = nutritionTab.querySelector("#carbsUnit");
var fatUnit = nutritionTab.querySelector("#fatUnit");
var fiberUnit = nutritionTab.querySelector("#fiberUnit");
var sodiumUnit = nutritionTab.querySelector("#sodiumUnit");

// Functions

// Find the index of spacific class using Regex
function searchForClass(classListArr, regRexPattern) {
  var pattern = regRexPattern;
  for (var i = 0; i < classListArr.length; i++) {
    if (classListArr[i].match(pattern)) {
      return classListArr[i];
    }
  }
}

// Now I'm going to create a function that will take an array and a list element where I want to place those item to.
function createListElements(mainListContainer, listArr, innerTag) {
  for (var i = 0; i < listArr.length; i++) {
    var listItemEle = document.createElement("li");
    listItemEle.classList.add("list-group-item");

    if (innerTag) {
      var innerTagEle = document.createElement(innerTag);
      innerTagEle.textContent = listArr[i];
      listItemEle.append(innerTagEle);
    } else {
      console.log("There is no inner tag");
      listItemEle.textContent = listArr[i];
    }
    mainListContainer.append(listItemEle);
  }
}

// Pick a Random dish object based on Array length
function pickRandomDish(dishesArr) {
  return dishesArr[Math.floor(Math.random() * dishesArr.length)];
}

// Check if the dish have flag statment
function checkDishFlagStatus(dishObj) {
  // Notes: I do have two statment warning and attention. warning use warning-dish-info and fa-triangle-exclamation for icon. on otherhand attention use attention-dish-info and fa-circle-exclamation.
  if (dishObj.flagInfo.flagType) {
    dishFlagCom.classList.add(dishObj.flagInfo.flagTypeClass);
    if (!dishFlagIcon.classList.contains(dishObj.flagInfo.flagIcon)) {
      dishFlagIcon.classList.replace(
        searchForClass(dishFlagIcon.classList, /fa-\w{1,}-exclamation/),
        dishObj.flagInfo.flagIcon
      );
    }
    dishFlagTitle.innerHTML = dishObj.flagInfo.flagTitle;
    dishFlagDesc.innerHTML = dishObj.flagInfo.flagDescription;
    dishFlagCom.classList.remove("d-none");
  } else {
    dishFlagCom.classList.add("d-none");
  }
}

function mainApp(dishesArr) {
  // First we will pick the random index based of the dishes array length.
  var randomDishObj = pickRandomDish(dishesArr);
  // var randomDishObj = dishesArr[10];
  // We will start editing all elements bashed of the random dish we picked

  // 1- Editing Rating badge
  ratingBadge.querySelector("#reviewNumber").innerHTML =
    randomDishObj.ratingBadge.reviewNumber;
  ratingBadge.querySelector("#ratingNumber").innerHTML =
    randomDishObj.ratingBadge.ratingNumber;

  // 2- Editing Image attributes src and alt
  dishImage.setAttribute("src", randomDishObj.image.path);
  dishImage.setAttribute("alt", randomDishObj.image.imageAlt);

  // 3- Edit Dish time and serve table content elements
  prepTime.innerHTML = randomDishObj.dishTimeServ.prepTime;
  cookTime.innerHTML = randomDishObj.dishTimeServ.cookTime;
  serveNum.innerHTML = randomDishObj.dishTimeServ.serveNum;

  // 4- Edit Dish difficalties and type badge component
  // Get the existing or current difficalities class
  var difficalityClass = searchForClass(difficaltyType.classList, /bg-\w{1,}/);

  // Difficality Type class and text replace
  difficaltyType.classList.replace(
    difficalityClass,
    randomDishObj.dishDiffTypeBadge.difficaltyClass
  );

  difficaltyType.innerHTML = randomDishObj.dishDiffTypeBadge.difficaltyType;

  // Get the existing or current dish type class
  var dishTypeClass = searchForClass(dishType.classList, /\w{1,}-food/);

  dishType.classList.replace(
    dishTypeClass,
    randomDishObj.dishDiffTypeBadge.dishTypeClass
  );

  // Dish type Class replace
  dishType.innerHTML = randomDishObj.dishDiffTypeBadge.dishType;

  // 5- Edit Dish name and description
  dishName.innerHTML = randomDishObj.name;
  dishDescription.innerHTML = randomDishObj.description;

  // 6- OPTIONAL: Adding Dish Attention or Warning Component based on if the dish have one or not.

  //First we need to check if the dish have a flag warning or attention only if yes it will remove the d-none class on Dish flag component and add the status class as well. Also, it will change the icon shap.
  checkDishFlagStatus(randomDishObj);

  // 7- create and add list for ingredient, instructions and chief Lists

  // First we need to empty each container before adding new elements
  ingredientList.innerHTML = "";
  instructionsList.innerHTML = "";
  chiefList.innerHTML = "";
  // Second create and add new elements in each list
  createListElements(ingredientList, randomDishObj.ingredientList, "p");
  createListElements(instructionsList, randomDishObj.instructionsList, "p");
  createListElements(chiefList, randomDishObj.chiefList);

  // 8- Edit Nutrition tab content

  caloryUnit.textContent = randomDishObj.nutritionTab.caloryUnit;
  proteinUnit.textContent = randomDishObj.nutritionTab.proteinUnit;
  carbsUnit.textContent = randomDishObj.nutritionTab.caloryUnit;
  fatUnit.textContent = randomDishObj.nutritionTab.fatUnit;
  fiberUnit.textContent = randomDishObj.nutritionTab.fiberUnit;
  sodiumUnit.textContent = randomDishObj.nutritionTab.sodiumUnit;
}

mainApp(dishes);
