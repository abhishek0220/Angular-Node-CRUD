import { Component, OnInit } from '@angular/core';
import {ApiService} from './../../service/api.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  Employee : any = [];
  constructor(private apiservice:ApiService) {
    this.readEmployee();
  }
  ngOnInit(): void {
  }
  readEmployee(){
    this.apiservice.getEmployees().subscribe((data) => {
      for(var k in data){
        var tmp = data[k];
        tmp['uid'] = k;
        this.Employee.push(tmp);
        console.log(tmp);
      }
    })
  }
}
