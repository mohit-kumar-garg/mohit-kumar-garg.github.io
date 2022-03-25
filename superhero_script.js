// Search Box
var search = document.getElementById('search');

// Container which will contain all the information about superheroes
var container = document.getElementsByClassName('hero_details')[0];

// When user starts typing, we will count the size of string typed. If size is greater than 2, then we will make an ajax call to search the relevent superheroes.
search.addEventListener('keyup', function(event){

	var string = search.value;

	if(string.length > 2){
		showSuggestion(string);
	}else{
		container.innerHTML = '';
	}

});


// This function takes the 'string' as an argument and fetch the details of the characters which contains string.
function showSuggestion(string){

	var apiToken = "101042262567717";	//This is an API Token for superheroesapi
	var url = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/"+ apiToken+"/search/"+string;

	var result=[];

	// Making Ajax Call
	var xhrReq = new XMLHttpRequest();
	xhrReq.onload = function(){
		result = JSON.parse(xhrReq.response);
		result = result.results;

		fillContainer(result);
	};
	xhrReq.open('get', url, true);
	xhrReq.send();

}


// After getting the result from 'showSuggestion' function, it will fill those details in cards and show on the screen.
function fillContainer(result){
	container.innerHTML = '';

	for(var i=0;i<result.length;i++){

		var bool = checkIfFavourite(result[i].id);

		if(bool == true){
			output = "<div class='hero_details_card'><img src='"+ result[i].image.url+"' alt='image'><a href = 'superhero_details.html?id="+ result[i].id+"' target='_blank'>" + result[i].name + "</a><i class='fa-solid fa-star no-favourite favourite'  data-id="+ result[i].id + "></i></div>";
		}else{
			output = "<div class='hero_details_card'><img src='"+ result[i].image.url+"' alt='image'><a href = 'superhero_details.html?id="+ result[i].id+"' target='_blank'>" + result[i].name + "</a><i class='fa-solid fa-star no-favourite'  data-id="+ result[i].id + "></i></div>";
		}		

		container.innerHTML += output; 

	}
}


// This contains the list of superHeros stored in the local storage.
var superheroList = [];


// This function checks if the given id is stored in local storage or not. If yes, it returns true else it returns false.
// If true, the star icon on the card will be visible in red color.
// If false, the star icon on the card will be visible in default(black) color.
function checkIfFavourite(id){
	superheroList = localStorage.getItem('superhero');

	if(superheroList == null || superheroList.length == 0){
		return false;
	}

	if(superheroList.indexOf(id) >=0){
		return true;
	}else{
		return false;
	}
}


// Adding the given id in the local storage.
function setFavourite(id){

	superheroList = localStorage.getItem('superhero');

	if(superheroList == null){
		superheroList = [];
		superheroList[0] = id;

		localStorage.setItem('superhero', superheroList);
	}else{
		superheroList = localStorage.getItem('superhero').split(',');

		superheroList.push(id);

		localStorage.setItem('superhero', superheroList);
	}

}


// Removing the given id from the local storage.
function removeFavourite(id){

	superheroList = localStorage.getItem('superhero').split(',');

	const array = superheroList.filter((val, index, array) => {
		return val != id;
	});

	superheroList = array;

	localStorage.setItem('superhero', superheroList);

}


// An event listener which listens to the 'clicks' on the favourie icon that represents whether the card is marked as favourite or not.
document.addEventListener('click', function(event){

	var element = event.target;

	if(element.classList.contains('favourite') ){
		
		var id = element.getAttribute('data-id');

		removeFavourite(id);
		element.classList.remove('favourite');

	}else if(element.classList.contains('no-favourite')){
		var id = element.getAttribute('data-id');

		setFavourite(id);
		element.classList.add('favourite');
	}

});