import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmiiboiAPIService {
  basicURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  getMaxPages(): any {
    return this.http.get(`${this.basicURL}/max/pages`);
  }

  getPage(pageNumber: number): any {
    return this.http.get(`${this.basicURL}/${pageNumber}`);
  }

  getSearch(name: string): any {
    let params = new HttpParams();
    params = params.append(`name`, `${name}`);
    return this.http.get(`${this.basicURL}/search`, {params});
  }

  getMAxCardCount(): any {
    return this.http.get(`${this.basicURL}/max/cards`);
  }
}
