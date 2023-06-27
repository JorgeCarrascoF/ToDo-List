import { ToDo } from "./to-do";

class Project {
    name;
    #toDoArray = [];

    constructor(name){
        this.name = name;
    }

    searchOnArray(toDoTitle){
        let found = false;
        let index = this.#toDoArray.indexOf(toDo => toDo.title == toDoTitle);
        if(index != -1){
            !found;
        }
        return found;
    }

    deleteToDo(toDo){
        let index = this.#toDoArray.indexOf(toDo);
        this.#toDoArray.splice(index, 1);
    }
    
    addToDo(toDo){
        this.#toDoArray.push(toDo);
    }

    projectLength(){
        return this.#toDoArray.length;
    }

    editToDo(toDo){
        let index = this.#toDoArray.indexOf(toDo);
        this.#toDoArray[index].edit(toDo);
    }

    getToDo(toDoName){
        let toDo = this.#toDoArray.filter(to => to.title == toDoName);
        return toDo[0];
    }

    get name(){
        return this.name;
    }
    set name(name){
        this.name = name;
    }

    get length(){
        return this.#toDoArray.length;
    }

}

export {Project};