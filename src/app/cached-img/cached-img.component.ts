import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, input } from '@angular/core';
import { getCachedImage } from './cached-store';

@Component({
  selector: 'app-cached-img',
  templateUrl: './cached-img.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true

})
export class CachedImgComponent {
  _src: string | undefined;
  src = input<string>();

  constructor(private _change: ChangeDetectorRef) {
    effect(async () => {
      const src = this.src();
      if (src) {
        this._src = await getCachedImage(src);
        this._change.markForCheck();
      }
    });
  }

  ready() {
    this._change.markForCheck();
  }




}
