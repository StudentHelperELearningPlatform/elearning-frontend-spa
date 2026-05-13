import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassStore } from '../../../state/class.store';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
})
export class ClassDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(ClassStore);

  students = this.store.students;

  classId!: string;

  ngOnInit() {
    this.classId = this.route.snapshot.params['classId'];
    this.store.loadStudents();
  }

  remove(id: string) {
    this.store.removeStudent(id);
  }
}