$( document ).ready(function() {
    console.log( "ready!" );
    if(localStorage.getItem('cores')!= null){
    load()
    manageLocks()
    updateAllTaskProgress();
    updateProgressBar();
    }
});
function save(){
  localStorage.setItem('cores', JSON.stringify(cores));
  localStorage.setItem('resourcesMain', JSON.stringify(resourcesMain));
  localStorage.setItem('skills', JSON.stringify(skills));
  localStorage.setItem('eventMap', JSON.stringify(eventMap));
  localStorage.setItem('taskMap', JSON.stringify(taskMap));
}
function load() {
  cores = JSON.parse(localStorage.getItem('cores'));
  resourcesMain = JSON.parse(localStorage.getItem('resourcesMain'));
  skills = JSON.parse(localStorage.getItem('skills'));
  eventMap = JSON.parse(localStorage.getItem('eventMap'));
  taskMap = JSON.parse(localStorage.getItem('taskMap'));
}