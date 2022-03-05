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
  projects: any[] = []

  constructor(private fb: FormBuilder, private postData: AddTaskService) {

    this.listData = [];

    // Inserting data into the table (class="table4").
    this.addTaskForm = this.fb.group({
      projectId: ['', Validators.required],
      name: ['', Validators.required],
      timeSpentInMinutes: ['', Validators.required],
      reportedTimeSpentInMinutes: ['', Validators.required],
      overTimeSpentInMinutes: ['', Validators.required],
      weekendTimeSpentInMinutes: ['', Validators.required],
      notReportedTimeSpentInMinutes: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  getProjects() {
    this.postData.getProjects().subscribe(
      (res: any) => {this.projects = res},
      (err: Error) => {
        console.log(err)
      }
    )
  }

  // Post API Method | http post call.
  postdata(form: Object) {
    this.postData.postData(form).subscribe(
      (data: any) => {
        data.projectName = this.projects.find(
          (p) => p.id === data.projectId
        )?.projectName;

        console.log('dataPost', data);
        this.listData.push(data);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  // Post API Method | http post call.
  onSubmit(formValue: any) {
    const data = this.addTaskForm.value;
    data.date = (data.date as string).replaceAll('-', "");
    console.log(data);
    this.postdata(data)
  }

  // showMe - Task Suggestions And Templates
  showMe: boolean = false

  ngOnInit(): void {
    this.getProjects()
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
