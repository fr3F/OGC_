import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  private sanitizer = inject(DomSanitizer);
  transform(url) :SafeHtml  {
    // console.log(url);
    // console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url));
   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
