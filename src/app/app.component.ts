import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DBoperation } from './_helpers/db-operations';
import { User } from './_helpers/user.interface';
import { UserService } from './_helpers/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud';
  registerForm!: FormGroup;
  users: any;
  submitted : boolean = false;
  buttonText : string = "Register";
  dbops : DBoperation | undefined;


  constructor(private _tostr: ToastrService, private _fb: FormBuilder, private _userService: UserService) {

  }

  ngOnInit() {
    this.setFormState();
    this.getAllUsers();
  }

  setFormState() {
    this.buttonText = "Register"
    this.dbops = DBoperation.create;

    this.registerForm = this._fb.group({
      id: [0],
      title: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      dob: ['', Validators.compose([Validators.required, Validators.pattern(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      acceptTerms: [false, Validators.required]

    })
  }
  //to avoid writing this controls many time using shortform to access data; 
  get f(){
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
      // console.log('Invalid Form');
      return;
    }

    // console.log(this.dbops)
    switch(this.dbops){

      case DBoperation.create:
      this._userService.addUser(this.registerForm.value).subscribe(res =>{
        this._tostr.success("Registation Successfull")
        this.getAllUsers()
        this.onCancel()     
      });
      break;

      case DBoperation.update:
      this._userService.upDateUser(this.registerForm.value).subscribe(res =>{
        this._tostr.success("User Updated")
        this.getAllUsers()
        this.onCancel()
      });
      break;

    }
  }

  onCancel() {
    this.registerForm.reset();
    this.buttonText = "Register"
    this.dbops = DBoperation.create;
    this.submitted = false;
  }

  getAllUsers() {
    this._userService.getUsers().subscribe((res: any) => {
      this.users = res;
      // console.log(res)
    })
  }

  Edit(userId: number) {
    this.buttonText = "Update"
    this.dbops = DBoperation.update;

    let user = this.users.find((u:User)=> u.id === userId);
    this.registerForm.patchValue(user);
  }

  Delete(userId: number) {
    Swal.fire({
      title: "Are you Sure Want to Delete This Record",
      text: "Data Will Be Permanently Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "No, Don't delete"
    }).then((status) => {
      if (status.value) {
        this._userService.deleteUser(userId).subscribe(res => {
          this.getAllUsers();
          this._tostr.success("Deleted SuccessFully", "UserData");
        })
      } else if (status.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Not Deleted",
          "Data Is Safe Now",
          "error")
      }
    })
  }

}
