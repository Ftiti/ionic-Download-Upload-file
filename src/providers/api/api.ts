import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import {SERVER_URL} from "../../app/config";
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = SERVER_URL + 'items';

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
  }

  getItems(){
    return new Promise(resolve => {
      this.http.get(apiUrl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
 
}

downloadFile(id : any){
  return new Promise(resolve => {
    let headers = new HttpHeaders();
    this.http.get(apiUrl+'/'+id,{
      responseType : 'blob',
      headers:new HttpHeaders().append('Content-Type','application/json')
  }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}





}
