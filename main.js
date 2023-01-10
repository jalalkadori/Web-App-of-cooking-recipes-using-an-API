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
              <a href="#" class="btn btn-danger data-bs-toggle="modal"
               data-bs-target="#exampleModal">Show Ingredient</a>
            </div>
          </div>
        </div>`
    }
    searchArea.innerHTML = displyedItems;
});
// This function is used to select 6 random objects from the data array. 
function getRandomArr(array, randomeItems) {
   let arrCopy = array;
   let randomArr = [];
   for (let i=0; i < randomeItems; i++) {
      let index = Math.floor(Math.random() * arrCopy.length);
      randomArr.push(arrCopy[index]);
      arrCopy.splice(index, 1);
   }
   return randomArr;
}

