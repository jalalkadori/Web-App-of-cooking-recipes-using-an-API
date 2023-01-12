 const mealsByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
fetch(mealsByName)
.then((result) => result.json()).then((data) => {
    let searchArea = document.getElementById('searchArea');
    let arrData = data.meals;
    let randomArr = getRandomArr(arrData, 8);
    console.log(randomArr);
    let displyedItems = "";
    for (let i=0; i < randomArr.length; i++) {
        displyedItems += 
        `<div class="col-10 col-sm-6 col-md-4 col-lg-3">
          <div class="card">
            <img src="${randomArr[i].strMealThumb}" alt="image">
            <div class="card-body">
              <h5 class="card-title">${randomArr[i].strMeal}</h5>
              <p class="card-text">${randomArr[i].strArea}</p>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal"
               data-bs-target="#exampleModal" onclick="getChildIndex(this)">
               Show Ingredients</button>
            </div>
          </div>
        </div>`
    }
    searchArea.innerHTML = displyedItems;

});
// This function is used to select 8 random objects from the data array. 
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

function getChildIndex(x) {
  var searchArea = document.getElementById("searchArea");
  var ModalBody = document.getElementById("searchArea");
  var childrens = searchArea.children;
  var selectedChild = x.parentNode.parentNode.parentNode;
  var i = Array.from(childrens).findIndex(function(child){ return child === selectedChild});
  
}

function DisplayOnModal() {
  var modalTitle = document.getElementById('ModalLabel');
  var ModalBody = document.getElementById('ModalBody');
  
}


