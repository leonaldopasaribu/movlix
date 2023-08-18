import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from '../containers/home/home.component';

import { HeaderModule } from 'src/app/shared/components/header/header.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, HeaderModule],
})
export class HomeModule {}
