import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClassStore } from '../../../state/class.store';

@Component({
  selector: 'app-classes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {
  readonly store = inject(ClassStore);

  createMode = signal(false);
  newClassName = signal('');
  newClassDescription = signal('');

  ngOnInit(): void {
    this.store.loadClasses();
  }

  onDelete(classId: string): void {
    console.log('delete', classId);
  }

  onCreateClass(): void {
    this.createMode.set(true);
  }

  submitCreate(): void {
    const name = this.newClassName().trim();
    if (!name) return;

    this.store.createClass({
      name,
      description: this.newClassDescription().trim(),
    });

    this.cancelCreate();
  }

  cancelCreate(): void {
    this.createMode.set(false);
    this.newClassName.set('');
    this.newClassDescription.set('');
  }
}