
// const lat = 52.2297;
// const lon = 21.0122;
// const apiKey = "Your Key";


// fetch("https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${apiKey}")

// .then(function (response) {
//     response => JSON()
// })
// .then(function (data) {
//     console.log(data);
// })
// .catch(function (error) {
//     console.log("Error:", error);
// })


// const lat = 52.2297;
// const lon = 21.0122;
// const apiKey = "3089c2ddfd9399b2d9e1f8dc0c62e407";

// fetch(`https://api.openweathermap.org/data/2.5/onecall/current?lat=${lat}&lon=${lon}&appid=${apiKey}`)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (error) {
//     console.log("Error:", error);
//   });



const lat = 52.2297;
const lon = 21.0122;
const apiKey = "3089c2ddfd9399b2d9e1f8dc0c62e407";

var weather = document.getElementById("main");


fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.main.temp);
    console.log(data.name);
    console.log(data.coord.lat);
    console.log(data.coord.lon);
    console.log(data.weather[0]["description"]);

    if (data.k) {
      
    }
    

    
    
  })
  .catch(function (error) {
    console.log("Error:", error);
  });