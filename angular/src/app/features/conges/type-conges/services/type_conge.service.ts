import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeCongeService {

  nomModele: string = "typeconge";
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

  update(id, data){
    return this.http.put(`${this.baseUrl}/${this.nomModele}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/${this.nomModele}/${id}`);
  }

  getAllDetailTypeConge(nomModele: string, params: any){
    const url = `${this.baseUrl}/${nomModele}/allTypeConge`
    return this.http.get(url, { params })
  }
}
