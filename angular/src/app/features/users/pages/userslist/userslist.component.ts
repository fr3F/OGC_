import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { MenuService } from '../../acces/menu.service';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../../components/user/list/list.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { selectError } from 'src/app/store/menu/menu.selectors';
import { BaseComponentComponent } from 'src/app/core/base/base-component/base-component.component';
import { User } from 'src/app/store/Authentication/auth.models';
import { Acces } from 'src/app/core/models/acces.model';
import { fetchlistUser } from 'src/app/store/user/user.action';
import { selectLoading, selectTotalItems, selectUserList } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss'],
  standalone: true,
  imports: [
    PagetitleComponent,
    FormsModule,
    CommonModule,
    ListComponent
  ]
})
export class UserslistComponent extends BaseComponentComponent implements OnInit, OnDestroy {
  title = "Utilisateurs";
  idFonctionnalite: number = 3;
  idModule: number = 3;

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 25, 50, 100];
  users: User[] = [];
  motSearch = "";

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  tabFonctionnalite: Acces[] = [
    { idFonctionnalite: 3, nom: "ajouter" },
    { idFonctionnalite: 2, nom: "modifier" },
    { idFonctionnalite: 4, nom: "activer" },
    { idFonctionnalite: 6, nom: "modifierMdp" },
    { idFonctionnalite: 7, nom: "reinitialiserMdp" },
  ];

  constructor(
    public serv: MenuService,
  ) {
    super();
    this.fonctionnalites = this.fonctionnalites || {};
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initializeFonctionnalite();
    this.subscribeToStore();
    this.setupSearchDebounce();
    this.refreshUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchDebounce(): void {
    this.searchSubject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.search();
      });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.motSearch);
  }

  search(): void {
    this.page = 1;
    this.refreshUsers();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.refreshUsers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshUsers();
  }

  private getParamSearch() {
    return {
      search: this.motSearch,
      page: this.page - 1,
      size: this.pageSize
    };
  }

  refreshUsers(): void {
    this.store.dispatch(fetchlistUser(this.getParamSearch()));
  }

  private subscribeToStore(): void {
    this.store.select(selectUserList).subscribe(users => {
      this.users = users;
    });
    this.store.select(selectTotalItems).subscribe(totalItems => {
      this.count = totalItems;
    });
    this.store.select(selectError).subscribe(error => {
      if (error) {
        this.notif.error(error);
      }
    });
    this.store.select(selectLoading).subscribe(loading => {
      // Gérer l'état de chargement
    });
  }

  navigateToUserAdd(): void {
    this.router.navigate(['/user/user-add']);
  }
}
