export interface DemandeConges {
  id?: number;
  date_debut_conge?: string;
  date_fin_conge?: string;
  motifs_conge?: string;
  id_status_conge?: string | Date;
  id_type_conge?: string;  
}
