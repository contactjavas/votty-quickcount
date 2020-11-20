import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputTpsPageRoutingModule } from './input-tps-routing.module';

import { InputTpsPage } from './input-tps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputTpsPageRoutingModule
  ],
  declarations: [InputTpsPage]
})
export class InputTpsPageModule {}
