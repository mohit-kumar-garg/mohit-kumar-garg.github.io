// This audio will be used when there is an alarm ringing
var audio = new Audio('alarm.mp3');


// Contains the name of the Month in the short-hand form which will be used to show month on the screen
var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];


// Element which contains the complete structure of time on the screen
var clock = document.getElementById('time');


// Changing the date on the screen every 1 sec
setInterval(setDate, 1000);


// This Array contains the list of all the Alarms that has been created.
var alarmList = [];


// This function sets the time in the format: 	hh:mm:ss AM/PM 
// 												Month dd, yyyy
function setDate(){

	// Getting the date and time using Date() function and adding it to the screen
	var time = new Date();

	var year = time.getFullYear();
	var month = monthName[time.getMonth()];
	var date = time.getDate();


	var hour = time.getHours();
	var str = 'AM';
	// Showing hour in 12 hr format
	if(hour > 12){
		str = 'PM';
		hour = hour-12;
	}
	// Making sure the hour is visible in hh format(for example, 09 instead of 9)
	if(hour < 10){
		hour = "0"+hour;
	}

	var minute=  time.getMinutes();
	// Making sure the minute is visible in mm format(for example, 09 instead of 9)
	if(minute < 10){
		minute = "0"+minute;
	}

	var second = time.getSeconds();

	var output = '<p>' + hour + ':' + minute + ':' + second + ' ' + str + '</p><p>' + month + ' ' + date + ',' +  year + '</p>';

	clock.innerHTML = output;


	// Checking if any of the alarm stored has the value equal to the current time or not
	var currentTime;
	if(str == 'PM'){
		currentTime = (parseInt(hour)+12) +':'+minute;
	}else{
		currentTime = hour +':'+minute;
	}

	checkIfAlarm(currentTime);

}


// Checking if any of the alarm stored has the value equal to the currentTime or not. If any of the alarm stored has value equal to the currentTime, then we will show an alert on the screen, play an alarm sound and then delete that alarm from the list. After that we will show that updated list on the screen.
function checkIfAlarm(currentTime){

	for(var i=0;i<alarmList.length;i++){

		if(alarmList[i] == currentTime){

			audio.play();

			alert("The Alarm is Ringing! Its time..");

			audio.pause();

			deleteAlarm(currentTime);
			showAlarms();
		}

	}

}


//Display all the alarms stored in the alarmList on the screen
function showAlarms(){

	var list=  document.getElementById('list');

	list.innerHTML = '';

	for(var i=0;i<alarmList.length;i++){

		var val = alarmList[i];
		var hour = alarmList[i].split(':')[0];
		var minute = alarmList[i].split(':')[1];

		var am_pm=  'AM';
		if(hour > 12){
			hour = hour-12;
			am_pm = 'PM';
		}

		output = "<p class='list-item'><span>"+ hour + ":" + minute + " " + am_pm +"</span><i class='fa-solid fa-trash-can delete-alarm' data-val = " + val + " ></i></p>";

		list.innerHTML += output;

	}

}


//Setting the Alarm in the Alarm list(array)
function setAlarm(){

	var list=  document.getElementById('list');
	var str = document.getElementById('datetime');

	var value = str.value;

	if(value == ''){
		alert("Kindly enter the time to create an Alarm!");
		return;
	}

	alarmList.push(value);

	showAlarms();

	str.value = '';
}


//Deleting the Alarm from the Alarm-list
function deleteAlarm(data_value){

	const array = alarmList.filter((value, index,array) => {
		return (value != data_value);
	});
	
	alarmList = array;

}


// Checking if the element clicked is a delete button or not. If yes, then we will take the data-val from that element and delete that element from the alarmList
// Also checking if the element clicked is the theme icon or not. If yes, then we will switch between light and dark theme.
document.addEventListener('click', function(event){

	var element = event.target;

	if(element.className.includes('delete-alarm')){

		var data_value = element.getAttribute('data-val');

		deleteAlarm(data_value);

		showAlarms();

	}else if(element == document.getElementsByClassName('icon')[0] ){
		changeTheme();
	}

});


// Changing the theme to dark or white when the user clicks the button
function changeTheme(){

	var body = document.getElementsByTagName('body')[0];

	var theme = document.getElementsByClassName('theme')[0];
	var icon = document.getElementsByClassName('icon')[0];

	var clock = document.getElementById('clock');

	var listItem = document.getElementsByClassName('list-item');

	if(body.style.color == '' || body.style.backgroundColor =='white'){
		
		body.style.color = 'white';
		body.style.backgroundColor = 'black';

		icon.classList.remove('fa-moon');
		icon.classList.add('fa-sun');

		theme.classList.add('theme-dark');
		clock.classList.add('clock-dark');

		for(var i=0;i<listItem.length;i++){
			listItem[i].classList.add('list-item-dark');	
		}

	}else{

		body.style.color = 'black';
		body.style.backgroundColor = 'white';

		icon.classList.remove('fa-sun');
		icon.classList.add('fa-moon');

		theme.classList.remove('theme-dark');
		clock.classList.remove('clock-dark');
	
		for(var i=0;i<listItem.length;i++){
			listItem[i].classList.remove('list-item-dark');	
		}

	}
}