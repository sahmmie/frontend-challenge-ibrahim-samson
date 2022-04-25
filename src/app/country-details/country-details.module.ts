import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetailsComponent } from './country-details.component';
import { CountryDetailsRoutingModule } from './country-details-routing.module';
import { CustomPipeModule } from '../custom-pipe/custom-pipe.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CountryDetailsComponent],
  imports: [
    CommonModule,
    CountryDetailsRoutingModule,
    CustomPipeModule,
    SharedModule,
  ],
})
export class CountryDetailsModule {}
