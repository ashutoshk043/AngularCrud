import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud';
  registerForm!: FormGroup;

  constructor(private _tostr: ToastrService, private _fb: FormBuilder) {

  }

  ngOnInit() {
    this.setFormState();
  }

  setFormState() {
    this.registerForm = this._fb.group({
      id: [0],
      title: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      dob: ['', Validators.compose([Validators.required, Validators.pattern(/^([0-2^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      acceptTerms: [false, Validators.required]

    })
  }
  onSubmit(){
      
  }

  onCancel(){
    this.registerForm.reset();
  }
}
