import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Customer } from 'src/app/customer';
import { UserServiceService } from '../user-service.service';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  customer: Customer = new Customer();
  constructor(private registerService: UserServiceService, private router: Router) {

  }
  onSubmit() {
    if (this.customer.password !== this.customer.confirmPassword) {
      alert("Password and confirm Password should be same")
    }
    else {
      this.registerService.createCustomer(this.customer).subscribe((data) => console.log(data), (err) =>
        console.log(err))
      alert('User Registered Successfully');
      setTimeout(() => this.router.navigate(['login-user']), 1000);

    }
  }
}
