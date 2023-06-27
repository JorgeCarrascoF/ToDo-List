import { Project } from "./project";
import { ToDo } from "./to-do";
import { createProjectInDOM, createToDo, openToDoDescription } from "./DOMLogic";

const menuButton = document.getElementById('menu-icon');
const menu = document.getElementById('menu');

const selectForm = document.getElementById('projectNameForm');
const toDoFormButton = document.getElementById('toDoFormButton');
const projectFormButton = document.getElementById('projectFormButton');
const toDoCloseFormButton = document.getElementById('toDoCloseForm');

const editToDoForm = document.getElementById('edit-todo')
const editToDoButton = document.getElementById('toDoEditFormButton');
const projectEditForm = document.getElementById('projectNameEditForm');
const closeEditToDo = document.getElementById('toDoEditCloseForm');

const createProjectButton = document.getElementById('create-project')
const createToDoButton = document.getElementById('create-todo')

const aboutScreen = document.getElementById('aboutScreen');
const aboutButton = document.getElementById('about');
const aboutCloseButton = document.getElementById('aboutCloseButton');

const toDoFormScreen = document.getElementById('todo-form');
const projectFormScreen = document.getElementById('project-form');
const projectCloseFormButton = document.getElementById('projectCloseForm');

let currentId;

menuButton.addEventListener('click', ()=>{
    menu.classList.toggle('open');
})

const projectArray = [];


createNewProject('Default');

const toDoArray = document.getElementsByClassName('to-do-title');

function newProjectError(){
    alert(`You can't create more than 10 projects!`);
}

function projectFullError(project){
    alert(`${project} is full! (Max To-Dos = 6)`)
}

function createNewProject(name){
    // Can't have more than 10 projects
    
    if(projectArray.length > 9) {
        newProjectError();
    } else {
        // Project logic
        let project = new Project(name);
        projectArray.push(project);

        // DOM logic 
        createProjectInDOM(name);
        updateSelectForm();
    }
}

function deleteProject(project){
    console.log(projectArray)
    let projectObject = projectArray.filter(pro => pro.name == project)[0];
    console.log(projectObject);
    let index = projectArray.indexOf(projectObject);
    projectArray.splice(index, 1);
    console.log(projectArray)
}

function toDoFormData(){
    
    if(!document.getElementById('titleForm').checkValidity()){
        alert(`Title needs to be at least 4 char long!`)
    } else if(!document.getElementById('descriptionForm').checkValidity()){
        alert(`Description has to be max 500 char long!`)
    } else if(!document.getElementById('dateForm').checkValidity()) {
        alert(`Please, insert a valid date.`)
    } else if(!document.querySelector('input[name="priority"]').checkValidity()){
        alert('You need to choose a priority for the To-Do')
    } else {     
        let title = document.getElementById('titleForm').value;
    
        let description = document.getElementById('descriptionForm').value;
        
        let date = document.getElementById('dateForm').value;
        
        let priorityInput = document.querySelector('input[name="priority"]:checked');
        let priority = document.querySelector(`label[for="${priorityInput.id}"]`).innerText.toLowerCase();
        
        let projectInput = document.getElementById('projectNameForm');    
        // Podría hacerse de manera que, en lugar de coger el text, se cogiese el índice,
        // Ya que en principio comparten índice las opciones del select y el array de projectos
        let project = projectInput.options[projectInput.selectedIndex].text;
        createNewToDo(title, description, date, priority, project);
    }
    
}

function projectFormData(){
    let name = document.getElementById('projectForm').value;
    createNewProject(name);
}

function createNewToDo(title, description, date, priority, projectName){    
    
    let project = projectArray.filter(pro => pro.name == projectName);
     
    // Can't have more than 6 To-Dos per project
    if(project[0].length > 5) {
        projectFullError(project[0].title); 
    } else {
        let toDo = new ToDo(title, description, date, priority, projectName);
        project[0].addToDo(toDo);

        // DOM logic
        createToDo(title, description, date, priority, projectName);
    }
}

function updateSelectForm(){
    let i = 0;
    for(let project of projectArray){
        selectForm.options[i] = new Option(`${project.name}`, `Value${i}`)
        i++
    }
}

function updateEditSelectForm(title){
    currentId = title.replaceAll(' ', '-'); //save the original id in a global variable;
    let i = 0;
    for(let project of projectArray){
        projectEditForm.options[i] = new Option(`${project.name}`, `${project.name}`);
        i++;
    }
}

function deleteToDo(toDoName, projectName){    
    let project = projectArray.filter(pro => pro.name == projectName);
    let toDo = project[0].getToDo(toDoName);
    project[0].deleteToDo(toDo);
}

function editToDoFormData(){
    if(!document.getElementById('titleEditForm').checkValidity()){
        alert(`Title needs to be at least 4 char long!`)
    } else if(!document.getElementById('descriptionEditForm').checkValidity()){
        alert(`Description has to be max 500 char long!`)
    } else if(!document.getElementById('dateEditForm').checkValidity()) {
        alert(`Please, insert a valid date.`)
    } else if(!document.querySelector('input[name="priorityEdit"]').checkValidity()){
        alert('You need to choose a priority for the To-Do')
    } else {
        let title = document.getElementById('titleEditForm').value;
        
        let description = document.getElementById('descriptionEditForm').value;
        
        let date = document.getElementById('dateEditForm').value;
        
        let priorityInput = document.querySelector('input[name="priorityEdit"]:checked');
        let priority = document.querySelector(`label[for="${priorityInput.id}"]`).innerText.toLowerCase();
        
        let projectInput = document.getElementById('projectNameEditForm');
        let project = projectInput.options[projectInput.selectedIndex].text;
    
        // Temp solution: create another and remove the original
    
        // Problem: this only removes the original IF THE TITLE STAYS THE SAME
        let toDo = document.querySelector(`div[id=${currentId}]`);
        let destinationProject = projectArray.filter(pro => pro.name == project);
    
        if (destinationProject[0].projectLength() > 5){
            alert(`${destinationProject[0].name} is full! Delete a To-Do before adding this one.`)
        } else {
            //TODO remove the toDo from the array so the length doesn't accumulate
            toDo.remove();
            createNewToDo(title, description, date, priority, project);
        }
    }

}


for (let toDo of toDoArray){   
    toDo.addEventListener('click', openToDoDescription);
}

toDoFormButton.addEventListener('click', ()=>{
    toDoFormScreen.classList.add('disabled');
    toDoFormData();
});

createToDoButton.addEventListener('click', ()=>{
    toDoFormScreen.classList.remove('disabled');
})

toDoCloseFormButton.addEventListener('click', ()=>{
    toDoFormScreen.classList.add('disabled')
})

projectFormButton.addEventListener('click', ()=>{
    projectFormScreen.classList.add('disabled');
    projectFormData();
})

createProjectButton.addEventListener('click', ()=>{
    projectFormScreen.classList.remove('disabled');
})

projectCloseFormButton.addEventListener('click', ()=>{
    projectFormScreen.classList.add('disabled');
})

aboutButton.addEventListener('click', ()=>{
    aboutScreen.classList.remove('disabled');
})

aboutCloseButton.addEventListener('click', ()=>{
    aboutScreen.classList.add('disabled');
})

editToDoButton.addEventListener('click', ()=>{
    editToDoForm.classList.add('disabled');
    editToDoFormData();
});

closeEditToDo.addEventListener('click', ()=>{
    editToDoForm.classList.add('disabled');
})



// createNewProject('Hola');
createNewToDo("Creating To-Do's (click me!)", `'To create a new To-Do, open the menu and select "Create new to-do". A form will open, where you can insert the data.`, '2017-08-19', 'high', 'Default');
export {deleteProject, deleteToDo, updateEditSelectForm};