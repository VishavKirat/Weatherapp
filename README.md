


etch(`${uri}${apiKey}&format=json&city=${city}&country=${country}`)
This will fetch location details

.then((res) => res.json())
Convert the response to json

if(typeof(data[0])=='undefined'){
  alert("Location Not Found");
  return;
}
If invalid location is entered


setLocationInfo(); 
//This will set the location info in the string e.g if you searched for Phagwara, India then it sets the string to showing temperature for Phagwara, India

getFormattedTime();
//We are passing UNIX Timestamp to getFormattedTime FUnction and getting the time

leftElement.innerHTML = html;
//This will append generated HTML to leftElement

fetch(`${forecast_url}&lat=${lat}&lon=${long}`)
//Fetching forecast details (next 5 days)

var list = data.list;
//Our data is in list key so we are using data.list

list.map(function(single)
//As list contains number of  records so we are accessing one by one using list.map (Here list is an array)


