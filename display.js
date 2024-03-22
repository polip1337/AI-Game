function hideElement(element, hide) {
    if (hide) {
        element.classList.add("hidden");
    } else {
        element.classList.remove("hidden");
    }
}
function blockElement(element, block) {
    if (block) {
        element.classList.add("blocked");
    } else {
        element.classList.remove("blocked");
    }
}
function updateCores() {
  const { numFreeCores, gatherCores, collectCores, upgradeCores } = cores;
  document.getElementById("cores").innerHTML = `${numFreeCores}/${cores.numCores}`;

}


// Function to display the pop-up with the given title and description
function showPopup(title, text) {
  document.getElementById("popup").style.display = "flex";
	document.getElementById("popup-title").innerHTML= title;
	document.getElementById("popup-message").innerHTML = text;

}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
function destroyElement(name ) {
  document.getElementById(name).remove();
}
function createAllTasks(){
    for (const key in taskMap) {
        createAndAdd(taskMap[key]);
    }
}