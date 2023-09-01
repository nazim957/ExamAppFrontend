import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar,private router:Router) { }

  public user={
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    phone:'',

  };

  ngOnInit(): void {
  }


  formSubmit()
  {
    console.log(this.user);
    if(this.user.email==''|| this.user.email==null)
    {
     // alert('user is reqd')
     this.snack.open('Email is required!! ', '' , {
       duration:3000,
  
     });
      return;
    }

    //validate


    //addUser:userservice
    this.userService.addUser(this.user).subscribe(

      (data:any)=>{
        //success
        console.log(data);
        //alert('success');
        Swal.fire('Successfully done!!','user Id is '+ data.id, 'success');
        this.router.navigateByUrl("/login")
      },
      (error)=>{
        //error
        console.log(error)
        //alert('Something went wrong')
        this.snack.open('Something went wrong!!' ,'',{
          duration:3000
        })
      }
      );
  }

}
