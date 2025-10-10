import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CrudService {
  constructor(private http: HttpClient) {}

  /** GET */
  fetchData<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  /** POST */
  addData<T>(url: string, newData: T): Observable<T> {
    return this.http.post<T>(url, newData);
  }

  /** PUT */
  updateData<T>(url: string, updatedData: T): Observable<T> {
    return this.http.put<T>(url, updatedData);
  }

  /** DELETE */
  deleteData(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }
}
