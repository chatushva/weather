 const weatherform=document.querySelector(".container");
 const input=document.querySelector(".input");
 const box=document.querySelector(".box");
 const apikey="89c195ded0236ee4acaba4554417345d";
 weatherform.addEventListener("submit", async event=>
 {
      event.preventDefault();
      const city=input.value;
      if(city)
      {
        try{
            const weatherdata= await getWeatherData(city);
            displayWeatherinfo( weatherdata);
        }
        catch(error)
        {
            console.log(error);
            displayError(error);
        }
      }
      else{
        displayError("please enter correct city");
      }
 }
);
 async function getWeatherData(city)
{
   const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
   const response =await fetch(apiurl);
   console.log(response);
   if(!response.ok)
  {
     throw new Error("could not fetch weather data")
   }
   return await response.json();

}
function displayWeatherinfo(Data)
{
    const {name:city,main:{temp,humidity},weather:[{description,id}]}=Data;
    box.textContent="";
    box.style.display="flex";
    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const skyDisplay=document.createElement("p");
    const emojiDisplay=document.createElement("p");
    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°c`;  
    humidityDisplay.textContent=`humidity:${humidity}%`;
    skyDisplay.textContent=description;
    emojiDisplay.textContent=diaplayemoji(id);

    cityDisplay.classList.add("city");
    tempDisplay.classList.add("deg");
    humidityDisplay.classList.add("humidity");
    skyDisplay.classList.add("sky");
    emojiDisplay.classList.add("weatheremoji");
    
    box.appendChild(cityDisplay);  
    box.appendChild(tempDisplay);
    box.appendChild(humidityDisplay);
    box.appendChild(skyDisplay);
    box.appendChild(emojiDisplay);

}
function diaplayemoji(weatherId)
{
   switch(true)
   {
    case(weatherId>=200 && weatherId<300):
       return "⛈️";
    case(weatherId>=300 && weatherId<400):
       return "🌧️";
    case(weatherId>=500 && weatherId<600):
       return "🌧️";
    case(weatherId>=600 && weatherId<700):
       return "❄️";
    case(weatherId>=700 && weatherId<800):
       return "🌫️";
    case(weatherId==800):
       return "☀️";
    case(weatherId>=801 && weatherId<=810):
       return "☁️";
    default:
       return "";
   }
}
function displayError(message)
{
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");
    box.textContent =" ";
    box.style.display="flex";
    box.appendChild(errorDisplay);

}