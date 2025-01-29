//www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
let theInput = document.querySelector(".search-input");
let btn = document.querySelector(".search-btn");
let resultArea = document.querySelector(".result-area");
let recipeDetails = document.querySelector(".recipe-details");

// btn.addEventListener("click", getRecipes);
btn.addEventListener("click", getRecipes);
resultArea.addEventListener("click", getRecipesDetails);
recipeDetails.addEventListener("click", closeDetails);
function getRecipes() {
  let searchTerm = theInput.value.trim();
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`;
  fetch(apiUrl)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      displayRecipes(data);
    });
}
function displayRecipes(recipes) {
  resultArea.innerHTML = "";

  // Check if 'recipes' exists AND if 'meals' is an array AND it's not empty.
  if (recipes && Array.isArray(recipes.meals) && recipes.meals.length > 0) {
    recipes.meals.forEach((recipe) => {
      resultArea.innerHTML += `
                        <div class="card">
                          <div class="card-img">
                            <img src="${recipe.strMealThumb}" alt="" />
                          </div>
                          <div class="card-info">
                            <h2>${recipe.strMeal}</h2>
                            <a href="#" class="recipe-btn" data-id="${recipe.idMeal}">Get Recipe</a>
                          </div>
                        </div>`;
    });
  } else {
    // Handle the case where there are no results or the data is invalid.
    resultArea.innerHTML = `<h2>No Results Found</h2>`;
  }
}
function getRecipesDetails(e) {
  if (e.target.classList.contains("recipe-btn")) {
    let id = e.target.dataset.id;
    let apiUrls = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(apiUrls)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        displayRecipesDetails(data);
      });
  }
}
function displayRecipesDetails(recipeItem) {
  let item = recipeItem.meals[0];
  console.log(item);
  recipeDetails.classList.remove("showDetails");
  console.log(recipeDetails);
  recipeDetails.innerHTML = `
   <i class="fa-solid fa-x close"></i>
        <h2>${item.idMeal}</h2>
        <p>Instructions:</p>
        <p>${item.strInstructions}</p>
        <a href="${item.strYoutube}" target="_blank">Watch Video</a>`;
}
function closeDetails(e) {
  if (e.target.classList.contains("close")) {
    recipeDetails.classList.add("showDetails");
  }
}
