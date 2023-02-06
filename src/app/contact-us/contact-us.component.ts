import { Component } from '@angular/core';
import { SubmitReq } from '../submit-req';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  form: SubmitReq = new SubmitReq();
  constructor(private registerService: UserServiceService) {

  }
  onSubmit() {
    this.registerService.sendForm(this.form).subscribe((data) => alert(data.res), (err) => console.log(err))
  }

}
