import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    email:'',
    password:'',
  };

  constructor(private snack:MatSnackBar, private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit()
  {
    console.log("login click");
    if(this.loginData.email.trim()=='' || this.loginData.email==null)
    {
        this.snack.open('User Name is Required !! ', '' ,{
          duration: 3000,
        } );
        return
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
        this.snack.open('Password is Required !! ', '' ,{
          duration: 3000,
        } );
        return
  }

  //request server to generate token
  this.login.generateToken(this.loginData).subscribe(
    (data:any)=>{
      console.log("success")
      console.log(data)
      console.log(data.token);
      

      //login
      this.login.loginUser(data.token)
      this.login.getCurrentUser().subscribe(
        (user:any)=>{
          this.login.setUser(user)
          console.log(user)
          console.log("CHECKING ROLE",this.login.getUserRole());
          

          //redirect .... ADMIN: admin dashboard
          //redirect .... USER user dashboard
          if(this.login.getUserRole()=='ADMIN')
          {
            //admin dashboard
            // window.location.href='/admin'
            this.router.navigate(['admin'])
            this.login.loginStatusSubject.next(true)
          }
          else if(this.login.getUserRole()=='NORMAL')
          {
            //user dashboard
            // window.location.href='/user-dashboard'
            this.router.navigate(['user-dashboard/0'])
            this.login.loginStatusSubject.next(true)
          }
          else{
            this.login.logout();
             
          }
        }
      )

    },
    (error)=>{
      console.log("Error")
      console.log(error)
      this.snack.open("Invalid Details !! Try Again" , "",{
        duration:3000,
      });
    });
  

}

}
