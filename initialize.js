    var gameLoaded = false;

$( document ).ready(function() {
    if(localStorage.getItem('eventMap')!= null && localStorage.getItem('taskMap')!= null){
        load();
        createAllTasks();
        manageLocks();
        updateAllTaskProgress();
        updateProgressBar();
    }else{
        loadFromFile();
    }
    gameLoaded = true;

});


function loadFromFile(){
    var taskMap= new Map();
    var eventMap= new Map();
    // Load the JSON file and create HTML elements
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
            var data = JSON.parse(xhr.responseText);
            var container = document.getElementById("container");

            taskMap = mapTasksById(data);
            createAllTasks();
        }
    };
    xhr.open("GET", "data.json", true);
    xhr.send();

    var loadEvents = new XMLHttpRequest();
    loadEvents.onreadystatechange = function() {
        if (loadEvents.readyState === 4 && (loadEvents.status === 200 || loadEvents.status === 0)) {
            var data = JSON.parse(loadEvents.responseText);

            eventMap = mapTasksById(data);

        }
    };
    loadEvents.open("GET", "events.json", true);
    loadEvents.send();
}

