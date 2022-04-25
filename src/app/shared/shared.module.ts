import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShimmerComponent } from './shimmer/shimmer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [ShimmerComponent, NavbarComponent],
  imports: [CommonModule],
  exports: [ShimmerComponent, NavbarComponent],
})
export class SharedModule {}
