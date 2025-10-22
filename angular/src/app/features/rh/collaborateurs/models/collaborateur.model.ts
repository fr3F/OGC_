export interface Collaborateur {
  id?: number;
  nom_collab?: string;
  matricule_collab?: string;
  prenom_collab?: string;
  email_collab?: string;
  date_embauche_collab?: string | Date;
  id_manager?: string;  
  login?: string;
  id_departement?: number;
}
