import { Component, Input } from '@angular/core';
import { Loader } from 'src/app/core/models/loader';

@Component({
  selector: 'app-shimmer',
  templateUrl: './shimmer.component.html',
})
export class ShimmerComponent {
  @Input() loaderType: Loader;

  // Used to loop through the shimmer for a number of times
  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
