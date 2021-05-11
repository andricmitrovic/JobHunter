import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { CompanyPagination } from './models/company-pagination';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  public getCompanies(page: number = 1, limit: number = 10): Observable<Company[]>
  {
    const params: HttpParams = new HttpParams().append('page', page.toString()).append('limit', limit.toString());
    const obs: Observable<CompanyPagination> = this.http.get<CompanyPagination>("http://localhost:3000/api/companies", {params});

    const newObs: Observable<Company[]> =  obs.pipe(
      map((pagination: CompanyPagination) => {return pagination.docs})
    );

    return newObs;
  }

}
