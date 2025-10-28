import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeCongesService {
  nomModele: string = "demandeconge";
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/${this.nomModele}`);
  }

  getById(id) {
    return this.http.get(`${this.baseUrl}/${this.nomModele}/${id}`);
  }

  create(data) {
    return this.http.post(`${this.baseUrl}/${this.nomModele}`, data);
  }

  update(id, data) {
    return this.http.put(`${this.baseUrl}/${this.nomModele}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/${this.nomModele}/${id}`);
  }

  getAllDemandeConge(nomModele: string, params: any) {
    const url = `${this.baseUrl}/${nomModele}/allDemandeConge`
    return this.http.get(url, { params });
  }

  getAllDemandeCongeByLogin(nomModele: string, params: any) {
    const url = `${this.baseUrl}/${nomModele}/allDemandeConge`;
    return this.http.get(url, { params: { ...params } });
  }

  getAllDemandeCongeManagerByLogin(nomModele: string, params: any) {
    const url = `${this.baseUrl}/${nomModele}/demandeCongeByManager`;
    return this.http.get(url, { params: { ...params } });
  }

  createDemandeConge(data, nomModele) {
    return this.http.post(`${this.baseUrl}/${nomModele}/ajouter`, data, { withCredentials: true });
  }

  validerDemandeConge(demandeId: number, valide: boolean, login_manager: string, nomModele: string) {
    return this.http.post<{ success: boolean, demande: any }>(
      `${this.baseUrl}/${nomModele}/valider`,
      { demandeId, valide, login_manager }
    );
  }
}
