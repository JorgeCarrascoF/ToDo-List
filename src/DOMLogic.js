import { deleteProject, deleteToDo, updateEditSelectForm } from ".";

function createProjectInDOM(name){
    let dashboard = document.getElementById('dashboard');
    
    let project = dashboard.appendChild(document.createElement('div'));
    project.classList.add('project');
    project.id = name;

    let spanTitle = project.appendChild(document.createElement('span'));
    spanTitle.classList.add('project-title');
    spanTitle.innerText = name;

    let deleteProjectIcon = spanTitle.appendChild(document.createElement('img'));
    deleteProjectIcon.src = '../img/delete.png';
    deleteProjectIcon.classList.add('icon');
    deleteProjectIcon.id = 'deleteProjectButton';

    deleteProjectIcon.addEventListener('click', deleteProjectinDOM)
}

function deleteProjectinDOM(e){
    const projectDOM = e.target.parentElement.parentElement;
    deleteProject(projectDOM.id)
    projectDOM.remove();

}

function createToDo(title, description, date, priority, projectName){
    let project = document.getElementById(projectName);

    let toDo = project.appendChild(document.createElement('div'));
    toDo.classList.add('to-do');
    let titleId = title.replaceAll(' ', '-');
    toDo.id = titleId;
    
    // Title

    let toDoTitle = toDo.appendChild(document.createElement('div'));
    toDoTitle.classList.add('to-do-title');

    let bulletPoint = toDoTitle.appendChild(document.createElement('div'));
    bulletPoint.classList.add('bullet-point');

    let priorityText = `${priority}-priority`;
    bulletPoint.classList.add(priorityText);

    let spanTitle = toDoTitle.appendChild(document.createElement('span'));
    spanTitle.innerText = title;

    // Description

    let toDoDescription = toDo.appendChild(document.createElement('div'));
    toDoDescription.classList.add('to-do-description');
    toDoDescription.id = 'to-do-description';

    let toDoIcons = toDoDescription.appendChild(document.createElement('div'));
    toDoIcons.classList.add('to-do-icons');

    let editButton = toDoIcons.appendChild(document.createElement('img'));
    editButton.classList.add('icon');
    editButton.src = '../img/edit.png';

    let deleteButton = toDoIcons.appendChild(document.createElement('img'));
    deleteButton.classList.add('icon');
    deleteButton.src = '../img/delete.png';

    let descriptionParagraph = toDoDescription.appendChild(document.createElement('p'));
    descriptionParagraph.innerText = description;

    toDoTitle.addEventListener('click', openToDoDescription);

    let editForm = document.getElementById('edit-todo');

    deleteButton.addEventListener('click', deleteToDoDOM);
    editButton.addEventListener('click', ()=>{
        prepareEditForm(title, description, date, priority, project.id);
        editForm.classList.remove('disabled');
    })
}

function prepareEditForm(title, description, date, priority, project){
    let titleInput = document.getElementById('titleEditForm');
    let descriptionInput = document.getElementById('descriptionEditForm');
    let dateInput = document.getElementById('dateEditForm');
    let priorityRadio = document.getElementById(`${priority}-radio-edit`);    
    
    titleInput.value = title;
    descriptionInput.value = description;
    dateInput.value = date;
    priorityRadio.checked = true;
    
    updateEditSelectForm(title);
    let opt = document.querySelector(`option[value="${project}"]`);
    opt.selected = true;
}



function deleteToDoDOM(e){
    // Selecting the toDo
    const toDo =  e.target.parentElement.parentElement.parentElement; 
    const project = toDo.parentElement;

    // Deleting from project and from DOM;
    deleteToDo(toDo.id, project.id);
    toDo.remove();
}

function openToDoDescription(e){
    
    // need to go from a NodeList to the to-do-description element
    const nodeList = e.target.parentElement.childNodes;
    const nodeArray = Array.from(nodeList);
    let descriptionDiv = nodeArray.filter(node => node.id == 'to-do-description');

    let descriptions = document.getElementsByClassName('open');

    // if you click in a opened description, closes it.
    // else, closes other opened descriptions and opens target description

    if(descriptionDiv[0].classList.contains('open')){
        descriptionDiv[0].classList.remove('open')
    } else {
        for(let desc of descriptions){
            desc.classList.remove('open');
        }
        descriptionDiv[0].classList.add('open');    
    }
}

export {createProjectInDOM, createToDo, openToDoDescription};