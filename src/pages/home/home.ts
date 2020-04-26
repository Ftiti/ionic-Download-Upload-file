import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {FileUploader} from 'ng2-file-upload';
import { saveAs } from 'file-saver';

const uri = 'http://localhost:8080/api/items';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any;
  file:any =null;
  uploader = new FileUploader({
		url: uri,
		maxFileSize: 1024 * 1024 * 1,
	});
  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public api: ApiProvider
    ) {
      this.getItems();
      let loadingPopup = this.loadingCtrl.create({});
       this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
		  }
		  this.uploader.onCompleteItem =  (item:any, response:any, status:any, headers:any) => {
      loadingPopup.present();
		  };
	  
		  this.uploader.onCompleteAll = () => {
        loadingPopup.dismiss();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
		  }
	  
		  this.uploader.onWhenAddingFileFailed = (item: any, filter: any, options: any) => {
		  }
  }

  getItems() {
    this.api.getItems()
    .then(data => {
      this.items = data["items"];
    });

  }

  downloadFile(id : any,fileName :string){
    this.api.downloadFile(id)
    .then(data => {
      saveAs(data, fileName)
    }); 
   }

}
