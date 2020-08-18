import { Component, OnInit, NgZone } from '@angular/core';
import {ApiService} from './../../service/api.service';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  employeeForm : FormGroup;
  EmployeeProfile : any = ['Finance', 'BDM', 'HR', 'Admin'];
  constructor(
    public fb: FormBuilder,
    private router : Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit(): void {
  }
  mainForm(){
    this.employeeForm = this.fb.group({
      uid : ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      design: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
  }

  updateProfile(e){
    this.employeeForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }
  get myForm(){
    return this.employeeForm.controls;
  }

  onSubmit() {
    console.log("submit")
    this.submitted = true;
    if (!this.employeeForm.valid) {
      console.log("false")
      return false;
    } else {
      this.apiService.createEmployee(this.employeeForm.value).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
