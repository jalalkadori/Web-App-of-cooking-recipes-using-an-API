const mealsByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
fetch(mealsByName)
.then((result) => result.json()).then((data) => {
    let searchArea = document.getElementById('searchArea');
    let arrData = data.meals;
    let randomObjects = getRandomElements(arrData, 8);

    console.log(randomObjects);

    let displyedItems = "";
    for (let i=0; i < randomObjects.length; i++) {
        displyedItems += 
        `<div class="col-10 col-sm-6 col-md-4 col-lg-3">
          <div class="card">
            <img src="${randomObjects[i].strMealThumb}" alt="image">
            <div class="card-body">
              <h5 class="card-title">${randomObjects[i].strMeal}</h5>
              <p class="card-text">${randomObjects[i].strArea}</p>
              <a href="#" class="btn btn-danger">Show Ingredient</a>
            </div>
          </div>
        </div>`
    }
    searchArea.innerHTML = displyedItems;
});
//   This will make a GET request to the JSON file, get the data in JSON format, and then use the getRandomElements function to select 6 random objects from the data array. 
function getRandomElements(array, randomeItems) {
   let arrCopy = array;
   let randomArr = [];
   for (let i=0; i < randomeItems; i++) {
      let index = Math.floor(Math.random() * arrCopy.length);
      randomArr.push(arrCopy[index]);
      arrCopy.splice(index, 1);
   }
   return randomArr;
   console.log(randomArr)
}

