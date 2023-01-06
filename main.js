let searchArea = document.getElementById('searchArea');
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=").then((result) => result.json()).then((data) => {
    console.log(data.meals[0]);
    let dataArr = data.meals[0];
    searchArea.innerHTML = dataArr;
});