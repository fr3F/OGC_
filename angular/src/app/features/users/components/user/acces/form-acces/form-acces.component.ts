import { MenuService } from 'src/app/features/users/acces/menu.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PagetitleComponent } from 'src/app/shared/ui/pagetitle/pagetitle.component';
import { UserService } from 'src/app/core/services/user.service';

interface Fonctionnalite {
  id: number;
  nom: string;
  checked?: boolean;
}

interface Module {
  id: number;
  nom: string;
  fonctionnalites: Fonctionnalite[];
}

interface MenuItem {
  id: number;
  label: string;
  checked: boolean;
  moduleId: number;
  subItems: MenuItem[];
}

@Component({
  selector: 'app-form-acces',
  templateUrl: './form-acces.component.html',
  styleUrls: ['./form-acces.component.scss'],
  standalone:true,
  imports:[
    PagetitleComponent,
    CommonModule,
    FormsModule,
  ],
})

export class FormAccesComponent implements OnInit {

  roles = [];
  menus = [];
  roleId = 0;

  modules: Module[] = [];

  moduleSelectedId: number = 0; // Pour le filtre module
  menuStructure: any[] = [];

  constructor(
    private userServ: UserService,
    private notif: NotificationService,
    private menuServ: MenuService
  ) { }

  ngOnInit(): void {
    this.getMenuStructure();
  }

  onError = (err) => {
    this.notif.error(err.message);
  }

  getMenuStructure() {
    this.menuServ.getAllMenuStructure().subscribe({
      next: (resp: any[]) => {
        console.log('Menu structure API:', resp);  
        this.menuStructure = resp;
        this.menus = this.transformStructureToMenus(resp);
        this.initializeRoles();
      },
      error: this.onError
    });
  }

  getFilteredMenus(): MenuItem[] {
      if (this.moduleSelectedId === 0) return this.menus;
      const filtered = this.menus.filter(menu => menu.moduleId === this.moduleSelectedId);
      return filtered;
    }


  initializeRoles() {
    const onSuccess = (resp) => {
      this.roles = resp;
      this.roleId = this.roles[0]?.id || 0;
      this.initializeMenuRole();
      this.getAllModule();
    };
    this.userServ.getRoles().subscribe(onSuccess, this.onError);
  }

  changeRole(event: any) {
    this.roleId = +event.target.value;  // conversion en number
console.log(this.roleId)

    this.initializeMenuRole();
    this.getAllModuleRole();
  }

  initializeMenuRole() {
    this.menuServ.getAllMenuRole(this.roleId).subscribe({
      next: (menuRole) => {
        this.initializeChecked(menuRole, this.menus);
      },
      error: this.onError
    });
  }

  initializeChecked(menuRole, menu) {
    for (let i = 0; i < menu.length; i++) {
      let test = 0;
      if (menu[i].subItems) {
        this.initializeChecked(menuRole, menu[i].subItems);
      }
      for (let j = 0; j < menuRole.length; j++) {
        if (menu[i].id == menuRole[j].id) {
          menu[i].checked = true;
          test++;
          break;
        }
      }
      if (test == 0) menu[i].checked = false;
    }
  }


  changeCheck(menu: MenuItem, ind: number[]) {
    menu.checked = !menu.checked;
    this.changeCheckSubItems(menu.checked, menu.subItems);
    if (ind.length >= 1) {
      this.checkParent(this.menus[ind[0]], menu.checked);
    }
    if (ind.length >= 2) {
      this.checkParent(this.menus[ind[0]].subItems[ind[1]], menu.checked);
    }
  }


  getGroupedMenusByModule(): { module: Module, menus: MenuItem[] }[] {
    return this.modules.map(module => {
      const menus = this.getFilteredMenus().filter(menu => menu.moduleId === module.id);
      return { module, menus };
    }).filter(group => group.menus.length > 0);
  }

  checkParent(parent, checked) {
    if (checked) parent.checked = true;
    else {
      let nbChecked = parent.subItems.filter(s => s.checked).length;
      if (nbChecked === 0) parent.checked = false;
    }
  }

  changeCheckSubItems(checked, subItems){

    for(let i = 0; i < subItems.length; i++){
      subItems[i].checked = checked;
      this.changeCheckSubItems(checked, subItems[i].subItems);
    }
  }
  valider(){
      const onSuccess = (resp) => {
      this.notif.success("Enregistré avec succès");
      setTimeout(() =>{
        window.location.reload();
      }, 1000)
    };
    this.menuServ.updateAcces(this.roleId, this.menus, this.modules)
      .subscribe(onSuccess, this.onError);
  }

  getAllModule(){
    const onSuccess = (resp) => {
      this.modules = resp;
      this.getAllModuleRole();
    };
    this.menuServ.getAllModuleAvecFonctionnalite().subscribe(onSuccess, this.onError);
  }

  getAllModuleRole(){
    const onSuccess = (resp) => {
      this.initializeCheckedFonctionnalites(resp);
    };
    this.menuServ.getFonctionnaliteRole(this.roleId).subscribe(onSuccess, this.onError);
  }


  initializeCheckedFonctionnalites(fonctionnalites){
    for(let i = 0; i < this.modules.length; i++){
      for(let j = 0; j < this.modules[i].fonctionnalites.length; j ++){
        let test = 0;
        for(let k = 0; k < fonctionnalites.length; k++){
          if(fonctionnalites[k].fonctionnaliteId == this.modules[i].fonctionnalites[j].id){
            this.modules[i].fonctionnalites[j].checked = true;
            test++;
            break;
          }
        }
        if(test == 0)
          this.modules[i].fonctionnalites[j].checked = false;
      }
    }
  }

  changeCheckFonctionnalite(f) {
    f.checked = !f.checked;
  }

  transformStructureToMenus(structure: any[]): MenuItem[] {
  const allMenus: MenuItem[] = [];
  let idCounter = 1;

  for (const mod of structure) {
    const moduleId = mod.id;
    for (const label of mod.menus || []) {
      const menuItem: MenuItem = {
        id: idCounter++,
        label,
        checked: false,
        moduleId,
        subItems: []  // on ignore subItems
      };
      allMenus.push(menuItem);
    }
  }
  return allMenus;
}


  // Ajoute cette méthode pour changer la sélection de module via clic à gauche
  selectModule(mod: Module) {
    this.moduleSelectedId = mod.id;
    console.log('Module sélectionné via clic:', this.moduleSelectedId);
  }

  // Pour vider la sélection et revenir à "Tous les modules"
  // Renvoie les menus pour un module donné
  getMenusByModule(moduleId: number): MenuItem[] {
    return this.menus.filter(menu => menu.moduleId === moduleId);
  }

  // Renvoie les fonctionnalités pour un module donné
  getFonctionnalitesByModule(moduleId: number): Fonctionnalite[] {
    const mod = this.modules.find(m => m.id === moduleId);
    return mod ? mod.fonctionnalites : [];
  }

}
