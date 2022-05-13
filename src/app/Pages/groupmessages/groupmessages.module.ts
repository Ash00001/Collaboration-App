import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupmessagesPageRoutingModule } from './groupmessages-routing.module';

import { GroupmessagesPage } from './groupmessages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupmessagesPageRoutingModule
  ],
  declarations: [GroupmessagesPage]
})
export class GroupmessagesPageModule {}
