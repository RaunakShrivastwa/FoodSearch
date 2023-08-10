var span = "";

// Cheak Favorite Empty or not
if (localStorage.getItem("favouritesList") == null) {
  localStorage.setItem("favouritesList", JSON.stringify([]));
}

if (localStorage.getItem("details") == null) {
  localStorage.setItem("details", JSON.stringify([]));
}


// for the Total Favorite Favorite_item_Count
var Favorite_item_count = 0;

// for the Favorite Button
if (localStorage.getItem("incr1") == null) {
  localStorage.setItem("incr1", Favorite_item_count);
} else {
  const data = document.getElementById('val');
  const temp = localStorage.getItem("incr1");
  data.innerHTML = temp + "+";

}

// Add Favorite Favorite_item_Count
function load() {
  const data = document.getElementById('val');
  let temp = localStorage.getItem("incr1");
  temp = ++temp;
  data.innerHTML = temp + "+";
  localStorage.setItem("incr1", temp);
}

// Remove Favorite Favorite_item_Count
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
            <img src="${element.strMealThumb}" class="card-img-top" alt="..."  onclick="sendDetails1(${element.idMeal})" style="cursor:pointer;"
            title="Click to See more Information">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">${element.strMeal}</h5>
                <h6 class="card-title">${element.strCategory}</h6>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <p><Button onclick="sendDetails1(${element.idMeal})" class="btn btn-outline-dark">Details</Button></p>
                <img style="cursor:pointer" id="main${element.idMeal}" onclick="addRemoveToFavList(${element.idMeal})"
                  title="Click To Remove From Favorite" width="30px" height="40px"
                  src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png" alt="">
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
            <img src="${element.strMealThumb}" class="card-img-top" alt="..." onclick="sendDetails1(${element.idMeal})"
              style="cursor:pointer;" title="Click to See more Information">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">${element.strMeal}</h5>
                <h6 class="card-title">${element.strCategory}</h6>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <p><Button onclick="sendDetails1(${element.idMeal})" class="btn btn-outline-dark">Details</Button></p>
                <img style="cursor:pointer" id="main${element.idMeal}" onclick="addRemoveToFavList(${element.idMeal})"
                  title="Click to add Your Favorite" width="30px" height="30px"
                  src="https://cdn-icons-png.flaticon.com/128/2961/2961957.png" alt="">
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

// Show Favorite 
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
            <img onclick="sendDetails1(${element.idMeal})" style="cursor:pointer;" title="Click to see more Information" src="${element.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
               <div class="d-flex justify-content-between">
                  <h5 class="card-title">${element.strMeal}</h5>
                  <h6 class="card-title">${element.strCategory}</h6>
               </div>
               <div class="d-flex justify-content-between mt-3">
               <a href="#dd">
               <p><Button onclick="sendDetails1(${element.idMeal})" class="btn btn-outline-dark">Details</Button></p>
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

// for the Details of Meals
function sendDetails1(id) {
  localStorage.removeItem("details");
  localStorage.setItem("details", id)
  window.location.href = "../Details/details.html"
}




