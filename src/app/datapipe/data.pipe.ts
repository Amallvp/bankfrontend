import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datapipe'
})
export class DataPipe implements PipeTransform {

    //inbuild aayitt verunna method aanu data transformation venditt
  //transaction nammale data basill ninnum verunna datas is here its an array
  //searchTeram :eath term vechaano search cheyyunnath(ie DEBIT/CREDIT/"All data")
  //searchType:eath field vechaan search chyunnath(evide "type vchitt serch cheyunath")
  //oru pipe oru fcntion mthrm use aakn patullu

  transform(transactionArray: any[], 
    searchTerm: string,
     searchType: string): any[] {

    //need to create empty array to store the output

    const result: any = []


    //pipe logic

    if (!transactionArray || !searchTerm || !searchType) {
      return transactionArray
    }
    else {
      transactionArray.forEach(item => {
          //oru string akath vere string indo nokaan "includes() use aakunnu"
        //evide nammal data edukaan array aanu use aakunnath .nammauk dot operator vechittum edukaam
        
        if (item[searchType].includes(searchTerm)) {
           //athava item undenkil aa array akathekk item objectine push cheyya
           
          result.push(item)
        }
      })


      //return output array
      return result
    }

  }

}
