import { Component, OnInit } from '@angular/core';

import { Storage } from "@ionic/storage";

import { TpsService } from "../services/tps/tps.service";

import { User } from "../interfaces/user";

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
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
  tpsList: object[] = [];

  constructor(
    private storage: Storage,
    private tpsService: TpsService
  ) {
  }

  ngOnInit() {
    this.storage.get("user").then(user => {
      this.user = user;
    });

    this.fetchTps(null);
  }

  fetchTps(refresher: any) {
    this.storage.get("token").then(token => {
      if (!token) return;

      this.tpsService.fetchTps(token, this.user.ID).subscribe(
        res => {
          this.storage.set("tps", res.data);
          this.tpsList = res.data;

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
    });
  }

  doRefresh(event: any) {
    this.fetchTps(event);
  }
}
