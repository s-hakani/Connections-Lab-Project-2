let pageNumber = -1;
let prayersArray;

//window.addEventListener('load', function() {
	//Open and connect socket
let socket = io();
//Listen for confirmation of connection
socket.on('connect', function () {
console.log("The socket is connected!!");
});

/* --- Code to RECEIVE a socket message from the server --- */
let chatBox = document.getElementById('chat-box-msgs');

//Listen for messages named 'msg' from the server
socket.on('msg', function (data) {
	console.log("Message arrived!");
	console.log(data);

	//Create a message string and page element
	let receivedMsg = data.name + ": " + data.msg;
	let msgEl = document.createElement('p');
	msgEl.innerHTML = receivedMsg;

	//Add the element with the message to the page
	chatBox.appendChild(msgEl);
	//Add a bit of auto scroll for the chat box
	chatBox.scrollTop = chatBox.scrollHeight;
});
//})

/* --- Code to SEND a socket message to the Server --- */
let nameInput = document.getElementById('name-input')
let msgInput = document.getElementById('msg-input');
let sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', function () {
	let curName = nameInput.value;
	let curMsg = msgInput.value;
	let msgObj = { "name": curName, "msg": curMsg };

	//Send the message object to the server
	socket.emit('msg', msgObj);
	
	//Checking that the msgObj is what I want it to be 
	//console.log(msgObj);

	//Clear the input boxes after the message sends 
	nameInput.value = "";
	msgInput.value = "";
});

// **** CHALLENGE / TO DO: SHOW WHEN SOMEONE IS TYPING by using INPUTS instead of
msgInput.addEventListener('change', () => {
	socket.emit('typing')
	console.log("Someone is typing");
})


//Select for all of the buttons
let navButtons = document.getElementsByClassName('nav-button');
console.log(navButtons);

//Access the prayers json file that I created

let button = document.getElementById("prayer-button");
let reloader = document.getElementById("title");

// I want my explainer text to disappear after the home screen
let explainerText = document.getElementById("explainer");

// reload page when I click on title 
reloader.addEventListener("click", function () {
	reloader = location.reload();
})

button.addEventListener("click", function () {
	let inputText = document.getElementById("prayer-input").value;
	//Checking if the button works
	console.log('button was clicked');

	//Capturing the prayer that is inputted
	console.log("The prayer available is: " + inputText);

	fetch('prayers.json')
		.then(function (response) {
			return response.json();
		})

		.then(function (data) {
			//Check if its working
			console.log(data.prayers);
			let prayerArray = data.prayers;
			let randomNum = Math.floor(Math.random() * prayerArray.length);

			// Check if its working
			console.log(prayerArray.length);

			let prayerElement = document.getElementById("prayer-text");
			prayerElement.innerHTML = data.prayers[randomNum].prayer;
		})
})


//Attach an event listener to all of the buttons
for (let i = 0; i < navButtons.length; i++) {
	navButtons[i].addEventListener('click', function (evt) {

		// Loop through all of the buttons 
		// Set the background to all buttons to white which is what they are right now
		// And then navButton to black only 

		explainerText.style.display = "none";
		pageNumber = i;

		clear();

		if (pageNumber == 0) {
			// clear();
			c1 = color(255);
			c2 = color(60, 40, 90);

			for (let y = 0; y < height; y++) {
				n = map(y, 0, height, 0, 1);
				newc = lerpColor(c1, c2, n);
				stroke(newc);
				line(0, y, width, y);
			}
		}

		if (pageNumber == 1) {
			// clear();
			c1 = color(255);
			c2 = color(30, 40, 90);

			for (let y = 0; y < height; y++) {
				n = map(y, 0, height, 0, 1);
				newc = lerpColor(c1, c2, n);
				stroke(newc);
				line(0, y, width, y);
			}
		}

        if (pageNumber == 2) {
			// removing this from the rest of the code that is in the draw loop so that the background doesn't continuously draw over the prayers
			background("lavender");
		}


		if (pageNumber == 3) {
			background("lavender");
		}

		// ADD THIS: with the -1, the default is there is some content there. Needs to be set seperately 

		for (let j = 0; j < navButtons.length; j++) {
			navButtons[j].style.backgroundColor = "white";
			navButtons[j].style = "teal";
		}

		// **** TO-DO I want the text color to remain white when the button is black. 
		navButtons[i].style.backgroundColor = "black";

		// Hide all of the content
		let allContent = document.getElementsByClassName('content');

		for (let k = 0; k < allContent.length; k++) {
			allContent[k].style.display = "none";
		}

		//Create the specific content ID
		let contentID = "content-" + evt.target.id;

		//Show the specific content
		let contentToShow = document.getElementById(contentID);
		contentToShow.style.display = "block";

		// The below code was used to hide my initial p5 sketch when any of the buttons were clicked. Now that I have a diff sketch for each button, this will be different. 
		// let backgroundSketch = document.getElementById("canvas-container");
		// backgroundSketch.style.display = "none";
	});
}
