const mealsByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var randomList=[];
var mealsList = [];
var item;
var searchArea = document.getElementById('searchArea')
fetch(mealsByName)
.then((result) => result.json()).then((data) => {
    let arrData = data.meals;
    let randomArr = getRandomArr(arrData, 8);
    randomList = randomArr;
    mealsList = arrData;
    // Displying random objects from the main array
    searchArea.innerHTML = randomCardsDisplay(randomArr);
    console.log(arrData);
    console.log(randomArr);
});
// This function is used to select random objects from the data array. 
function getRandomArr(array, randomeItemsCount) {
   let arrCopy = array;
   let randomArr = [];
   for (let i=0; i < randomeItemsCount; i++) {
      let index = Math.floor(Math.random() * arrCopy.length);
      randomArr.push(arrCopy[index]);
      arrCopy.splice(index, 1);
   }
   return randomArr;
}
//this function is used to display data frome an array as bootstrap cards
function randomCardsDisplay(array) {
  let displyedItems = "";
    for (let i=0; i < array.length; i++) {
        displyedItems += 
        `<div class="col-10 col-sm-6 col-md-4 col-lg-3">
          <div class="card">
            <img src="${array[i].strMealThumb}" alt="image">
            <div class="card-body">
              <h5 class="card-title">${array[i].strMeal}</h5>
              <p class="card-text">${array[i].strArea}</p>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick="displaySelectedMeal(this)"
               data-bs-target="#exampleModal">
               Show More Infos</button>
            </div>
          </div>
        </div>`
    }
    return displyedItems;
}
// on click on the wanted meal this function launch a modal window that shows the meal's infoemations
function displaySelectedMeal(element) {
  var ModalBody = document.getElementById("ModalBody");
  var childrens = searchArea.children;
  var childClicked = element.parentNode.parentNode.parentNode;
  var selectedChildIndex = Array.from(childrens).findIndex(function(child){ return child === childClicked});
  var selectedChild = randomList[selectedChildIndex];
  ModalBody.innerHTML = 
    `
    <div class="card">
    <img src="${selectedChild.strMealThumb}" class="card-img-top">
    <div class="card-body">
      <h4 class="card-title">Meal Name : ${selectedChild.strMeal}</h5>
      <h5 class="card-title">Region : ${selectedChild.strArea}</h5>
      <h5 class="card-title">Category : ${selectedChild.strCategory}</h5>
      <h5 class="card-title">More Infos : </h5>
      <p "card-text">${selectedChild.strIngredient1}, ${selectedChild.strIngredient2}, 
      ${selectedChild.strIngredient3}, ${selectedChild.strIngredient4}, ${selectedChild.strIngredient5},
      ${selectedChild.strIngredient6}, ${selectedChild.strIngredient7}, ${selectedChild.strIngredient8},
      </p>
      <h5 class="card-title">Preparation Instructions :</h5>
      <p class="card-text">${selectedChild.strInstructions}</p>
    </div>
    </div>  
  `
}
// search and display functions 
function search(){
  var userInput = document.getElementById('input').value;
  var filteredData = mealsList.filter(item => item.strMeal.toUpperCase() === userInput.toUpperCase());
  var title = document.getElementById("searchAreaTitle");
  console.log(filteredData)
  if(filteredData != "") {
    let itemFound = "";
    for (let i=0; i < filteredData.length; i++) {
     item = filteredData[i];
      itemFound += 
        `<div class="col-10 col-sm-6 col-md-4 col-lg-3">
          <div class="card">
            <img src="${filteredData[i].strMealThumb}" alt="image">
            <div class="card-body">
              <h5 class="card-title">${filteredData[i].strMeal}</h5>
              <p class="card-text">${filteredData[i].strArea}</p>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick="displayOnModal()"
               data-bs-target="#exampleModal">
               Show More Infos</button>
            </div>
          </div>
        </div>`
    }
    title.innerHTML = `Search results for ${userInput}`
    searchArea.innerHTML = itemFound;
  } else {
    title.innerHTML = `No result found for ${userInput}`
    searchArea.innerHTML = "";
  }
  userInput = "";
}

function displayOnModal() {
  var ModalBody = document.getElementById("ModalBody");
  ModalBody.innerHTML = 
    `
    <div class="card">
    <img src="${item.strMealThumb}" class="card-img-top">
    <div class="card-body">
      <h4 class="card-title">Meal Name : ${item.strMeal}</h5>
      <h5 class="card-title">Region : ${item.strArea}</h5>
      <h5 class="card-title">Category : ${item.strCategory}</h5>
      <h5 class="card-title">Ingredients : </h5>
      <p "card-text">${item.strIngredient1}, ${item.strIngredient2}, 
      ${item.strIngredient3}, ${item.strIngredient4}, ${item.strIngredient5},
      ${item.strIngredient6}, ${item.strIngredient7}, ${item.strIngredient8},
      </p>
      <h5 class="card-title">Preparation Instructions :</h5>
      <p class="card-text">${item.strInstructions}</p>
    </div>
    </div>  
 `
}




