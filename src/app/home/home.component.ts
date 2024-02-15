import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: any = ""
  acno:any
  profileData: any = {}
  balanceData: any = {}
  message: any
  status: any = true
  shareAcno: any = ""
  

  // model form for money transfer
  moneyTransferForm = this.fb.group({

    toacno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    pswrd: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })
  constructor(private rout: Router, private ds: DataService, private fb: FormBuilder,private datePipe: DatePipe) {


  }

  ngOnInit(): void {

     //nammal logout cheythtt browser back button adichal home pagilott verand erikkan
    if (!localStorage.getItem("currentacno")) {
      alert("please login first")
      this.rout.navigateByUrl("")
    }

    if (localStorage.getItem("currentUname")) {
      this.user = localStorage.getItem("currentUname")
      console.log(this.user);

    }
  }

  logout() {

    localStorage.removeItem("currentacno")
    localStorage.removeItem("currentUname")
    this.rout.navigateByUrl("")

  }

  statement() {
    this.rout.navigateByUrl("statement")
  }

  // profile viewing 
  profileView() {
    if (localStorage.getItem("currentacno")) {
      this.acno = localStorage.getItem("currentacno")
      console.log(this.acno);
    }
    this.ds.getProfile(this.acno).subscribe((response: any) => {
      console.log(response);
      this.profileData = response
    })
  }


  Balanceview() {
    if (localStorage.getItem("currentacno")) {
      this.acno = localStorage.getItem("currentacno")
      console.log(this.acno);
    }
    this.ds.getBalance(this.acno).subscribe((response: any) => {
      console.log(response);
      this.balanceData = response
    })
  }

  deleteAcc() {
    localStorage.getItem('currentacno')
    this.shareAcno = localStorage.getItem('currentacno')
    console.log(this.shareAcno);

  }

  Transfer() {
    if (this.moneyTransferForm.valid) {
      //we need to get the account number from local storage
      //ee account number aaakum "fromAcno"
      if (localStorage.getItem("currentacno")) {
        this.acno = localStorage.getItem("currentacno")
        console.log(this.acno);
      }
      //we ned to get other values from the form

      let path = this.moneyTransferForm.value;
      //toacno
      let toacno = path.toacno;
      // console.log(toAcno);

      //psw
      let psw = path.pswrd;
      //   console.log(psw);

      //amount
      let amount = path.amount;
      // console.log(amount);

      //date
      //angular pipe:used to convert data format into anither formats
      let date = new Date();

      let dateData = this.datePipe.transform(date,'short');
      //   console.log(dateData);
      //api
      this.ds.moneytransferapi(this.acno, toacno, psw, amount, dateData).subscribe((result: any) => {
            this.message = result.message;
            this.status = true;

            console.log(result);
            
          },
          (result: any) => {
            this.message = result.error.message;
            this.status = false;
          }
        );
    } else {
      // alert('invaid form data');
      this.message = 'invaid form data';
      this.status = false;
    }
  }




  cancel() {
    this.shareAcno = ""
  }
  deleteAccount(event: any) {
    console.log(event);
    this.ds.acDelete(event).subscribe((result: any) => {
      alert(`${event}Account successfully deleted`)
      this.logout()
    })
  }
}

