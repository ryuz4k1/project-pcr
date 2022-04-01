import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';

import { ListRoutingModule } from './list-routing.module';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    ListComponent,
    ProgressBarComponent
  ],
  imports: [
    ListRoutingModule,
    CommonModule,
    NzTableModule
  ]
})
export class ListModule {}
