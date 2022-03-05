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
  editingTaskId = "";
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
      (res: any) => { this.projects = res },
      (err: Error) => {
        console.log(err)
      }
    )
  }

  getTasks() {
    this.postData.getTasks().subscribe(
      (res: any) => { this.listData = res.content },
      (err: Error) => {
        console.log(err)
      }
    )
  }

  updateTask(taskId: string, body: any) {
    this.postData.updateTask(taskId, body).subscribe(
      (res: any) => { this.getTasks() },
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

    if (this.editingTaskId !== "") {
      this.updateTask(this.editingTaskId, data)
      this.editingTaskId = ""
      this.enableEdit = false
    } else {
      this.postdata(data)
    }
  }

  // showMe - Task Suggestions And Templates
  showMe: boolean = false

  ngOnInit(): void {
    this.getProjects();
    this.getTasks();
  }

  // toogleTag() - Task Suggestions And Templates 

  toogleTag() {
    this.showMe = !this.showMe
  }

  // Edit On Click Functionality (Cancel Button And Save Button)
  enableEditMethod(item: any) {
    this.enableEdit = true;
    this.editingTaskId = item.id
    let formattedDate: string = item.date.toString();
    formattedDate = `${formattedDate.substring(0, 4)}-${formattedDate.substring(4, 6)}-${formattedDate.substring(6, 8)}`

    this.addTaskForm = this.fb.group({
      projectId: [item.projectId, Validators.required],
      name: [item.name, Validators.required],
      timeSpentInMinutes: [item.timeSpentInMinutes, Validators.required],
      reportedTimeSpentInMinutes: [item.reportedTimeSpentInMinutes, Validators.required],
      overTimeSpentInMinutes: [item.overTimeSpentInMinutes, Validators.required],
      weekendTimeSpentInMinutes: [item.weekendTimeSpentInMinutes, Validators.required],
      notReportedTimeSpentInMinutes: [item.notReportedTimeSpentInMinutes, Validators.required],
      date: [formattedDate, Validators.required],
    })
  }
}
