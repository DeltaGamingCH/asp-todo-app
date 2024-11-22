import { Component, OnInit } from '@angular/core';
import { TitleCasePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToDo } from './todo';
import { TODOS } from './mock-todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css', 
  imports: [TitleCasePipe, NgIf, NgFor, FormsModule]
})
export class TodoComponent {
  toDos = TODOS;
  selectedToDo?: ToDo;
  newToDo = { name: 'New todo', priority: 'normal', complete: false, isEditing: false }
  onSelect(toDo: ToDo): void {
    this.selectedToDo = toDo;
  }

  toggleEdit(toDo: ToDo): void {
    toDo.isEditing = !toDo.isEditing;
  }

  addNewToDo(): void {
    const newToDoItem = {...this.newToDo, id: this.toDos.length + 1};
    this.toDos.push(newToDoItem);
  }

  constructor() {}
}
