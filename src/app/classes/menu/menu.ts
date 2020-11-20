import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Menu {
  loggedIn = [
    {
      text: "Input TPS",
      url: "/app/tabs/input-tps",
      icon: "create",
      direction: "root"
    },
    {
      text: "Riwayat",
      url: "/app/tabs/history",
      icon: "time-outline",
      direction: "root"
    },
    {
      text: "Keluar",
      icon: "log-out",
      click: "logout"
    }
  ];

  notLoggedIn = [
    {
      text: "Login",
      url: "/login",
      icon: "log-in",
      direction: "forward"
    }
  ];
}
