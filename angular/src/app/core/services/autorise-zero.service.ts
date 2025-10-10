import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseService } from '../base/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class AutoriseZeroService extends BaseService{
  nomModele: string = "autorise-zeros";

  private reloadChildDataSubject = new Subject<void>();

  reloadChildData$ = this.reloadChildDataSubject.asObservable();

  triggerReloadChildData(): void {
    this.reloadChildDataSubject.next();
  }
}



 