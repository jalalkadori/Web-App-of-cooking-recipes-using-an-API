const mealsByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const CategoryListUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
const CountryListUrl = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";

var mealsList = [];
var CategoryList = [];
var CountryList = [];
var arrayListHolder;
var searchArea = document.getElementById('searchArea');
fetch(mealsByName)  
.then((result) => result.json()).then((data) => {
    let arrData = data.meals;
    mealsList = arrData;
    console.log(mealsList);
});

// Creation des input select :
fetch(CategoryListUrl)
.then((result) => result.json()).then((data) => {
  CategoryList = data.categories;
});

fetch(CountryListUrl)
.then((result) => result.json()).then((data) => {
  CountryList = data.meals;
});

function ListCreation() {
  var categoryOption = document.getElementById("categoryFilter");
  var countryOption = document.getElementById("areaFilter");
  console.log(CategoryList);
  // category list creation :
  var categoryListHolder = `<option></option>`;
  for(let i = 0; i < CategoryList.length; i++) {
    categoryListHolder += `<option value="${CategoryList[i].strCategory}">${CategoryList[i].strCategory}</option>`;
  }
  categoryOption.innerHTML = categoryListHolder;
  // Area list creation :
  console.log(CountryList);
  var areaListHolder = `<option></option>`;
  for(let i = 0; i < CountryList.length; i++) {
    areaListHolder += `<option value="${CountryList[i].strArea}">${CountryList[i].strArea}</option>`;
  }
  countryOption.innerHTML = areaListHolder;

  var areaOptions = countryOption.options;
  var categoryOptions = categoryOption.options;
  
  getSelectedValue(areaOptions, "Moroccan"); // setting the selected area to Moroccan
  getSelectedValue(categoryOptions, "Lamb"); // setting the selected category to Moroccan
}

function getSelectedValue(options, value) {
  for (var i = 0; i < options.length; i++) {
    if (options[i].value == value) {
      // Set the selected option
      options[i].selected = true;
      break;
    }
  }
}

function Filter() {
    var areaFilter = document.getElementById("areaFilter").value;
    var categoryFilter = document.getElementById("categoryFilter").value;
    // getting an array with all the elements that matches the selected values
    let mealsListFiltered = mealsList.filter((element) => {
      if(areaFilter == "") {
        return element.strCategory === categoryFilter;
      } else if (categoryFilter == "") {
        return element.strArea === areaFilter;
      } else {
        return (element.strCategory === categoryFilter) && (element.strArea === areaFilter);
      }
    });
    if(mealsListFiltered != "") {
      arrayListHolder = mealsListFiltered;
      displayOnCards(mealsListFiltered);
      console.log(mealsListFiltered);
    } else {searchArea.innerHTML =
       `<div class="card text-bg-dark">
          <h5 class="card-title">404</h5>
          <p class="card-text">No results found for ${areaFilter} ${categoryFilter} Meals.</p>
            <img src="./images/404.jpg" class="card-img">
            <div class="card-img-overlay">
            </div>
        </div>`;
      }
}
// Displaying cards from the filtred array : 
function displayOnCards(arr) {
  searchArea.innerHTML = "";
  let itemFound = "";
  for (let i = 0; i < arr.length; i++) {
    itemFound += 
      `<div class="col-10 col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="${arr[i].strMealThumb}" alt="image">
          <div class="card-body">
            <h5 class="card-title">${arr[i].strMeal}</h5>
            <p class="card-text">${arr[i].strArea}</p>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick="displaySelectedMeal(this)"
             data-bs-target="#exampleModal">
             Show More Infos</button>
          </div>
        </div>
      </div>`
  }
  searchArea.innerHTML = itemFound;
}

function displaySelectedMeal(element) {
  var ModalBody = document.getElementById("ModalBody");
  var childrens = searchArea.children; // get an array of all html element inside
  var childClicked = element.parentNode.parentNode.parentNode; // get the parent node of the clicked button
  var selectedChildIndex = Array.from(childrens).findIndex(function(child){ return child === childClicked});
  var selectedChild = arrayListHolder[selectedChildIndex];
  ModalBody.innerHTML = 
    `
    <div class="card">
    <img src="${selectedChild.strMealThumb}" class="card-img-top">
    <div class="card-body">
      <h4 class="card-title">Meal Name : ${selectedChild.strMeal}</h5>
      <h5 class="card-title">Region : ${selectedChild.strArea}</h5>
      <h5 class="card-title">Category : ${selectedChild.strCategory}</h5>
      <h5 class="card-title">Ingredients : </h5>
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