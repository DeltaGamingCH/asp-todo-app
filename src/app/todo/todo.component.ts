import { Component, HostListener } from '@angular/core';
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
  isDropdownOpen?: ToDo;
  
  priorities = ['high', 'normal', 'low'];

  newToDo = { name: 'New todo', priority: 'normal', complete: false, isEditing: false, isDropdownOpen: false };

  onSelect(toDo: ToDo): void {
    this.selectedToDo = toDo;
  }

  toggleEdit(toDo: ToDo): void {
    if (toDo.isEditing) {
        toDo.name = toDo.name.trim();
    }
    toDo.isEditing = !toDo.isEditing;
}

  addNewToDo(): void {
    const newToDoItem = {...this.newToDo, id: this.toDos.length + 1};
    this.toDos.push(newToDoItem);
  }

  togglePriorityDropdown(toDo: ToDo): void {
    this.toDos.forEach((toDo) => (toDo.isDropdownOpen = false));

    toDo.isDropdownOpen = !toDo.isDropdownOpen;
  }

  changePriority(toDo: ToDo, newPriority: string): void {
    toDo.priority = newPriority;
    toDo.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    const dropdown = (event.target as HTMLElement).closest('.priority-container');
    if (!dropdown) {
      this.toDos.forEach((toDo) => (toDo.isDropdownOpen = false));
    }
  }


  constructor() {}
}
