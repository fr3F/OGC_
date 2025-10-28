export interface User {
  id?: number; // Identifiant unique de l'utilisateur
  nom?: string; // Nom de l'utilisateur
  prenom?: string; // Prénom de l'utilisateur
  email?: string; // Adresse e-mail de l'utilisateur
  role?: string; // Rôle de l'utilisateur (ex. admin, utilisateur)
  actif?: boolean; // Statut d'activation de l'utilisateur
  dateCreation?: string; // Date de création du compte
  lastLogin?: string; // Date de la dernière connexion
}
