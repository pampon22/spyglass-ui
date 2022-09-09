import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  url: string = environment.SPYGLASS_URI;

  constructor(private http: HttpClient ) { }

  findAll(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.url);
  }

  findById(id: number): Observable<Goal> {
    return this.http.get<Goal>(this.url + `${id}`);
  }

  save(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.url, goal);
  }

  update(id: number, goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(this.url + `${id}`, goal);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `${id}`);
  }

  getPieValues(): Observable<any> {
    return this.http.get<any>(this.url + 'pie');
  }
}
