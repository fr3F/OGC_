import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NotificationService } from '../../services/notification.service';
import { BaseService } from '../base/base.service';
import { loadDelete } from '../../../store/base/base-delete/base-delete-page.actions';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent implements OnInit {
  actions = ["modifier", "ajouter", "supprimer"]

  public store = inject(Store);
  public modalService = inject(NgbModal);
  public notif = inject(NotificationService);
  public baseService = inject(BaseService)
  nombreDuplicate =  1;

  @Input() fonctionnalites;
  @Input() isVisible;
  @Input() acces;
  tabAfficherAction = [];

  @Output() onChangeItem = new EventEmitter();
  @Input() page;
  @Input() pageSize;
  @Input() count;
  @Input() list;
  @Input() loading;
  plusFiltre = false;

  ngOnInit(): void {
  }

  masquerAction(){
    let rep = true;
    for(let i = 0; i < this.tabAfficherAction.length; i++){
      rep = rep && !this.isVisible(this.tabAfficherAction[i]);
    }
    return rep;
  }

  showAction(){
    for(const action of this.actions){
      if(this.acces[action])
        return true;
    }
    return false;
  }

  changeItem(){
    this.onChangeItem.emit();
  }
  
  delete(nomModele, index){
    this.store.dispatch(loadDelete({nomModele, id:this.list[index].id}))
  }

  deleteSimple(nomModele, id){
    console.log("nomModele", nomModele, "id", id);
    
    this.store.dispatch(loadDelete({nomModele, id}))
  }

}