import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addTaskForm: FormGroup;
  listData: any;

  constructor(private fb: FormBuilder) {

    this.listData = [];

    this.addTaskForm = this.fb.group({
      project: ['', Validators.required],
      task: ['', Validators.required],
      duration: ['', Validators.required],
      reportedDuration: ['', Validators.required],
      overtimeDuration: ['', Validators.required],
      weekendDuration: ['', Validators.required],
      notReportedDuration: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  public addItem(): void {
    this.listData.push(this.addTaskForm.value);
  }

  // showMe - Task Suggestions And Templates
  showMe: boolean = false

  ngOnInit(): void {
  }

  // toogleTag() - Task Suggestions And Templates 

  toogleTag() {
    this.showMe = !this.showMe
  }

}
