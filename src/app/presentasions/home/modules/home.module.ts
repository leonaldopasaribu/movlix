import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from '../containers/home/home.component';

import { HeaderModule } from 'src/app/shared/components/header';

import { CardListModule } from 'src/app/shared/components/card-list';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, HeaderModule, CardListModule],
})
export class HomeModule {}
