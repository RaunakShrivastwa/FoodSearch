
const data = localStorage.getItem('details');
console.log(data)
let html = "";

async function fetchAPI(url, value) {
  const response = await fetch(`${url + value}`);
  const meals = await response.json();
  return meals;
}

function showDetailsMeals(id) {
  html = "";
  const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  fetchAPI(url, id).then(data => {
    data.meals.forEach(element => {
      html += `
        <div class="row g-0 mt-5 text-white">
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title text-center">${element.strMeal}(${element.strCategory})</h3>
              <p><h3 class="text-danger">INSTRUCTION</h3>${element.strInstructions}</p>
              <div class="row">
              <div  class="row row-cols-1 row-cols-md-4 g-3 mt-3 p-2 ">
                      <div class="col">
                         <div class="card border-0 shadow text-white">
                             <div class="card-body">
                                 <strong>Catogery:-</strong> ${element.strCategory}
                             </div>
                         </div>
                      </div>

                      <div class="col">
                         <div class="card border-0 text-white shadow">
                             <div class="card-body">
                                 <strong>Meal Area </strong><i class="fa fa-flag text-danger"></i>:-  ${element.strArea}
                             </div>
                         </div>
                      </div>

                      <div class="col">
                         <div class="card border-0 text-white shadow">
                             <div class="card-body">
                                 <strong>Meal Size </strong> :-${element.strMeasure1}
                             </div>
                         </div>
                      </div>

                      <div class="col">
                         <div class="card border-0 text-white shadow">
                             <div class="card-body">
                                  ${element.strIngredient1}
                             </div>
                         </div>
                      </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 p-3">
            <img width="100%"  src="${element.strMealThumb}" class="img-fluid rounded-start" alt="...">
        </div>
       
    </div>
    
    `;
      document.getElementById('mainDiv').innerHTML = html;
    })
  })

}

showDetailsMeals(data)