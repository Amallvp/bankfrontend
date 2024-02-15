import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import jspdf from 'jspdf';
import 'jspdf-autotable'

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent implements OnInit{

  acno:any
  transactions:any=[]
date:any

searchKey:any=""

  constructor(private ds:DataService, private rout:Router) {

    
  }
  ngOnInit():void{

    // date showing
this.date= new Date()

    // acno for the statement

    if(localStorage.getItem("currentacno")){
      this.acno=localStorage.getItem("currentacno")
      
    }
    console.log(this.acno);
    
    this.ds.transactionHistory(this.acno).subscribe((result:any)=>{
      this.transactions=result
      console.log(this.transactions);
      
    })

  }

  searchKeyChange(key:any){
    this.searchKey=key
  }
  
backHome(){
  this.rout.navigateByUrl("home") 
}
convertpdf(){

  // create an object for jsPDF
  
  var pdf=new jspdf ()

  //set columns title
  let col=["Transaction Type","Amount","Account Holder Name","Date"]

  // row
  let row:any=[]

  // style setting 
   pdf.setFontSize(16)

  // Title 
  pdf.text("Account Statement",15,10)

  // text colour
  pdf.setTextColor(99)


  // size resetting for the datas in pdf
  pdf.setFontSize(12)

  //array of objects convert to array of array (Nested array)

  var allItems=this.transactions
  for(let i of allItems){
    let rowData=[i.type,i.amount,i.user,i.datetime]
    row.push(rowData)
  }

  // nested array convert to pdf
  (pdf as any).autoTable(col,row,{startY:15})

  // open pdf into  a new window 
  pdf.output('dataurlnewwindow')

  // to save & download the pdf file 

pdf.save('ministatement.pdf')
}
}
