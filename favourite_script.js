// Getting the id's from the favourite list and converting it to array.
var str = localStorage.getItem('superhero');

if(str == 'null' || str == 'undefined' || str.length == 0){

}else{

	var arr = str.split(',');

	var apiToken = "101042262567717";	//This is an API Token for superheroesapi


	// The container element where we will store the information
	var container = document.getElementsByClassName('hero_details')[0];
	container.innerHTML = '';


	// Running a loop for every id stored in the arr and displaying it to the screen.
	for(let i=0;i<arr.length;i++){

		let url = "https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/"+ apiToken+"/"+arr[i];

		// Making Ajax Call
		let xhrReq = new XMLHttpRequest();
		xhrReq.onload = function(){
			let result = JSON.parse(xhrReq.response);

			fillContainer(result);
		};
		xhrReq.open('get', url, true);
		xhrReq.send();

	}
}



// Filling the values in the container
function fillContainer(result){

	output = "<div class='hero_details_card'><img src='"+ result.image.url+"' alt='image'><a href = 'superhero_details.html?id="+ result.id+"' target='_blank'>" + result.name + "</a><i class='fa-solid fa-star favourite'  data-id="+ result.id + "></i></div>";

	container.innerHTML += output; 

}




// When someone clicks on the Favourite Icon, then it should be deleted from the local storage's favourite list.
document.addEventListener('click', function(event){

	var element=  event.target;
	if(element.classList.contains('favourite')){
			
		let id = element.getAttribute('data-id');

		removeFavourite(id);

	}
});



// This function removes the specific id from the local storage
function removeFavourite(id){

	const array = arr.filter((val, index, array) => {
		return val != id;
	});

	arr = array;

	localStorage.setItem('superhero', arr);
	location.reload();

}