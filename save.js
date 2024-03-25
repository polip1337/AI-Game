
function saveToLocalStorage(){
  localStorage.setItem('cores', JSON.stringify(cores));
  localStorage.setItem('resourcesMain', JSON.stringify(resourcesMain));
  localStorage.setItem('flowResourcesMain', JSON.stringify(flowResourcesMain));
  localStorage.setItem('skills', JSON.stringify(skills));
  localStorage.setItem('eventMap', JSON.stringify(eventMap));
  localStorage.setItem('taskMap', JSON.stringify(taskMap));
  alert("Manually saved.");

}
function loadFromLocalStorage() {
  cores = JSON.parse(localStorage.getItem('cores'));
  resourcesMain = JSON.parse(localStorage.getItem('resourcesMain'));
  flowResourcesMain = JSON.parse(localStorage.getItem('flowResourcesMain'));
  skills = JSON.parse(localStorage.getItem('skills'));
  eventMap = JSON.parse(localStorage.getItem('eventMap'));
  taskMap = JSON.parse(localStorage.getItem('taskMap'));
}