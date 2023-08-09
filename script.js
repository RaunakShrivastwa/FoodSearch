var span = "";

// Cheak Favorite Empty or not
if (localStorage.getItem("favouritesList") == null) {
  localStorage.setItem("favouritesList", JSON.stringify([]));
}

// for the Total Favorite Count
var count = 0;

// for the Favorite Button
if (localStorage.getItem("incr1") == null) {
  localStorage.setItem("incr1", count);
} else {
  const data = document.getElementById('val');
  const temp = localStorage.getItem("incr1");
  data.innerHTML = temp + "+";

}

// Add Favorite Count
function load() {
  const data = document.getElementById('val');
  let temp = localStorage.getItem("incr1");
  temp = ++temp;
  data.innerHTML = temp + "+";
  localStorage.setItem("incr1", temp);
}

// Remove Favorite Count
function dLoad() {
  const data = document.getElementById('val');
  let temp = localStorage.getItem("incr1");
  if (temp !== 0) {
    temp = --temp;
    data.innerHTML = temp + "+";
    localStorage.setItem("incr1", temp);
  }

}

// Remove Meal From Favorite
function addRemoveToFavListFromFavorite(id) {
  let arr = JSON.parse(localStorage.getItem("favouritesList"));
  let contain = false;
  for (let index = 0; index < arr.length; index++) {
    if (id == arr[index]) {
      contain = true;
    }
  }
  // remove Favorite
  if (contain) {
    let number = arr.indexOf(id);
    arr.splice(number, 1);
    dLoad();
    Remove_notification();
  }
  localStorage.setItem("favouritesList", JSON.stringify(arr));

  showFavorite();
}

// Return Meals Accoroding to input Name
async function fetchMealsFromApi(url, value) {
  const response = await fetch(`${url + value}`);
  const meals = await response.json();
  return meals;
}

// Show Meals List after Search
function showMealList() {
  let inputValue = document.getElementById("my-search").value;
  console.log(inputValue)
  let arr = JSON.parse(localStorage.getItem("favouritesList"));
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  let html = "";
  let meals = fetchMealsFromApi(url, inputValue);
  meals.then(data => {
    if (data.meals) {
      data.meals.forEach((element) => {
        let isFav = false;
        for (let index = 0; index < arr.length; index++) {
          if (arr[index] == element.idMeal) {
            isFav = true;
          }
        }
        if (isFav) {
          html += `
                  <div class="col">
                  <div class="card">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <h6 class="card-title">${element.strCategory}</h6>
                 </div>
                       <div class="d-flex justify-content-between mt-3">
                       <a href="#dd">
                       <p><Button onclick="showDetails(${element.idMeal})" class="btn btn-outline-dark">Details</Button></p>
                       </a>                          <p>
                            <img id="main${element.idMeal}" onclick="addRemoveToFavList(${element.idMeal})" title="Click To Remove From Favorite" width="30px" src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png" alt="">
                          </p>
                       </div>
                    </div>
                  </div>
                  
                </div>
              `;
        } else {
          var c = element.strCategory;
          html += `
                  <div class="col">
                  <div class="card">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                       <div class="d-flex justify-content-between">
                          <h5 class="card-title">${element.strMeal}</h5>
                          <h6 class="card-title">${element.strCategory}</h6>
                       </div>
                       <div class="d-flex justify-content-between mt-3">
                          <a href="#dd">
                          <p><Button onclick="showDetails(${element.idMeal})" class="btn btn-outline-dark">Details</Button></p>
                          </a>
                          <p>
                            <img  id="main${element.idMeal}" onclick="addRemoveToFavList(${element.idMeal})" width="30px" src="https://cdn-icons-png.flaticon.com/128/2961/2961957.png" alt="">
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              `;
        }
      });
    } else {
      html += `
          <div class="col " style="margin-auto;width:100%; height:200px">
                  <div class="card d-flex justify-content-around align-items-center">
                    <img src="https://th.bing.com/th/id/OIP.yYBFzWZ0R970KK2bJhwO9AHaEi?w=277&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Not Found</h5>
                      
                    </div>
                  </div>
                </div>
          `;
    }
    document.getElementById("main").innerHTML = html;

    document.getElementById('n-nav1').style = "display:block"
  });


}

// Show Details
function showDetails(id) {
  html = "";
  document.getElementById("d-details").style = "display:block"

  document.getElementById('d-container').style = "display:block !important"
  const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  fetchMealsFromApi(url, id).then(data => {
    data.meals.forEach(element => {
      html += `
      <div class="card mb-3" id="dd" style="max-width:100%;">
      <div class="row g-0">
        <div class="col-md-4">
          <img  src="${element.strMealThumb}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${element.strMeal}</h5>
           
            <p class="card-text"><span class="text-danger" style="font-style:bold">INSTRUCTION:- </span> &nbsp;${element.strInstructions}</p>
             
            <div class="d-flex col-md-12 col-sm-12 justify-content-around align-items-end p-3">
                  <div class="col-md-4">
                      <h6>${element.strCategory}</h6>
                  </div>

                  <div class="col-md-4">
                     <h6> ${element.strArea}</h6>
                  </div>

                  <div class="col-md-4">
                     <h6>${element.strMeasure1}</h6>
                  </div>
            </div>

            <video class="w-100" controls>
                <source src="${element.strYoutube}" type="video/mp4" />
            </video>
          </div>
          
        </div>
      </div>
    </div>
  `;
      document.getElementById("d-details").innerHTML = html;
    })
  })

}

//it adds and remove meals to favourites list
function addRemoveToFavList(id) {
  let arr = JSON.parse(localStorage.getItem("favouritesList"));
  let contain = false;
  for (let index = 0; index < arr.length; index++) {
    if (id == arr[index]) {
      contain = true;
    }
  }
  // remove Favorite
  if (contain) {
    let number = arr.indexOf(id);
    arr.splice(number, 1);
    dLoad();
    Remove_notification();
  }

  else {

    arr.push(id);
    load();
    Add_notification();
  }

  localStorage.setItem("favouritesList", JSON.stringify(arr));
  showMealList();

  // showFavMealList();
}

// Show Add Favorite Notification
function Add_notification() {
  var toast = new bootstrap.Toast(document.getElementById('liveToast'));
  toast.show();
}

// Show Remove Favorite Notification
function Remove_notification() {
  var toast = new bootstrap.Toast(document.getElementById('liveToast1'));
  toast.show();
}

// Show Favorite Meal List
async function showFavorite() {
  console.log("running")
  let arr = JSON.parse(localStorage.getItem("favouritesList"));
  let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  let html = "";
  console.log(arr.length)
  if (arr.length == 0) {
    html += `
    <div class="page-wrap d-flex flex-row align-items-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-1 d-block">404</span>
                    <div class="mb-4 lead">
                        No meal added in your favourites list.
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  } else {
    for (let i = 0; i < arr.length; i++) {
      await fetchMealsFromApi(url, arr[i]).then(data => {
        data.meals.forEach(element => {
          html += `
          <div class="col mt-3">
          <div class="card">
            <img src="${element.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
               <div class="d-flex justify-content-between">
                  <h5 class="card-title">${element.strMeal}</h5>
                  <h6 class="card-title">${element.strCategory}</h6>
               </div>
               <div class="d-flex justify-content-between mt-3">
               <a href="#dd">
               <p><Button onclick="showDetails(${element.idMeal})" class="btn btn-outline-dark">Details</Button></p>
               </a>
                  <p>
                  <img id="main${element.idMeal}" onclick="addRemoveToFavListFromFavorite(${element.idMeal})" title="Click To Remove From Favorite" width="30px" src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png" alt="">
                  </p>
               </div>
            </div>
          </div>
        </div>
          `
        })
      })
    }
  }
  document.getElementById('favorite').innerHTML = html;
}

// Return Meals Accoroding to input Name
async function fetchDataMarbal(url) {
  const response = await fetch(`${url}`);
  const meals = await response.json();
  return meals;
}


