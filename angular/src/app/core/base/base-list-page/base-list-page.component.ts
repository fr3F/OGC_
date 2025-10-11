import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BaseComponentComponent } from '../base-component/base-component.component';
import { 
  selectError, 
  selectListByNomModele, 
  selectLoadingByNomModele, 
  selectTotalItemsByNomModele, 
   
} from 'src/app/store/base/base-liste/base-list-page.selectors';
import { filterList, loadList } from 'src/app/store/base/base-liste/base-list-page.actions';
import { AutoriseZeroService } from '../../services/autorise-zero.service';

@Component({
  selector: 'app-base-list-page',
  templateUrl: './base-list-page.component.html',
  styleUrls: ['./base-list-page.component.scss']
})
export class BaseListPageComponent extends BaseComponentComponent implements OnInit, OnDestroy {
  // Inputs
  @Input() titre: string;
  @Input() idParent: any;
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
  nomParent: string;
  nomModele: string;
  plusFiltre = false;
  status?: number = 0  

  idModule = 3;
  user: any;

  // NgRx
  list$;
  loading$;
  count$;
  error$;
  public store = inject(Store);

  public reloadSubscription: Subscription;

  public autoriseZeroService =  inject(AutoriseZeroService)

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

  listenReloadFlag(){
    this.autoriseZeroService.reloadChildData$.subscribe(() => {
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

  // getParamSearch(): any {
  //   const param: any = {
  //     search: this.motSearch,
  //     page: this.page <= 0 ? 0 : this.page - 1,
  //     size: this.pageSize
  //   };
  //   for (const p of this.paramSearchs) param[p] = this[p];
  //   if (this.idParent) param[this.nomParent] = this.idParent;
  //   return param;
  // }


  // effacerFiltre(): void {
  //   this.motSearch = "";
  //   for (const p of this.paramSearchs) {
  //     if (!this.nePasEffacer.includes(p)) {
  //       this[p] = "";
  //     }
  //   }
  //   this.search();
  // }

  // setFiltreDate(event: any, nom: string): void {
  //   this[`${nom}Debut`] = event.dateDebut;
  //   this[`${nom}Fin`] = event.dateFin;
  //   this.search();
  // }

  // suppression(event: any): void {
  //   this.refreshData();
  // }

  // importer(file: any): void {
  //   // 👇 Implémenter si besoin
  // }

  // importExcel(event: any): void {
  //   const target = event.target as HTMLInputElement;
  //   if (target.files && target.files.length > 0) {
  //     const file = target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.importer(reader.result);
  //     };
  //   }
  // }

  // updateList(): void {
  //   this.store.dispatch(filterList({ nomModele: this.nomModele, searchTerm: this.motSearch }));
  // }
}
