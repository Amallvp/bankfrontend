import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



// overloading headers

const options={
  headers:new HttpHeaders()
}



@Injectable({
  providedIn: 'root'
})
//  sdata give data will be exported & will be visible in frontend 
//   sData="Data service file available"
//   accessData(data:any){
//     console.log(data);
//   }
// all the above datas must be included in dataservices




export class DataService {

  constructor(private http: HttpClient) { }

  //method to append/add token in header
  createHeader() {

    //HttpHeaders ( need to give headers every time)

    const headers = new HttpHeaders()

    // access token from localstorage
    if (localStorage.getItem("token")) {
      var token = JSON.parse(localStorage.getItem("token") || "")

      // add token into header
     options.headers=headers.append('access_token', token)
    }
    return options
  }

  // register API creation

  signupApi(acno: any, uname: any, pswrd: any) {

    const bodyData = {
      acno,
      uname,
      pswrd
    }

    return this.http.post('http://localhost:3006/bankuser/user-register', bodyData)
  }

  // Login API creation

  loginApi(acno: any, pswrd: any) {

    const bodyData = {
      acno, pswrd

    }
    return this.http.post('http://localhost:3006/bankuser/user-login', bodyData)
  }

  // get userProfile details

  getProfile(acno: any) {
    return this.http.get('http://localhost:3006/bankuser/user-profile/' + acno,this.createHeader())
  }

  // balance enquiry API
  getBalance(acno: any) {
    return this.http.get('http://localhost:3006/bankuser/user-balance/' + acno,this.createHeader())
  }

  // money transfer
  // from Acno , toAcno,from Acno pswrd , amount ,date&time
  // money tranfer API 
  moneytransferapi(fromacno: any, toacno: any, pswrd: any, amount: any, datetime: any) {
    const bodyData = {
      fromacno, toacno, pswrd, amount, datetime
    }
    return this.http.post('http://localhost:3006/bankuser/user-moneytransfer', bodyData,this.createHeader())
  }

  // transaction history api
  transactionHistory(acno: any) {
    return this.http.get('http://localhost:3006/bankuser/user-statement/' + acno,this.createHeader())
  }

  // Delete account api
  acDelete(acno: any) {
    return this.http.delete('http://localhost:3006/bankuser/user-delete/' + acno,this.createHeader())
  }


}


























