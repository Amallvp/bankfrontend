import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  data="Happy banking with us..."
  pdate="Enter account no"
acno:any=" "

login(){
  alert("Login Clicked")
}

acnoChange(event:any){
  this.acno=event.target.value
  console.log(this.acno)
}

pswrdChange(event:any){
  console.log(event.target.value)
}
}
 