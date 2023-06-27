class ToDo {
    constructor(titleV, descriptionV, dueDateV, priorityV, projectV){
        this.title = titleV;
        this.description = descriptionV;
        this.dueDate = dueDateV;
        this.priority = priorityV;
        this.project = projectV;
    }

    // Setters and getters

    // get title(){
    //     return this.title;
    // }
    // set title(titleValue){
    //     this.title = titleValue;
    // }

    // get description(){
    //     return this.description;
    // }
    // set description(descriptionValue){
    //     this.description = descriptionValue;
    // }

    // get dueDate(){
    //     return this.dueDate;
    // }
    // set dueDate(dueDateValue){
    //     this.dueDate = dueDateValue;
    // }

    // get priority(){
    //     return this.priority;
    // }
    // set priority(priorityValue){
    //     this.priority = priorityValue;
    // }

    // Methods

    editToDo(title, description, date, priority, project){
        this.title = title;
        this.description = description;
        this.dueDate = date;
        this.priority = priority;
        this.project = project;
    }

    editToDo(toDo){
        this.title = toDo.title;
        this.description = toDo.description;
        this.dueDate = toDo.dueDate;
        this.priority = toDo.priority;
        this.project = toDo.project;
    }
}

export {ToDo};