
  	 async function city(){
        let query=null;
        const inputCityValue=document.getElementById('weather-search').value;
          if(inputCityValue==='')
          {
              if(localStorage.getItem("query")!==''){
          query=localStorage.getItem("query"); 
              }else{
                query="Noida";
              }
          }
          else{
             query=inputCityValue;
             localStorage.setItem("query", inputCityValue);
          }
        
        const body={
        query
        }
      const fetchUrl=await fetch(`https://calm-escarpment-66246.herokuapp.com/forecast`,{
         method:'POST',
         headers:{
             'Content-Type':'application/json',
             'Accept':'application/json'
         },
         body:JSON.stringify(body)
     });
         const Response=await fetchUrl.json();
      console.log('response :',Response);
     
      // AQI 

     const lat = Response.location.lat;
     const lon = Response.location.lon;
     const bodyforLatAndLong={
         lat,
         lon
     };
     const getUrl = await fetch(`https://calm-escarpment-66246.herokuapp.com/aqi`,{
         method:'POST',
         headers:{
             'Content-Type':'application/json',
             'Accept':'application/json'
         },
         body:JSON.stringify(bodyforLatAndLong)
     });
     const getResponse = await getUrl.json();
     console.log('response :',getResponse);
     const aqiValue = document.getElementById('aqi-value');
   
     const healthMessage = document.getElementById('healthMessage');
     const aqi = getResponse.list[0].components.pm10;
     const aqi_pm25 = document.getElementById('pm2_5');
     const aqi_pm10 = document.getElementById('pm10');
     const aqi_no2 = document.getElementById('no2');
     const aqi_so2 = document.getElementById('so2');
     const aqi_o3 = document.getElementById('o3');

     aqi_pm25.innerText = Math.floor(getResponse.list[0].components.pm2_5);
     aqi_pm10.innerText = Math.floor(getResponse.list[0].components.pm10);
     aqi_no2.innerText = Math.floor(getResponse.list[0].components.no2);
     aqi_so2.innerText = Math.floor(getResponse.list[0].components.so2);
     aqi_o3.innerText = Math.floor(getResponse.list[0].components.o3);
     aqiValue.innerText = Math.floor(aqi);
     
     if( aqi>=0 && aqi<=50){
         aqiValue.style.color = '#00B050';
         healthMessage.innerText = 'Good';
         
     }
     else if( aqi>50 && aqi<=100 ){
         aqiValue.style.color = '#FFFF00';
         healthMessage.innerText = 'Moderate';
     }
     else if( aqi>100 && aqi<=150 ){
         aqiValue.style.color = '#FF6600';
         healthMessage.innerText = 'Unhealthy for Sensitive Groups';
     }
     else if( aqi>150 && aqi<=200 ){
         aqiValue.style.color = '#FF0000';
         healthMessage.innerText = 'Unhealthy';

     }
     else if( aqi>200 && aqi<=300 ){
         aqiValue.style.color = '#7030A0';
         healthMessage.innerText = 'Very Unhealthy';

     }
     else{
         aqiValue.style.color = '#990033';
         healthMessage.innerText = 'Hazardous';

     }

      const feelslike=document.getElementById('feelslike');
      const humidity=document.getElementById('humidity');
      const temperature=document.getElementById('temperature');
      const pressure=document.getElementById('pressure');
      const uvIndex=document.getElementById('uv-index');
    //   const weatherIcon=document.getElementById('weather-icon');
      const weatherDescription = document.getElementById('weather-description');
      const city=document.getElementById('city');
    //   const cityDetails=document.getElementById('city-details');
    //   const windSpeed=document.getElementById('wind-speed');
    //   const windDirection = document.getElementById('wind-direction');
    //   const windDegree = document.getElementById('wind-degree');
    //   const localTime=Number(Response.location.localtime.slice(11,13));
     const country = document.getElementById('country');
     const region= document.getElementById('region');
      feelslike.innerText=Response.current.feelslike;
      humidity.innerText=Response.current.humidity;
      temperature.innerText =Response.current.temperature;
      pressure.innerText=Response.current.pressure;
      uvIndex.innerText=Response.current.uv_index;
     //  weatherImage.src=Response.current.weather_icons[0];

      weatherDescription.innerText= Response.current.weather_descriptions[0];
      city.innerText=Response.location.name;
      region.innerText =Response.location.region;
      country.innerText=Response.location.country;
      
    //   windSpeed.innerHTML = `${Response.current.wind_speed}`;
    //   windDirection.innerHTML = `${Response.current.wind_dir}`;
    //   windDegree.innerHTML = `${Response.current.wind_degree}`;
           
    //   cityDetails.classList.add("city-details");
    //   city.classList.add("city-header");

    //   weatherIcon.classList.add("fas");
    //   weatherIcon.classList.add("fa-4x");
      const temp=Response.current.temperature;

    //   if(temp<15){
    //       weatherIcon.classList.add("fa-smog");
    //   }else if(temp>15 &&temp<26){
    //       weatherIcon.classList.add("fa-cloud");
    //   }else if(temp>26&&temp<32&&localTime>=6&&localTime<=18){
    //       weatherIcon.classList.add("fa-cloud-sun");
    //   }else if(temp>26&&temp<32&&localTime>=19&&localTime<=5){
    //       weatherIcon.classList.add("fa-cloud-moon");
    //   }else if(temp>32&&temp<38&&localTime>=6&&localTime<=18){
    //       weatherIcon.classList.add("fa-cloud-sun");
    //   }else if(temp>=38&&temp<=50&&localTime>=6&&localTime<=18){
    //       weatherIcon.classList.add("far");
    //      weatherIcon.classList.add("fa-sun");
    //   }else{
    //       weatherIcon.classList.add("far");
    //      weatherIcon.classList.add("fa-moon");
    //   }
     
           //ForeCast:
     let todaysDate=new Date();
     let yesterdayDate = new Date(todaysDate);
     yesterdayDate.setDate(yesterdayDate.getDate() - 1);
     let fullYear=yesterdayDate.getFullYear();
     let month=yesterdayDate.getMonth()+1;
     let date= yesterdayDate.getDate();
     console.log(date)
     if(date<10){
         date=`0${date}`;
     }
     if(month<10){
         month=`0${month}`;
     }
      let currentDate=`${fullYear}-${month}-${date}`;
      console.log(currentDate);
       
     
    //  const minTemp=document.getElementById("min-temp");
    //  const maxTemp=document.getElementById("max-temp");
    //  const avgTemp=document.getElementById("avg-temp");
     const sunSet = document.getElementById('sunset');
     const sunRise = document.getElementById('sunrise');
     const moonSet = document.getElementById('moonset');
     const moonRise = document.getElementById('moonrise');
      

     let forecast=Response.forecast;
     let forecastCurentDate=forecast[currentDate];
     
    //  minTemp.innerHTML=forecastCurentDate.mintemp;
    //  maxTemp.innerHTML=forecastCurentDate.maxtemp;
    //  avgTemp.innerHTML=forecastCurentDate.avgtemp;
     sunRise.innerHTML=forecastCurentDate.astro.sunrise;
     sunSet.innerHTML=forecastCurentDate.astro.sunset;
     moonSet.innerHTML = forecastCurentDate.astro.moonset;
     moonRise.innerHTML = forecastCurentDate.astro.moonrise;
     };
    
//   searchCity=document.getElementById("searchCity");
//   inputCity = document.getElementById("search-input")
//   searchCity.addEventListener("click",city);
//   inputCity.addEventListener("keydown",function(e){
         
//       if(e.keyCode === 13){	
//      e.preventDefault();
//      searchCity.click();
//       }
//   });

//  const navContainer = document.querySelector('.nav-container');
//  const hamburgerButton = document.querySelector('.hamburger');
//  const sideMenu = document.querySelector('.nav-acitve');
//  hamburgerButton.addEventListener('click',()=>{
//      navContainer.classList.toggle('nav-active');
//  });
     const searchForm = document.querySelector('.current-weather__search-form');
     searchForm.addEventListener('submit', e=>{
        e.preventDefault();
        city();
     });
city();

  city().then(()=>{
        const loader = document.querySelector('.loader-wrapper');
        loader.classList.remove('loader-active');
  });