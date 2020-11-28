import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertController, LoadingController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { AuthService } from "../services/auth/auth.service";
import { User } from "../interfaces/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  user: User;
  loginForm: FormGroup;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    private formBuilder: FormBuilder,
    private storage: Storage,
    public authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  async login() {
    console.log(this.loginForm.value);
    
    this.loginService('login', this.loginForm.value);
  }

  async loginService(method: string, data: string | object) {
    const loading = await this.loadingController.create({
      message: "Checking..."
    });

    await loading.present();

    await this.authService[method](data).subscribe(
      (res: any) => {
        this.storage.set("token", res.token);
        this.storage.set("user", res.user);

        loading.dismiss();
        this.authService.setLoggedInState(true);
        this.router.navigateByUrl("/app/tabs/input-tps");
      },
      (err: any) => {
        loading.dismiss();
        this.showErrorMessage(err);
      }
    );
  }

  async showErrorMessage(error: any) {
    const alert = await this.alertController.create({
      header: "Gagal",
      subHeader: error.label ? "Kesalahan di input " + error.label : "",
      message: error.message ? error.message : error,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
