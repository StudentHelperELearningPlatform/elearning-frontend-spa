import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClassStore } from '../../../state/class.store';

@Component({
  selector: 'app-classes-list',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {
  readonly store = inject(ClassStore);

  readonly createMode = signal(false);
  newClassName = '';
  newClassDescription = '';

  ngOnInit(): void {
    this.store.loadClasses();
  }

  onDelete(classId: string): void {
    if (confirm('Delete this class? This cannot be undone.')) {
      this.store.deleteClass(classId);
    }
  }

  openCreate(): void {
    this.newClassName = '';
    this.newClassDescription = '';
    this.createMode.set(true);
  }

  cancelCreate(): void {
    this.createMode.set(false);
  }

  submitCreate(): void {
    const name = this.newClassName.trim();
    if (!name) return;

    this.store.createClass({
      name,
      description: this.newClassDescription.trim() || undefined,
    });
    this.createMode.set(false);
  }
}
