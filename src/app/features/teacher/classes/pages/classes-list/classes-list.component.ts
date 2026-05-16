import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassStore } from '../../../state/class.store';

@Component({
  selector: 'app-classes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {
  readonly store = inject(ClassStore);

  ngOnInit(): void {
    this.store.loadClasses();
  }

  onDelete(classId: string): void {
    console.log('delete', classId);
  }

  onCreateClass(): void {
    const name = prompt('Class name');
    if (!name) return;

    this.store.createClass({
      name,
      description: '',
    });
  }
}