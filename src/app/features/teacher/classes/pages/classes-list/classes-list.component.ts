import { Component, inject, OnInit } from '@angular/core';
import { ClassStore } from '../../../state/class.store';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {
  private store = inject(ClassStore);

  classes = this.store.classes;
  loading = this.store.loading;

  ngOnInit() {
    this.store.loadClasses();
  }

  onDelete(id: string) {
    this.store.removeStudent(id); // (temporar, până ai delete class endpoint)
  }
}