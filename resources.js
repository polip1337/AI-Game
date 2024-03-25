
function createFlowResourceElement(label, maxValue, hidden) {
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
    hideElement(resourceDiv,hidden);

    progressBarDiv.appendChild(progressDiv);
	container.appendChild(resourceDiv);
}

function createResourceElement(name, value, hidden) {
  container = document.getElementById('toolbar-left');
  
  const resourceElem = document.createElement('div');
  resourceElem.classList.add('resource');
  resourceElem.setAttribute("id", "Resource"+name);

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
  hideElement(resourceElem,hidden);
  container.appendChild(resourceElem);
}
function createResourceElements(){
    resourcesMain.forEach(resource => {
        createResourceElement(resource.name, resource.value);
    });
    flowResourcesMain.forEach(resource => {
        createFlowResourceElement(resource.name, resource.maxValue);
    });
}
