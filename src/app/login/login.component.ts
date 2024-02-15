import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // serviceData:any=""

  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    pswrd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
  
  })

  constructor(private rout:Router,private ds:DataService,private fb:FormBuilder){}

    
  ngOnInit(): void {
    
  }

  

login(){
  
// this.ds.accessData("helo")
//   console.log(this.acno);
//   console.log(this.pswrd);

  var acno=this.loginForm.value.acno
  var pswrd=this.loginForm.value.pswrd
if(this.loginForm.valid){ 

  //api call
  this.ds.loginApi(acno,pswrd).subscribe((response:any)=>{

    alert(`${response.uname} login success`)
    
    // store uname , acno in local storage
    localStorage.setItem("currentUname",response.uname)
    localStorage.setItem("currentacno",response.acno)
    localStorage.setItem("token",JSON.stringify(response.token))
    this.rout.navigateByUrl("home")
    console.log(response.token);
    
  },
  response=>{
    alert(response.error)
  }
  
  )
  
}

  
}



}
 