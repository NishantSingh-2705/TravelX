import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private loginservice: UserServiceService, private router: Router) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }
  id!: number;
  onSubmit() {
    this.loginservice.loginUser(this.loginForm.value).subscribe((data) => {
      console.log(data);
      if ('status' in data && data.status != 200) { alert(data.res) }
      else {
        this.id = data.id;
        this.router.navigate(['team', this.id]);

      }
    }, (err) => alert(err.res));
  }

  registerUser() {
    this.router.navigate(['register-user']);
  }
}
