import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private login:LoginService)
  {
  }

  public logout()
    {
      this.login.logout();
       window.location.reload();
     // this.router.navigateByUrl("/login")
     // this.login.loginStatusSubject.next(false);
    }
}
