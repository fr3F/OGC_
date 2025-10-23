import { Injectable, signal } from '@angular/core';
import { NotificationService } from './notification.service';
import { Collaborateur } from 'src/app/features/rh/collaborateurs/models/collaborateur.model';
import { CollaborateurService } from 'src/app/features/rh/collaborateurs/service/collaborateur.service';


@Injectable({ providedIn: 'root' })
export class UserContextService {
  currentCollaborateur = signal<Collaborateur | null>(null);
  userName = signal(''); 
  managerName = signal('Non défini');
  departementName = signal('Non défini');
  compteType = signal('Non défini');
  nbSoldes = signal(0);
  typeConge = signal('Non défini');

  constructor(
    private collaborateurService: CollaborateurService,
    private notificationService: NotificationService
  ) {}

  loadCurrentCollaborateur(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) return;

    let username;
    try {
      const parsed = JSON.parse(storedUser);
      username = parsed.username ?? parsed;
    } catch {
      username = storedUser;
    }

    this.collaborateurService.getByLogin(username).subscribe({
      next: (collab: Collaborateur & { 
        compte?: { login ; type  }; 
        manager?: { id; nom_manager }; 
        departement?: { id; nom_dep  }; 
        soldes?: any[];
      }) => {
        if (!collab) return;
        this.currentCollaborateur.set(collab);
        this.userName.set(`${collab.nom_collab} ${collab.prenom_collab}`);
        this.managerName.set(collab.manager?.nom_manager ?? 'Non défini');
        this.departementName.set(collab.departement?.nom_dep ?? 'Non défini');
        this.compteType.set(collab.compte?.type ?? 'Non défini');
        this.typeConge.set(collab.soldes?.[0]?.typeConge ?? 'Non défini'); 
        this.nbSoldes.set(collab.soldes?.length ?? 0);
      },
      error: (err) => this.notificationService.error(err),
    });
  }

  clear(): void {
    this.currentCollaborateur.set(null);
    this.userName.set('');
    this.managerName.set('Non défini');
    this.departementName.set('Non défini');
    this.compteType.set('Non défini');
    this.nbSoldes.set(0);
  }
}
