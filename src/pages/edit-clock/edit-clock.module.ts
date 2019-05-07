import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditClockPage } from './edit-clock';

@NgModule({
  declarations: [
    EditClockPage,
  ],
  imports: [
    IonicPageModule.forChild(EditClockPage),
  ],
})
export class EditClockPageModule {}
