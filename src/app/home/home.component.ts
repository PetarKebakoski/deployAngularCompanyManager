import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AddTaskService } from '../add-task.service';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addTaskForm: FormGroup;
  listData: any;
  enableEdit = false;
  enableEditIndex = null;
  saveSegment: any;

  constructor(private fb: FormBuilder, private postData: AddTaskService) {

    this.listData = [];

    // Inserting data into the table (class="table4").
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

  // Inserting data into the table (class="table4").
  public addItem(): void {
    this.listData.push(this.addTaskForm.value);
  }

  // Post API Method | http post call.
  postdata(form: Object) {
    this.postData.postData(form).subscribe(
      data => {
        console.log('dataPost', data);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  // Post API Method | http post call.
  onSubmit(formValue: any) {
    console.log('formValue', formValue);
    this.postdata(formValue);
  }

  // showMe - Task Suggestions And Templates
  showMe: boolean = false

  ngOnInit(): void {

  }

  // toogleTag() - Task Suggestions And Templates 

  toogleTag() {
    this.showMe = !this.showMe
  }

  // Edit On Click Functionality (Cancel Button And Save Button)
  enableEditMethod(e: any, i: any) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

  // Delete Button 
  onDelete(id: Guid) {
    let item = this.listData.filter((x: any) => x.id === id)[0];
    let index = this.listData.indexOf(item, 0);
    if (index > -1) {
      this.listData.splice(index, 1);
    }
  }

}
