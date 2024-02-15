import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  pswrdMatch:boolean=false

//model for signup form 

signUpModelForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
  pswrd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]],
  cpswrd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
})

  constructor(private rout:Router,private fb:FormBuilder, private ds:DataService){}

  signup(){

    var path=this.signUpModelForm.value
    var acno=path.acno
    var uname=path.uname
    var pswrd=path.pswrd
    var cpswrd=path.cpswrd
   if(this.signUpModelForm.valid){ 
    if(pswrd==cpswrd){
this.pswrdMatch=false

// api call  // validation 
this.ds.signupApi(acno,uname,pswrd).subscribe((response:any)=>{
  console.log(response);
  alert(`${response.uname} registered successfully..`)
  this.rout.navigateByUrl("")
},
response=>{
  alert(response.error)

}
)

    }else{

    this.pswrdMatch=true
    }
  }else{
    alert("Invalid Form")
  }
  
  }


}


  