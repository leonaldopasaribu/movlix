import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from '../containers/home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule],
})
export class HomeModule {}
