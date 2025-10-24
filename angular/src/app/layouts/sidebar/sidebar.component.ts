import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, inject } from '@angular/core';
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
  imports: [SimplebarAngularModule, RouterModule, CommonModule, TranslateModule]
})
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef;
  @Input() isCondensed = false;
  menu: any;
  data: any;

  menuItems: MenuItem[] = [];

  @ViewChild('sideMenu') sideMenu: ElementRef;
  private collaborateurService = inject(CollaborateurService);
  private notificationService = inject(NotificationService);
  private userStorageService = inject(UserStorageService);

  userRole 
  constructor(
    private eventService: EventService,
    private router: Router,
    public translate: TranslateService,
    private http: HttpClient
  ) {
    // Réactive le menu à chaque navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });
  }

  // ngOnInit() {
  //   this.initialize();
  //   this._scrollElement();
  // }

  ngOnInit() {
  this.getUserRoleAndInitializeMenu();
  this._scrollElement();
  console.log("userRole", this.userRole);
  
}

  getUserRoleAndInitializeMenu() {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return;

    let username: string;
    try {
      const parsed = JSON.parse(storedUser);
      username = parsed.username ?? parsed;
    } catch {
      username = storedUser;
    }

    this.loadUserData(username)
  }

  
  loadUserData(username: string) {
    this.collaborateurService.getByLogin(username).subscribe({
      next: (collab: Collaborateur & { compte?: { type: string } }) => {
        console.log("collab", collab);
        
        if (!collab) return;

        // Utiliser le service pour sauvegarder
        this.userStorageService.saveUserData({
          id: collab.id!,
          username: username,
          nom: collab.nom_collab,
          prenom: collab.prenom_collab,
          email: collab.email_collab,
          matricule: collab.matricule_collab,
          type: collab.compte?.type || 'collaborateur',
          id_manager: collab.id_manager ? Number(collab.id_manager) : null 

        });

        this.userRole = collab.compte?.type;
        this.menuItems = this.filterMenuByRole(MENU, this.userRole);
      },
      error: (err) => this.notificationService.error(err),
    });
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    this._activateMenuDropdown();
  }

  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }

  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500)
          if (this.scrollRef.SimpleBar !== null)
            this.scrollRef.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
      }
    }, 300);
  }

  _removeAllClass(className: string) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Active le menu selon l’URL
   */
  _activateMenuDropdown() {
    this._removeAllClass('active');
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');

    const links = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl: HTMLElement | null = null;

    // Utilisation de Angular Router au lieu de window.location
    const currentUrl = this.router.url;

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
        if (parentEl.tagName === 'LI') {
          parentEl.classList.add('mm-active');
        }
        if (parentEl.tagName === 'UL') {
          parentEl.classList.add('mm-show');
        }
        parentEl = parentEl.parentElement;
      }
    }
  }

  // initialize(): void {
  //   this.menuItems = MENU;
  // }

// ici utiliser le droit accés
  initialize(): void {
  this.menuItems = this.filterMenuByRole(MENU, this.userRole);
}

/**
 * Filtre récursivement le menu selon le rôle
 */
filterMenuByRole(items: MenuItem[], role: string): MenuItem[] {
  return items
    .filter(item => !item.roles || item.roles.includes(role))
    .map(item => ({
      ...item,
      subItems: item.subItems ? this.filterMenuByRole(item.subItems, role) : []
    }));
}

  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
}
