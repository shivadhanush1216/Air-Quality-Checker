
const form = document.querySelector("form");
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const resultContainer = document.getElementById("result");
const aqiResult = document.getElementById("aqi");
const coResult = document.getElementById("co");
const no2Result = document.getElementById("no2");
const o3Result = document.getElementById("o3");
const pm2Result = document.getElementById("pm2");
const pm10Result = document.getElementById("pm10");
const so2Result = document.getElementById("so2");
const closeButton = document.getElementById("close-btn");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const latitude = latitudeInput.value;
  const longitude = longitudeInput.value;

  const url = `https://air-quality.p.rapidapi.com/history/airquality?lon=${longitude}&lat=${latitude}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '2f2d2b3636msh062aaf40476680dp125b4bjsne4936cd9a858',
      'X-RapidAPI-Host': 'air-quality.p.rapidapi.com'
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      let readings = result.data[0];
      console.log(readings);
      aqiResult.innerText = readings.aqi;
      coResult.innerText = readings.co;
      no2Result.innerText = readings.no2;
      o3Result.innerText = readings.o3;
      pm2Result.innerText = readings.pm25;
      pm10Result.innerText = readings.pm10;
      so2Result.innerText = readings.so2;
      resultContainer.style.display = "flex";
      resultContainer.style.color = "red";
      let citName = document.getElementById("cityName");
      citName.innerHTML = `<b>City Name: <b> ${result.city_name}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });

  let datacolor = document.getElementsByClassName("data");
  for (let i = 0; i < datacolor.length; i++) {
    datacolor[i].style.color = "red";
  }

  resultContainer.style.color = "red";
});

// Close Button Event Listener to Reset
closeButton.addEventListener("click", () => {
  resultContainer.style.display = "none";
  latitudeInput.value = "";
  longitudeInput.value = "";
  alert("Please enter new coordinates to check air quality.");
});
