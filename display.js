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
const popup = document.getElementById("popup");
const closeButton = document.getElementById("close-popup");

// Function to display the pop-up with the given title and description
function showPopup(title, text, text2, text3) {
  document.getElementById("popup").style.display = "flex";
	document.getElementById("popup-title").innerHTML= title;
	document.getElementById("popup-message").innerHTML = text;
	document.getElementById("popup-message2").innerHTML = text2;
	document.getElementById("popup-message3").innerHTML = text3;

}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}