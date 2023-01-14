const mealsByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var mealsList = [];
var arrayListHolder = [];
var searchArea = document.getElementById('searchArea');
fetch(mealsByName)
.then((result) => result.json()).then((data) => {
    let arrData = data.meals;
    mealsList = arrData;
});

// function categoryFilter() {
//     var categoryFilter = document.getElementById("categoryFilter").value;
//     var filterHolder = [];
//     var categoryListFiltered = mealsList.filter(item  => item.strCategory === categoryFilter);

//     if (categoryListFiltered != "") {
//         filterHolder.push(categoryListFiltered);
//     }
//     var arrayListHolder = filterHolder[0];
//     let itemFound = "";
//     for (let i = 0; i < arrayListHolder.length; i++) {
//       itemFound += 
//         `<div class="col-10 col-sm-6 col-md-4 col-lg-3">
//           <div class="card">
//             <img src="${arrayListHolder[i].strMealThumb}" alt="image">
//             <div class="card-body">
//               <h5 class="card-title">${arrayListHolder[i].strMeal}</h5>
//               <p class="card-text">${arrayListHolder[i].strArea}</p>
//               <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick="displaySelectedMeal(this)"
//                data-bs-target="#exampleModal">
//                Show More Infos</button>
//             </div>
//           </div>
//         </div>`
//     }
//     searchArea.innerHTML = "";
//     searchArea.innerHTML = itemFound;
//     console.log(arrayListHolder)
// }

function CountryFilter() {
  var areaFilter = document.getElementById("areaFilter").value;
  var areaListFiltered = mealsList.filter(item  => item.strArea === areaFilter);

  searchArea.innerHTML = "";
  
  let itemFound = "";
  for (let i = 0; i < areaListFiltered.length; i++) {
    arrayListHolder = areaListFiltered[i];
    itemFound += 
      `<div class="col-10 col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="${areaListFiltered[i].strMealThumb}" alt="image">
          <div class="card-body">
            <h5 class="card-title">${areaListFiltered[i].strMeal}</h5>
            <p class="card-text">${areaListFiltered[i].strArea}</p>
            <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick="displaySelectedMeal(this, arrayListHolder)"
             data-bs-target="#exampleModal">
             Show More Infos</button>
          </div>
        </div>
      </div>`
  }
  searchArea.innerHTML = itemFound;
  console.log(areaListFiltered)
  console.log(arrayListHolder)
}
function displaySelectedMeal(element, arr) {
  var ModalBody = document.getElementById("ModalBody");
  var childrens = searchArea.children;
  var childClicked = element.parentNode.parentNode.parentNode;
  var selectedChildIndex = Array.from(childrens).findIndex(function(child){ return child === childClicked});
  var selectedChild = arr[selectedChildIndex];
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