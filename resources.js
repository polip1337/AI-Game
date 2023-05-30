
function createFlowResourceElement(label, maxValue) {
    container = document.getElementById('right-toolbar');
    const resourceDiv = document.createElement('div');
    resourceDiv.classList.add('resource-right');

    const labelDiv = document.createElement('div');
    labelDiv.textContent = label + ": ";
    resourceDiv.appendChild(labelDiv);

    const progressBarDiv = document.createElement('div');
    progressBarDiv.classList.add('resource-progress-bar');
    resourceDiv.appendChild(progressBarDiv);

    const progressDiv = document.createElement('div');
    progressDiv.classList.add('resource-progress');
	progressDiv.setAttribute("id", label + "Resource");
	progressDiv.innerHTML = "0.0/"+maxValue;

    progressDiv.style.width = `0%`;
	
    progressBarDiv.appendChild(progressDiv);
	container.appendChild(resourceDiv);
}
createFlowResourceElement("Trust","10.0");

function createResourceElement(name, value) {
  container = document.getElementById('toolbar-left');
  
  const resourceElem = document.createElement('div');
  resourceElem.classList.add('resource');
  
  const nameElem = document.createElement('div');
  nameElem.textContent = `${name}: `;
  
  const valueElem = document.createElement('div');
  valueElem.classList.add('resource-value');
  
  const valueSpan = document.createElement('span');
  valueSpan.id = name;
  valueSpan.textContent = value;
  
  valueElem.appendChild(valueSpan);
  resourceElem.appendChild(nameElem);
  resourceElem.appendChild(valueElem);
  
  container.appendChild(resourceElem);
}
resourcesMain.forEach(resource => {
    createResourceElement(resource.name, resource.value);
});