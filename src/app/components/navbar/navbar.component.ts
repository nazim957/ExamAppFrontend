import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLockedIn=false;
  user=null;

  constructor(public login:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.isLockedIn=this.login.isLockedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLockedIn=this.login.isLockedIn();
    this.user=this.login.getUser();
    })

  }

    public logout()
    {
      this.login.logout();
       window.location.reload();
     // this.router.navigateByUrl("/login")
     // this.login.loginStatusSubject.next(false);
    }
  

}
