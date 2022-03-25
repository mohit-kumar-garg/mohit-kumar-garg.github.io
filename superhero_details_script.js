// Getting the 'id' attribute from the URL of the page
var url=  location.href;
var param = url.split('?')[1];
var id = param.split('=')[1];


var apiToken = "101042262567717";	//This is an API Token for superheroesapi
var url = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/"+ apiToken+"/"+id;

// This will store the result we will get after making the ajax call.
var result=[];

// The container element where we will store the information
var info = document.getElementsByClassName('superhero_info')[0];


// Making Ajax Call
var xhrReq = new XMLHttpRequest();
xhrReq.onload = function(){
	result = JSON.parse(xhrReq.response);

	fillContainer(result);
};
xhrReq.open('get', url, true);
xhrReq.send();


// Filling the values in the container
function fillContainer(result){
	info.innerHTML = '';

	output = "<img src='" + result.image.url + "'><div><h1>" + result.name + "</h1><h2>PowerStats</h2><p>Intelligence: " + result.powerstats.intelligence + "</p><p>Strength: " + result.powerstats.strength + "</p><p>Speed: " + result.powerstats.speed + "</p><p>Durability: " + result.powerstats.durability + "</p><p>Power: " +  result.powerstats.power + "</p><p>Combat: " + result.powerstats.combat + "</p><h2>Biography</h2><p>Full Name: " + result.biography['full-name'] + "</p><p>Alter-Egos: " + result.biography['alter-egos'] + "</p><p>Place-of-birth: " + result.biography['place-of-birth'] + "</p><p>Alignment: " + result.biography.alignment + "</p></div>";

	info.innerHTML = output;

}