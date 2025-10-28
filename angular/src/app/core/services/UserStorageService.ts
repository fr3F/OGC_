import { Injectable } from '@angular/core';

export interface UserData {
  id: number;
  username: string;
  nom?: string;
  prenom?: string;
  email?: string;
  matricule?: string;
  type: string;
  id_manager?: number | null;
  login_manager?:string
}

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  private readonly USER_DATA_KEY = 'userData';

  saveUserData(userData: UserData): void {
    try {
      localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error(' Erreur lors de la sauvegarde userData:', error);
    }
  }
  getUserData(): UserData | null {
    try {
      const userDataStr = localStorage.getItem(this.USER_DATA_KEY);
      if (!userDataStr) return null;

      return JSON.parse(userDataStr) as UserData;
    } catch (error) {
      console.error('Erreur lors de la lecture userData:', error);
      return null;
    }
  }

  getManagerId(): number | null {
    const userData = this.getUserData();
    return userData?.id_manager ?? null;
  }

  getUserId(): number | null {
    const userData = this.getUserData();
    return userData?.id ?? null;
  }

  getUserType(): string {
    const userData = this.getUserData();
    return userData?.type;
  }

  getUsername(): string | null {
    const userData = this.getUserData();
    return userData?.username ?? null;
  }

  isManager(): boolean {
    return this.getUserType() === 'manager';
  }

  clearUserData(): void {
    localStorage.removeItem(this.USER_DATA_KEY);
  }
}