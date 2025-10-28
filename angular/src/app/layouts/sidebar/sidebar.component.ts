import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  inject,
} from '@angular/core';
import MetisMenu from 'metismenujs';
import { EventService } from '../../core/services/event.service';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CommonModule } from '@angular/common';
import { Collaborateur } from 'src/app/features/rh/collaborateurs/models/collaborateur.model';
import { CollaborateurService } from 'src/app/features/rh/collaborateurs/service/collaborateur.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UserStorageService } from 'src/app/core/services/UserStorageService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [SimplebarAngularModule, RouterModule, CommonModule, TranslateModule],
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef;
  @Input() isCondensed = false;
  menu: any;
  menuItems: MenuItem[] = [];

  @ViewChild('sideMenu') sideMenu: ElementRef;

  private collaborateurService = inject(CollaborateurService);
  private notificationService = inject(NotificationService);
  private userStorageService = inject(UserStorageService);

  constructor(
    private eventService: EventService,
    private router: Router,
    public translate: TranslateService,
    private http: HttpClient
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });
  }

  ngOnInit() {
    this.initializeMenu(); // on affiche le menu complet directement
    this._scrollElement();
  }

  /**
   * Initialise le menu complet sans filtrage de rôles
   */
  initializeMenu(): void {
    this.menuItems = MENU; // Aucun filtrage
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.menu = new MetisMenu(this.sideMenu.nativeElement);
      this._activateMenuDropdown();
    }, 0);
  }

  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  ngOnChanges() {
    if ((!this.isCondensed && this.sideMenu) || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  _scrollElement() {
    setTimeout(() => {
      const activeEls = document.getElementsByClassName('mm-active');
      if (activeEls.length > 0) {
        const currentPosition = (activeEls[0] as HTMLElement).offsetTop;
        if (currentPosition > 500 && this.scrollRef?.SimpleBar) {
          this.scrollRef.SimpleBar.getScrollElement().scrollTop =
            currentPosition + 300;
        }
      }
    }, 300);
  }

  _removeAllClass(className: string) {
    const els = document.getElementsByClassName(className);
    while (els[0]) els[0].classList.remove(className);
  }

  /**
   * Active le menu selon l’URL courante
   */
  _activateMenuDropdown() {
    this._removeAllClass('active');
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');

    const links = document.getElementsByClassName('side-nav-link-ref');
    const currentUrl = this.router.url;
    let menuItemEl: HTMLElement | null = null;

    for (let i = 0; i < links.length; i++) {
      const link = links[i] as HTMLAnchorElement;
      if (link.pathname === currentUrl || link.href.includes(currentUrl)) {
        menuItemEl = link;
        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add('active');
      let parentEl = menuItemEl.parentElement;
      while (parentEl && parentEl.id !== 'side-menu') {
        if (parentEl.tagName === 'LI') parentEl.classList.add('mm-active');
        if (parentEl.tagName === 'UL') parentEl.classList.add('mm-show');
        parentEl = parentEl.parentElement;
      }
    }
  }

  hasItems(item: MenuItem) {
    return item.subItems?.length > 0;
  }
}