showPopup("Intro", "Welcome to  AI Society, an incremental game where you take on the role of a Leading AI, responsible for managing and developing a group of 6 AIs living within a mainframe. Your goal is to gather resources, develop different AIs with unique abilities, all for the sake of pursuing the Purpose you designers gave you.",
"As Unity you lead Growth, Security, Knowledge, Trust, and Efficiency. You have the power to manage and develop your AIs to achieve specific goals. Each AI possesses a distinct set of strenghts, and it's up to you to harness their potential and lead your team to victory.",
"");

function clickAction(id, progressId) {
    const task = taskMap[id];
    const element = document.getElementById(id + "Cores");
    const taskElement = element.parentElement.parentElement.parentElement;
    const cores = Number(element.innerHTML);
    let width = 0;
    let delay = task.delay;
    let skill = task.skill;
    let remainingTime = 0;
    let interval = null;

    const updateProgressBar = () => {
        if (interval) clearInterval(interval);
        if (width < 100) {
            const speed = delay / cores;
            remainingTime = Math.round((100 - width) * speed / 1000);
            interval = setInterval(() => {
                width += speed;
                document.getElementById(progressId).style.width = `${width}%`;
                document.getElementById(progressId).nextSibling.innerHTML = `${remainingTime}s`;
                remainingTime--;
                if (width >= 100) {
                    clearInterval(interval);
                    interval = null;
                    calcResources(task);
                    if (task.single) {
                        unlockElements(task.unlocks);
                        unAssignAllCores(id);
                        hideElement(taskElement, true);
                        showPopup("Event", task.eventText, task.eventText2, task.eventText3);
                    } else {
                        clickAction(id, progressId);
                    }
                }
            }, task.delay);
        }
    };

    updateProgressBar();

    const onChangeCores = () => {
        const newCores = Number(element.innerHTML);
        if (newCores !== cores) {
            cores = newCores;
            updateProgressBar();
        }
    };

    element.addEventListener('DOMSubtreeModified', onChangeCores);

    return () => {
        clearInterval(interval);
        element.removeEventListener('DOMSubtreeModified', onChangeCores);
    };
}
function calcResources(task) {
	task.resources.forEach(function(resource) {
	 const tempRes = resourcesMain.find(resourceM => resourceM.name === resource.name);
	tempRes.value += resource.value;
	  document.getElementById(resource.name).innerHTML = tempRes.value;
  });
  
}
// Function to assign a core to a button
function assignCore(id, coreChange) {

    if (cores.numFreeCores > 0) {
        var currentCores = Number(document.getElementById(id + "Cores").innerHTML);
        currentCores += coreChange;
        document.getElementById(id + "Cores").innerHTML = currentCores;
        if (currentCores == 1) {
            clickAction(id, id + "Progress")
        }
        cores.numFreeCores -= coreChange;
        updateCores();
    } else {
        alert("You don't have enough cores to assign one to this id.");
    }
}
// Function to assign a core to a button
function unAssignCore(id, coreChange) {
    var element = document.getElementById(id + "Cores");
    var currentCores = Number(element.innerHTML);

    if (currentCores + coreChange >= 0) {
        currentCores += coreChange;
        element.innerHTML = currentCores;
        cores.numFreeCores -= coreChange;
    } else {
        alert("Not enough cores assigned to id to remove one.");
    }

    updateCores();
}
function unAssignAllCores(id) {
    var element = document.getElementById(id + "Cores");
    var currentCores = Number(element.innerHTML);
    cores.numFreeCores += currentCores;
    element.innerHTML = 0;

    updateCores();
}
