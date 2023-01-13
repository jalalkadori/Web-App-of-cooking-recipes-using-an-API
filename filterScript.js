const mealsByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
var mealsList = [];
var searchArea = document.getElementById('searchArea');

var searchArea = document.getElementById('searchArea')
fetch(mealsByName)
.then((result) => result.json()).then((data) => {
    let arrData = data.meals;
    mealsList = arrData;
    console.log(arrData);
});

function filter() {
    var categoryFilter = document.getElementById("categoryFilter").value;
    var areaFilter = document.getElementById("areaFilter").value;
    console.log("Filter function working");
    var filterHolder = [];
    var categoryListFiltered = mealsList.filter(item  => item.strCategory === categoryFilter);
    var areaListFiltered = mealsList.filter(item  => item.strArea === areaFilter);

    if (categoryListFiltered != "") {
        filterHolder.push(categoryListFiltered);
    } else if(areaListFiltered != "") {
        filterHolder.push(areaListFiltered);
    }
    var item = filterHolder[0];
    let itemFound = "";
    for (let i = 0; i < item.length; i++) {
      itemFound += 
        `<div class="col-10 col-sm-6 col-md-4 col-lg-3">
          <div class="card">
            <img src="${item[i].strMealThumb}" alt="image">
            <div class="card-body">
              <h5 class="card-title">${item[i].strMeal}</h5>
              <p class="card-text">${item[i].strArea}</p>
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" onclick="displayOnModal()"
               data-bs-target="#exampleModal">
               Show More Infos</button>
            </div>
          </div>
        </div>`
    }

    searchArea.innerHTML = itemFound;
    console.log(item)

}