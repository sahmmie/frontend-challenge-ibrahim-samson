import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformNumber } from './numberFomartter';

@NgModule({
  declarations: [TransformNumber],
  imports: [CommonModule],
  exports: [TransformNumber],
})
export class CustomPipeModule {}
