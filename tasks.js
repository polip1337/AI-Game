function createElement(tag, props) {
	var element = document.createElement(tag);
	for (var prop in props) {
		element[prop] = props[prop];
	}
	return element;
}
var taskMap;
// Load the JSON file and create HTML elements
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
		var data = JSON.parse(xhr.responseText);
		var container = document.getElementById("container");
		data.forEach(function(item) {
			createAndAdd(item);
		});
		taskMap = mapTasksById(data);
	}
};
xhr.open("GET", "data.json", true);
xhr.send();
var eventMap;
// Load the JSON file and create HTML elements
xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
		var data = JSON.parse(xhr.responseText);
		taskMap = mapTasksById(data);
	}
};
xhr.open("GET", "data.json", true);
xhr.send();
function mapTasksById(tasks) {
  return tasks.reduce((map, task) => {
    map[task.id] = task;
    return map;
  }, {});
}

function createAndAdd(data ){
// Create task element
const taskElement = document.createElement("div");
taskElement.classList.add("task");
taskElement.setAttribute("id", data.id);
taskElement.setAttribute("single", data.single);
hideElement(taskElement,data.hidden);

// Create icon element
const iconElement = document.createElement("div");
iconElement.classList.add("task-icon");

const iconImgElement = document.createElement("img");
iconImgElement.setAttribute("src", "icons/" + data.skill + ".png");
iconImgElement.setAttribute("alt", "Task Icon");

iconElement.appendChild(iconImgElement);

// Create details element
const detailsElement = document.createElement("div");
detailsElement.classList.add("task-details");

// Create name element
const nameElement = document.createElement("div");
nameElement.classList.add("task-name");
nameElement.textContent = data.name;

detailsElement.appendChild(nameElement);

// Create progress element
const progressElement = document.createElement("div");
progressElement.classList.add("task-progress");

const progressBarElement = document.createElement("div");
progressBarElement.classList.add("task-progress-bar");
progressBarElement.setAttribute("id", data.id+"Progress");
progressBarElement.style.width = "0%";

const progressValueElement = document.createElement("div");
progressValueElement.classList.add("task-progress-value");
progressValueElement.setAttribute("id", data.id+"ProgressValue");


progressElement.appendChild(progressBarElement);
progressElement.appendChild(progressValueElement);

detailsElement.appendChild(progressElement);

// Create controls element
const controlsElement = document.createElement("div");
controlsElement.classList.add("task-controls");

const decreaseButtonElement = document.createElement("button");
decreaseButtonElement.classList.add("task-control-button", "task-control-decrease");
decreaseButtonElement.setAttribute("onClick", `unAssignCore('${data.id}', -1)`);
decreaseButtonElement.textContent = "-";

const valueElement = document.createElement("div");
valueElement.classList.add("task-control-value");
valueElement.setAttribute("id", data.id+"Cores");
valueElement.textContent = data.value;

const increaseButtonElement = document.createElement("button");
increaseButtonElement.classList.add("task-control-button", "task-control-increase");
increaseButtonElement.setAttribute("onClick", `assignCore('${data.id}', 1)`);

increaseButtonElement.textContent = "+";

controlsElement.appendChild(decreaseButtonElement);
controlsElement.appendChild(valueElement);
controlsElement.appendChild(increaseButtonElement);

detailsElement.appendChild(controlsElement);

// Add icon and details elements to task element
taskElement.appendChild(iconElement);
taskElement.appendChild(detailsElement);

// Append task element to a parent element on the page
const parentElement = document.getElementById("container");
parentElement.appendChild(taskElement);
}

function unlockElements(ids) {
  // Split the input string into an array of IDs
  const idArray = ids.split(",");

  // Loop through the array and change the display of each element
  idArray.forEach((id) => {
    const element = document.getElementById(id.trim());
    if (element) {
		hideElement (element,false);
    }
  });
}
