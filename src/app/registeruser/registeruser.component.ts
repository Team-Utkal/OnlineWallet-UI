import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../user';
import { RegisteruserService } from '../registeruser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.scss']
})
export class RegisteruserComponent implements OnInit {
  myRegistrationForm: FormGroup;
  isSubmitted: boolean = false;
  private user: User = new User();
  constructor(private router: Router, private formBuilder: FormBuilder, private registerUserService: RegisteruserService) {

    this.myRegistrationForm = this.formBuilder.group({
      userName: new FormControl(''),
      password: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl('')
    });
  }
  ngOnInit() {
  }
  errorMessage: string;
  checkError: boolean = false;
  checkInfo: boolean = false;
  infoMessage: string;
  onRegistrationFormSubmit() {
    this.isSubmitted = true;
    if (this.myRegistrationForm.valid) {
      console.log("User Login Form Submit", this.myRegistrationForm.value);
      this.user.email = this.myRegistrationForm.value.email;
      this.user.password = this.myRegistrationForm.value.password;
      this.user.phoneNumber = this.myRegistrationForm.value.phoneNumber;
      this.user.userName = this.myRegistrationForm.value.userName;
      console.log(this.user.email);
      this.registerUserService.registerUser(this.user).subscribe(
        (data) => {
          this.infoMessage = "You have been successfully registered with Email Address " + data;
          this.checkInfo = true;
        },
        (error) => {
          this.errorMessage = error.error;
          this.checkError = true;
        }
      );
      //  if(this.checkInfo==true)
      //  {
      //  this.router.navigate(['./homepage']);
      //  }
    }

  }
}
