import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BaseComponentComponent } from '../base-component/base-component.component';
import { 
  selectError, 
  selectListByNomModele, 
  selectLoadingByNomModele, 
  selectTotalItemsByNomModele
} from 'src/app/store/base/base-liste/base-list-page.selectors';
import { loadList } from 'src/app/store/base/base-liste/base-list-page.actions';
import { AutoriseZeroService } from '../../services/autorise-zero.service';

@Component({
  selector: 'app-base-list-page',
  templateUrl: './base-list-page.component.html',
  styleUrls: ['./base-list-page.component.scss']
})
export class BaseListPageComponent extends BaseComponentComponent implements OnInit, OnDestroy {
  // Inputs
  @Input() titre!: string;
  @Input() idParent?: any;
  @Input() component = false;

  // Search & pagination
  paramSearchs: string[] = [];
  nePasEffacer: string[] = [];
  typeParamSearchs: string[] = [];
  attributeSearchsName: string[] = [];
  motSearch = "";
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 25, 50, 100];
  nomParent?: string;
  nomModele!: string;
  plusFiltre = false;
  status?: number = 0;

  idModule = 3;
  user: any;

  // NgRx
  list$;
  loading$;
  count$;
  error$;
  store = inject(Store);

  reloadSubscription!: Subscription;
  autoriseZeroService = inject(AutoriseZeroService);

  ngOnInit(): void {
    super.ngOnInit();

    this.user = this.baseServ.getCurrentUser();
    this.fonctionnalites = {};
    this.initializeFonctionnalite();

    // Sélecteurs NgRx
    this.list$ = this.store.select(selectListByNomModele(this.nomModele));
    this.loading$ = this.store.select(selectLoadingByNomModele(this.nomModele));
    this.count$ = this.store.select(selectTotalItemsByNomModele(this.nomModele));
    this.error$ = this.store.select(selectError);

    this.refreshData();
    this.listenReloadFlag();
  }

  ngOnDestroy(): void {
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }

  listenReloadFlag(): void {
    this.reloadSubscription = this.autoriseZeroService.reloadChildData$.subscribe(() => {
      this.refreshData();
    });
  }

  refreshData(): void {
    const params = this.getParamSearch();
    this.store.dispatch(loadList({ nomModele: this.nomModele, params, status: this.status }));
  }

  setMotAndSearch(mot: string): void {
    this.motSearch = mot;
    this.search();
  }

  search(): void {
    this.page = 1;
    this.refreshData();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.refreshData();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData();
  }

  // getParamSearch(): any {
  //   const param: any = {
  //     search: this.motSearch,
  //     page: this.page <= 0 ? 0 : this.page - 1,
  //     size: this.pageSize
  //   };

  //   // Paramètres dynamiques sécurisés
  //   for (const p of this.paramSearchs) {
  //     // on vérifie que la propriété existe sur `this` avant d'ajouter
  //     if (this.hasOwnProperty(p) && this[p] != null) {
  //       param[p] = this[p];
  //     }
  //   }

  //   // idParent si nécessaire
  //   if (this.idParent && this.nomParent) {
  //     param[this.nomParent] = this.idParent;
  //   }

  //   return param;
  // }


  getParamSearch() : any{
    let param = {};
    param["search"] = this.motSearch;
    param["page"] = this.page<=0? 0: this.page - 1;
    param["size"] = this.pageSize;
    for(let p of this.paramSearchs)
      param[p] = this[p];
    // console.log(param)
    if(this.idParent)
      param[this.nomParent] = this.idParent
    return param;
  }

}
