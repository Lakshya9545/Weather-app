import React from 'react'

function apilink() {

const apikey= "2452c4a4e5331a783af6ffdd6a0a6cb7";
const apiURL  = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weather-Icon = document.querySelector(".weather-icon");
async function checkWeather(city){

const response = await fetch(apiURL + city + `&appid=${apikey}`);
if(response.status == 404){
  document.querySelector(".error").computedStyleMap.display = "block";
  document.querySelector(".weather").computedStyleMap.display = "none";
}
else{
  var data  = await response.json();
   document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

if(data.weather[0].main == "Clouds"){
  weatherIcon.src = "../images/cloudy.PNG";
}
else if(data.weather[0].main == "Clear" )

weatherIcon.src = "../images/sunny.PNG";
}
else if(data.weather[0].main == "Rain" )

weatherIcon.src = "../images/rain.PNG";
}
else if(data.weather[0].main == "Drizzle" )

weatherIcon.src = "../images/cloudy.PNG";
}
else if(data.weather[0].main == "Mist" )

weatherIcon.src = "../images/partly cloudy.PNG";
}


document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").computedStyleMap.display = "none";

}

// console.log(data);

 
searchBtn.addEventListener("click",()=>{
  checkWeather(searchBox.value);
});
       </script>

  return (
    <div>
      
    </div>
  )
}

export default apilink


 const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
    const apikey = "2452c4a4e5331a783af6ffdd6a0a6cb7";
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

   async function checkWeather(city) {
    try {
      const response = await fetch(apiURL + city + `&appid=${apikey}`);
      if (response.status === 404) {
        setError("Invalid city name");
        setWeatherData(null);
      } else {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching weather data.");
      setWeatherData(null);
    }
  }

   const getWeatherIcon = (weatherMain) => {
    if (weatherMain === "Clouds") {
      return cloudy;
    } else if (weatherMain === "Clear") {
      return sunny;
    } else if (weatherMain === "Rain") {
      return rainy;
    } else {
      return sunny; // Default icon
    }
  }