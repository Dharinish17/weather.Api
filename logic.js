let search= document.querySelector("#text");
let searchBtn= document.querySelector("#search-logo");
let cityDisplay= document.querySelector("#cityName");
let discription= document.querySelector("#discription");
let date= document.querySelector("#dates");
let time= document.querySelector("#times");
let current_temp= document.querySelector("#current-temp");
let feels_like= document.querySelector("#feels-like");
let min_temp= document.querySelector("#min-temp");
let max_temp= document.querySelector("#max-temp");
let main_cond= document.querySelector("#main-cond");
let discriptions= document.querySelector("#discriptions");
let weather_icon= document.querySelector("#weather-icon");
let logo= document.querySelector("#logo");
let humidity= document.querySelector("#humid");
let pressure= document.querySelector("#pressure");
let sea_press= document.querySelector("#sea-level-pressure");
let grd_press= document.querySelector("#ground-level-pressure");
let speed= document.querySelector("#speed");
let direction= document.querySelector("#direction");
let gust= document.querySelector("#gust");
let sun_rise= document.querySelector("#sun-r");
let sun_set= document.querySelector("#sun-s");
let rainfall= document.querySelector("#rainfall");//rainfall(last 1hr) is not present in the current api ignore it.
let cloud= document.querySelector("#cloud");
let visibility= document.querySelector("#visibility");
let body= document.querySelector("body");


function dateFormat(timestamp){
    const date= new Date(timestamp *1000);
    return date.toLocaleString();
}

function degToCompass(deg) {
  const directions = ["North", "NorthEast", "East", "SouthEast", "South", "SouthWest", "West", "NorthWest"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

async function callBtn(){
    let cityName= search.value;
    search.value= "";
    // console.log(cityName);
    let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a02f4355a2749ecc02de6ed7395a3a20`);
    let result= await response.json();
    if(result.base == "stations"){
        cityDisplay.innerText= `${cityName} ${(result.main.temp-273.15).toFixed(2)}°C`;  
        discription.innerText= `Description: ${result.weather[0].description}`;
        date.innerText= `Date: ${dateFormat(result.dt).split(',')[0]}`;
        time.innerText= `Time: ${dateFormat(result.dt).split(',')[1]}`;
        current_temp.innerText= `Current Temp: ${(result.main.temp-273.15).toFixed(2)}°C`;
        feels_like.innerText= `Feels Like: ${(result.main.feels_like-273.15).toFixed(2)}°C`;
        min_temp.innerText= `Min Temp: ${(result.main.temp_min-273.15).toFixed(2)}°C`;
        max_temp.innerText= `Max Temp: ${(result.main.temp_max-273.15).toFixed(2)}°C`;
        main_cond.innerText= `Main Condition: ${result.weather[0].main}`;
        discriptions.innerText= `Description: ${result.weather[0].description}`;
        let iconCode= result.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weather_icon.src= iconUrl;
        humidity.innerText= `Humidity: ${result.main.humidity}%`;
        pressure.innerText= `Pressure: ${result.main.pressure}hPa`;
        sea_press.innerText= `Sea Level Pressure: ${result.main.sea_level}hPa`;
        grd_press.innerText= `Ground Level Pressure: ${result.main.grnd_level}hPa`;
        speed.innerText= `Speed: ${result.wind.speed}m/s`;
        direction.innerText= `Direction: ${degToCompass(result.wind.deg)}`;
        gust.innerText= `Gust: ${result.wind.gust}m/s`;
        sun_rise.innerText= `Sun Rise: ${dateFormat(result.sys.sunrise).split(',')[1]}`;
        sun_set.innerText= `Sun Set: ${dateFormat(result.sys.sunset).split(',')[1]}`;
        rainfall.innerText= `🌧️Rainfall(last 1hr): ${result.rainfall}`;
        cloud.innerText= `☁️Cloudliness: ${result.clouds.all}%`;
        visibility.innerText= `🔎Visibility: ${result.visibility} meters`;
    }else if(cityName == "banglore"){
        body.innerHTML= `<p>Type "Bengaluru" Instead Of "Banglore". <a href="index.html"> RELOAD THE WEBSITE TO SEARCH AGAIN:)</a></P>`;
        body.style.background= "black";
        body.style.color= "white";
        body.style.display= "flex";
        body.style.justifyContent= "center";
        body.style.alignItems= "center";
        body.style.fontSize= "2rem";
    }else{
        body.innerHTML= `<p>Invalid City Name. <a href="index.html"> RELOAD THE WEBSITE TO SEARCH AGAIN:)</a></P>`;
        body.style.background= "black";
        body.style.color= "white";
        body.style.display= "flex";
        body.style.justifyContent= "center";
        body.style.alignItems= "center";
        body.style.fontSize= "2rem";
    }     
}
searchBtn.addEventListener("click",callBtn);
search.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        callBtn();
    }
});