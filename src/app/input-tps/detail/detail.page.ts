import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AlertController, LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { TpsService } from "../../services/tps/tps.service";
import { Tps } from "../../interfaces/tps";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  user: any;
  token: string = '';
  calegs: object[];
  createTps = {
    kecamatan: {
      id: 0,
      name: ''
    },
    kelurahan: {
      id: 0,
      name: ''
    },
    dukuh: '',
    rw: '',
    tps: 0
  };

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    private storage: Storage,
    private tpsService: TpsService
  ) {
  }

  ngOnInit() {
    this.prepareData();
  }

  ionViewWillEnter() {
  }

  async prepareData() {
    Promise.all([
      this.storage.get("token"),
      this.storage.get("user"),
      this.storage.get("calegs"),
      this.storage.get("create_tps")
    ]).then(values => {
      this.token = values[0];
      this.user = values[1];
      this.calegs = values[2];
      this.createTps = values[3];
    });
  }

  async save() {
    const fields = document.querySelectorAll('.votes-input input');
    let fieldsData: any = {};

    [].slice.call(fields).forEach((field: any) => {
      fieldsData[field.name] = field.value;
    });

    fieldsData.area = this.createTps;
    fieldsData.user_id = this.user.ID;

    const loading = await this.loadingController.create({
      message: "Saving..."
    });

    await loading.present();

    await this.tpsService.submitVotes(this.token, fieldsData).subscribe(
      res => {
        loading.dismiss();
        this.showSuccessMessage(res);
      },
      err => {
        loading.dismiss();
        this.showErrorMessage(err);
      }
    );
  }

  async showErrorMessage(error) {
    const alert = await this.alertController.create({
      header: "Gagal",
      message: error.message ? error.message : error,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async showSuccessMessage(res) {
    const alert = await this.alertController.create({
      header: "Berhasil",
      message: res.message ? res.message : res,
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.router.navigateByUrl("/app/tabs/history");
          }
        }
      ]
    });

    await alert.present();
  }

}
