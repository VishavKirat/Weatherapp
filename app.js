const uri = 'https://locationiq.org/v1/search.php?key='
const apiKey = 'a470616b5331f76e1a13'
const weather_api_key = '3de3998dcc89f11e1e9920409c688a4a'

const weather_uri = 'http://api.openweathermap.org/data/2.5/weather?appid='+weather_api_key+'&units=metric'
const forecast_url = 'http://api.openweathermap.org/data/2.5/forecast?appid='+weather_api_key+'&units=metric'


let form = document.getElementById('weather'),
	citySelector = document.getElementById("city"),
	countrySelector = document.getElementById("country"),
	city = null,
	country = null,
	lat=0,
	long=0,
  imageBase='http://openweathermap.org/img/w/';

// Elements Info
let locationElement = document.getElementById("location-info"),
    leftElement = document.getElementById("left"),
    rightElement = document.getElementById("right");
 
form.addEventListener('submit', function (e) {
  e.preventDefault(); 
  city = citySelector.value;
  country = countrySelector.value;
  fetch(`${uri}${apiKey}&format=json&city=${city}&country=${country}`)
  .then((res) => res.json())
  .then((data) => {
    if(typeof(data[0])=='undefined'){
      alert("Location Not Found");
      return;
    }
  	lat = data[0].lat;
  	long = data[0].lon;
    fetch(`${weather_uri}&lat=${lat}&lon=${long}`)
    .then((res) => res.json())
    .then((data)=>{
      setLocationInfo(); 
      let html="<div class='section-inline'>"+
            "<div class='current-temp'>"+
                "<span><img src='"+imageBase+data.weather[0].icon+".png'></span>"+
                "<p>"+data.main.temp+"&deg;C</p>"+
              "</div>"+
          "</div>"+
          "<div class='section-inline'>"+
            "<div class='current-temp'>"+
                "<span>Max</span>"+
                "<p>"+data.main.temp_max+"&deg;C</p>"+
              "</div>"+
          "</div>"+
          "<div class='section-inline'>"+
            "<div class='current-temp'>"+
                "<span>Min</span>"+
                "<p>"+data.main.temp_min+"&deg;C</p>"+
              "</div>"+
          "</div>"+
          "<div class='section-inline'>"+
            "<div class='current-temp'>"+
                "<span>Sunrise</span>"+
                "<p>"+getFormattedTime(data.sys.sunrise)+"</p>"+
              "</div>"+
          "</div>"+
          "<div class='section-inline'>"+
            "<div class='current-temp'>"+
                "<span>Sunset</span>"+
                "<p>"+getFormattedTime(data.sys.sunset)+"</p>"+
              "</div>"+
          "</div>"+
          "<div class='section-inline'>"+
            "<div class='current-temp'>"+
                "<span>Humidity</span>"+
                "<p>"+data.main.humidity+"%</p>"+
              "</div>"+
          "</div>"

      leftElement.innerHTML = html;
    });

    fetch(`${forecast_url}&lat=${lat}&lon=${long}`)
    .then((res) => res.json())
    .then((data) => {
        let list = data.list;
        let prev = 0;
        let html='';
        list.map(function(single){
            let next = new Date(single.dt*1000).getDate();
            if(next!=prev){
                html+="<div class='forecast'>"+
                "<p>Date: <strong>"+getFormattedDate(single.dt)+"</strong></p>"+
                "<p class='mt0'><img src='"+imageBase+single.weather[0].icon+".png'></p>"+
                "<p class='mt0'><strong>"+single.weather[0].main+"</strong></p>"+
                "<span class='big'>"+single.main.temp+"&deg;C</span>"+
                "</div>";
            }
            prev = next;
        });
        rightElement.innerHTML = html;
    });
  })  
}, false);


function setLocationInfo(){
  locationElement.innerHTML="<h4>Showing Temperature for "+city+", "+country+"</h4>";
}

function getFormattedTime(timestamp){
  let dt = new Date(timestamp*1000);
  return dt.getHours()+":"+dt.getMinutes();
}

function getFormattedDate(timestamp){
  let dt = new Date(timestamp*1000);
  let dd = dt.getDate(); //Getting Date
  let mm = dt.getMonth()+1; //+1 Because Jan Starts From 0
  let yyyy = dt.getFullYear(); //Full Year eg 2017
  //For Adding a Leading 0
  if(dd<10){
      dd='0'+dd;
  } 
  if(mm<10){
      mm='0'+mm;
  } 
  return  dd+'-'+mm+'-'+yyyy;
}