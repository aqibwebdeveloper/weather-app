const apiKey = "392fc470c1ac8b42b2f40951a9a96cc4&q";
var weather = document.getElementById("main");

var city = document.getElementById("search");

function citySearch() {



  fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}=${city.value}&units=metric`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.temp);
      // console.log(data.name);
      document.getElementById("location-name").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.name}`;
      document.getElementById("location-country-name").innerHTML = data.sys.country;
      document.getElementById("temp").innerHTML = data.main.temp;
      document.getElementById("weather-name").innerHTML = data.weather[0].description;
      document.getElementById("High-Low").innerHTML = `H: ${data.main.temp_min}° &nbsp;&nbsp; L: ${data.main.temp_max}°`
      document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
      document.getElementById("speed").innerHTML = `${data.wind.speed} km/h`;
      document.getElementById("pressure").innerHTML = `${data.main.pressure} hPa`;
      var visibilityOutput = data.visibility / 1000;
      document.getElementById("visibility").innerHTML = `${visibilityOutput} Km`;
      document.getElementById("feels-like").innerHTML = `${data.main.feels_like}°`;

      // today current day, date and time

      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var current_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var todayDayDateTime = new Date();
      var currentYear = todayDayDateTime.getFullYear();
      var currentMonth = months[todayDayDateTime.getMonth()];
      var currentDay = current_days[todayDayDateTime.getDay()];

      // Date show in weather box:

      document.getElementById("day&time").innerText = `${currentDay} ${currentMonth} ${currentYear}`

      console.log(todayDayDateTime);
      console.log(currentYear);
      console.log(currentMonth);
      console.log(currentDay);



      




      console.log(data.weather[0]["description"]);


      document.getElementById("search").value = "";

    })
    .catch(function (error) {
      console.log("Error:", error);
    });


  // ========= forecast API =========
  // forecate time array:
  var forecastTime_IDs = ["forecast-time-1", "forecast-time-2", "forecast-time-3", "forecast-time-4", "forecast-time-5", "forecast-time-6"];

  // forecast temperature array:
  var forecastTemp_IDs = ["forecast-temp-1", "forecast-temp-2", "forecast-temp-3", "forecast-temp-4", "forecast-temp-5", "forecast-temp-6"];

  // forecast day array:
  var forecastDays_IDs = ["forecast-day-1", "forecast-day-2", "forecast-day-3", "forecast-day-4", "forecast-day-5"];

  // forecast description array:
  var forecastDescription_IDs = ["forecast-description-1", "forecast-description-2", "forecast-description-3", "forecast-description-4", "forecast-description-5"];

  // forecast Max aaray:
  var forecastMaxTemp_IDs = ["forecast-max-1", "forecast-max-2", "forecast-max-3", "forecast-max-4", "forecast-max-5"];

  // forecast Min array:
  var forecastMinTemp_IDs = ["forecast-min-1", "forecast-min-2", "forecast-min-3", "forecast-min-4", "forecast-min-5"];

  fetch(`https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}=${city.value}&units=metric`)
    .then(function (hourlyWeather) {
      return hourlyWeather.json();
    })
    .then(function (responseForecast) {
      console.log(responseForecast);

      // console.log(forecastTime_IDs[0]);


      // === Time Loop==

      var listNo = 2;
      for (let i = 0; i < forecastTime_IDs.length; i++) {



        var forcast = responseForecast.list[listNo].dt_txt.slice(11, 16);

        var hour_24 = "24:00";

        if (forcast == "00:00") {
          document.getElementById(forecastTime_IDs[i]).innerHTML = hour_24;
        } else {
          document.getElementById(forecastTime_IDs[i]).innerHTML = forcast;
        }

        listNo++;
      }

      // === Temperature Loop ===

      var listNoForTemp = 2;
      for (let j = 0; j < forecastTemp_IDs.length; j++) {

        var tempForecast = responseForecast.list[listNoForTemp].main.temp;

        document.getElementById(forecastTemp_IDs[j]).innerHTML = `${Math.floor(tempForecast)}°`;

        listNoForTemp++;
      }

      // === Days Forecast Details ===

      // ==== Get Next 5 Days ==== 

      var today = new Date();
      var year = today.getFullYear();
      var month = String(today.getMonth() + 1).padStart(2, "0");
      var date = String(today.getDate()).padStart(2, "0");

      var todayDate = `${year}-${month}-${date}`;

      var days = [];

      for (let i = 0; i < responseForecast.list.length; i++) {

        var forecastDate = responseForecast.list[i].dt_txt.slice(0, 10);

        // Today Skip
        if (forecastDate == todayDate) {
          continue;
        }

        // Date save karo
        if (!days.includes(forecastDate)) {
          days.push(forecastDate);
        }

        // Sirf 5 days
        if (days.length == 5) {
          break;
        }

      }
      console.log(days);


      // ==== Get Weather + High Temperature + Low Temperature ====

      for (let i = 0; i < days.length; i++) {
        // Current day
        var currentDate = days[i];

        // Har day k liye reset

        var highTemp = -Infinity;
        var lowTemp = Infinity;
        var weather = "";

        for (let j = 0; j < responseForecast.list.length; j++) {

          var forecastDate = responseForecast.list[j].dt_txt.slice(0, 10);

          if (forecastDate == currentDate) {


            // Temperature nikalo
            var temp = responseForecast.list[j].main.temp;

            // High temperature
            if (temp > highTemp) {
              highTemp = temp;
            }

            // Low temperature
            if (temp < lowTemp) {
              lowTemp = temp;
            }

            // weather
            weather = responseForecast.list[j].weather[0].description;

          }
        }

        var dataObject = new Date(currentDate + "T00:00:00");

        var dayName = dataObject.toLocaleDateString("en-US", {
          weekday: "short"
        });

        document.getElementById(forecastDays_IDs[i]).innerHTML = dayName;
        document.getElementById(forecastDescription_IDs[i]).innerHTML = weather;
        document.getElementById(forecastMaxTemp_IDs[i]).innerHTML = `${Math.floor(highTemp)}°`;
        document.getElementById(forecastMinTemp_IDs[i]).innerHTML = `${Math.floor(lowTemp)}°`;


        console.log("Date:", currentDate);
        console.log("Day:", dayName);
        console.log("Weather:", weather);
        console.log("High:", highTemp);
        console.log("Low", lowTemp);

      }



    })


}


