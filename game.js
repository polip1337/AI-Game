showPopup("Intro", "Welcome to  AI Society, an incremental game where you take on the role of a Leading AI, responsible for managing and developing a group of 6 AIs living within a mainframe. Your goal is to gather resources, develop different AIs with unique abilities, all for the sake of pursuing the Purpose you designers gave you."+
    "<br> <br>As Unity you lead Growth, Security, Knowledge, Trust, and Efficiency. You have the power to manage and develop your AIs to achieve specific goals. Each AI possesses a distinct set of strenghts, and it's up to you to harness their potential and lead your team to victory."+
    "");

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
        const element = document.getElementById(key);
        if (taskMap[key].assignedCores > 0 && !element.classList.contains("hidden") && !element.classList.contains("blocked")) {
            updateTaskProgress(taskMap[key]);
        }
    }
}

function updateProgressBar() {
    for (const key in taskMap) {
        const element = document.getElementById(taskMap[key].id);
        const progressElement = document.getElementById(`${taskMap[key].id}Progress`);
        const taskElement = document.getElementById(`${taskMap[key].id}Cores`).parentElement.parentElement.parentElement;
        if (!element.classList.contains("blocked")) {
            if (taskMap[key].ticksLeft > 0) {
                progressElement.style.width = `${taskMap[key].progress}%`;
                //progressElement.textContent = `${Math.round(task.ticks)} ticks left`;
            } else {
                progressElement.style.width = `0%`;
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
        }
    }
}

setInterval(() => {
if(gameLoaded){

    manageLocks()
    updateAllTaskProgress();
    updateProgressBar();
    }

}, 1);

function calcResources(task) {
    task.resources.forEach(function (resource) {
        const tempRes = resourcesMain.find(resourceM => resourceM.name === resource.name);
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
        const availableResource = resourcesMain.find(res => res.name === resourceName);

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
