import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { AreaService } from "../services/area/area.service";

import { User } from "../interfaces/user";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-input-tps',
  templateUrl: './input-tps.page.html',
  styleUrls: ['./input-tps.page.scss'],
})
export class InputTpsPage implements OnInit {
  user: User = {
    ID: 0,
    user_login: '',
    user_email: '',
    first_name: '',
    last_name: '',
    roles: [],
    kabupaten: {
      id: 0,
      name: ''
    }
  };

  token: string;

  calegs: object[] = [];
  kecamatans: any[] = [];
  kelurahans: any[] = [];

  // Selected values.
  kecamatanId: number;
  kelurahanId: number;
  rw: number;
  tps: number;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storage: Storage,
    private authService: AuthService,
    private areaService: AreaService
  ) {
  }

  ngOnInit() {
    this.prepareData();
  }

  prepareData() {
    Promise.all([this.storage.get("token"), this.storage.get("user")]).then(values => {
      this.token = values[0];
      this.user = values[1];

      this.fetchKecamatans(null);
      this.fetchCalegs();
    });
  }

  fetchKecamatans(refresher: any) {
    if (!this.user || !this.user.kabupaten) return;

    this.areaService.getKecamatansByKabupaten(this.token, this.user.kabupaten.id).subscribe(
      res => {
        this.storage.set("kecamatans", res.data);
        this.kecamatans = res.data;

        if (refresher) {
          refresher.target.complete();
        }
      },
      err => {
        console.log(err);

        if (refresher) {
          refresher.target.complete();
        }

        if (err.statusCode == 403) {
          this.authService.logout();
        }
      }
    );
  }

  fetchKelurahans(refresher: any) {
    this.areaService.getKelurahansByKecamatan(this.token, this.kecamatanId).subscribe(
      res => {
        this.storage.set("kelurahans", res.data);
        this.kelurahans = res.data;

        if (refresher) {
          refresher.target.complete();
        }
      },
      err => {
        console.log(err);

        if (refresher) {
          refresher.target.complete();
        }
      }
    );
  }

  fetchCalegs() {
    this.areaService.getCalegs(this.token).subscribe(
      res => {
        this.storage.set("calegs", res.data);
        this.calegs = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onKecamatanChange(e: any) {
    this.kecamatanId = Number(e.detail.value);
    const kecamatan = this.kecamatans.find((kecamatan: any) => {
      return Number(kecamatan.id) === this.kecamatanId;
    });

    this.kelurahans = kecamatan.kelurahans;
  }

  onKelurahanChange(e: any) {
    this.kelurahanId = Number(e.detail.value);
  }

  onRwChange(e: any) {
    this.rw = Number(e.detail.value);
  }

  onTpsChange(e: any) {
    this.tps = Number(e.detail.value);
  }

  createTps() {
    const dukuhElm: any = document.querySelector('[name="dukuh"]');

    if (!this.kecamatanId || !this.kelurahanId || !this.tps) {
      if (!this.kecamatanId) {
        this.showErrorMessage('Nama kecamatan belum dipilih');
      } else if (!this.kelurahanId) {
        this.showErrorMessage('Nama kelurahan belum dipilih');
      } else if (!this.tps) {
        this.showErrorMessage('Nomor TPS belum dipilih');
      }
    } else {
      const kecamatan = this.kecamatans.find((kecamatan: any) => {
        return Number(kecamatan.id) === this.kecamatanId;
      });

      const kelurahan = this.kelurahans.find((kelurahan: any) => {
        return Number(kelurahan.id) === this.kelurahanId;
      });

      const createTps = {
        kecamatan: {
          id: kecamatan.id,
          name: kecamatan.name
        },
        kelurahan: kelurahan,
        dukuh: dukuhElm.value,
        rw: this.rw,
        tps: this.tps
      };

      this.storage.set("create_tps", createTps);
      this.router.navigateByUrl("/input-tps/detail");
    }
  }

  async showErrorMessage(error) {
    const alert = await this.alertController.create({
      header: "Tidak Valid",
      message: error.message ? error.message : error,
      buttons: ["OK"]
    });

    await alert.present();
  }

  doRefresh(event: any) {
    this.fetchKelurahans(event);
    this.fetchCalegs();
  }
}
