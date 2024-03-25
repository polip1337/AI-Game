setInterval(() => {
if(gameLoaded){

    manageLocks()
    updateAllTaskProgress();
    updateFlowResources();
    }

}, 1);

setInterval(() => {
if(gameLoaded){
    updateFlowResources();
    }

}, 1000);

function updateFlowResources() {
        for (const key in flowResourcesMain) {
            if(flowResourcesMain[key].value < flowResourcesMain[key].maxValue)
                flowResourcesMain[key].value+=flowResourcesMain[key].regenPerSecond;
            if(flowResourcesMain[key].value > flowResourcesMain[key].maxValue)
                flowResourcesMain[key].value = flowResourcesMain[key].maxValue;
        }
}


function updateTaskProgress(task) {
    const initialTicks = task.ticks;
    const cores = task.assignedCores;
    const ticksLeft = task.ticksLeft - cores;
    task.ticksLeft = ticksLeft;
    task.progress = (initialTicks - ticksLeft) / initialTicks * 100;
    addExperience(task.skill, cores);
}



function updateAllTaskProgress() {
    for (const key in taskMap) {
        const element = document.getElementById(taskMap[key].id);
        const progressElement = document.getElementById(`${taskMap[key].id}Progress`);

        if (taskMap[key].assignedCores > 0 && !element.classList.contains("hidden") && !element.classList.contains("blocked")) {
            updateTaskProgress(taskMap[key]);

            if (taskMap[key].ticksLeft > 0) {
                progressElement.style.width = `${taskMap[key].progress}%`;
            } else {
                finishTask(key);
            }
        }
    }
}
function finishTask(key){
    document.getElementById(taskMap[key].id).style.width = `0%`;
    const taskElement = document.getElementById(`${taskMap[key].id}Cores`).parentElement.parentElement.parentElement;

    calcResources(taskMap[key]);
    if (taskMap[key].single) {
        unlockElements(taskMap[key].unlocks);
        unAssignAllCores(key);
        hideElement(taskElement, true);
        if(taskMap[key].event != ""){
            triggerEvent(taskMap[key].event);
        }
        removeTask(key);
    } else {
        taskMap[key].ticksLeft = taskMap[key].ticks;
        if (!areResourcesAvailable(taskMap[key])) {
            blockElement(taskElement, true);
        }
    }
}


function calcResources(task) {
    task.resources.forEach(function (resource) {
        const tempRes = resourcesMain.get(resource.name);
        tempRes.value += resource.value;
        document.getElementById(resource.name).innerHTML = tempRes.value;
    });

}

function manageLocks() {
    for (const key in taskMap) {
        const element = document.getElementById(taskMap[key].id);
        const taskElement = document.getElementById(`${taskMap[key].id}Cores`).parentElement.parentElement.parentElement;
        if (element.classList.contains("blocked") && areResourcesAvailable(taskMap[key])) {
            blockElement(taskElement, false);
        }
        if (!areResourcesAvailable(taskMap[key])) {
            blockElement(taskElement, true);
        }
    }
}

// Function to assign a core to a button
function assignCore(id, coreChange) {

    if (cores.numFreeCores > 0) {
        if (areResourcesAvailable(taskMap[id])) {
            var currentCores = taskMap[id].assignedCores;
            currentCores += coreChange;
            document.getElementById(id + "Cores").innerHTML = currentCores;
            taskMap[id].assignedCores = currentCores;
            cores.numFreeCores -= coreChange;
            updateCores();
        } else {
            alert("Not enough resources");
        }
    } else {
        alert("You don't have enough cores to assign one to this id.");
    }
}

function areResourcesAvailable(task) {
    const requiredResources = task.resources;

    for (const resource of requiredResources) {
        const resourceName = resource.name;
        const resourceCost = resource.value;

        // Check if the resource is available in the resource list
        const availableResource = resourcesMain.get(resource.name);

        // If the resource is not found or the available quantity is less than the required cost
        if (resource.type == "costBefore") {
            if (!availableResource || availableResource.value < Math.abs(resourceCost)) {
                return false; // Resources are not available
            }
        }
    }

    return true; // All required resources are available
}

// Function to assign a core to a button
function unAssignCore(id, coreChange) {
    var element = document.getElementById(id + "Cores");
    var currentCores = taskMap[id].assignedCores;

    if (currentCores + coreChange >= 0) {
        currentCores += coreChange;
        element.innerHTML = currentCores;
        cores.numFreeCores -= coreChange;
        taskMap[id].assignedCores = currentCores;
    } else {
        alert("Not enough cores assigned to id to remove one.");
    }

    updateCores();
}
function triggerEvent (id){
var event = eventMap[id];
showPopup(event.title, event.eventText);
}

function removeTask(key){
    destroyElement(taskMap[key].id);
    delete taskMap[key];
}
function unAssignAllCores(id) {
    var element = document.getElementById(id + "Cores");
    var currentCores = Number(element.innerHTML);
    cores.numFreeCores += currentCores;
    element.innerHTML = 0;
    taskMap[id].assignedCores = 0;
    updateCores();
}
