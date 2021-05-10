import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { StudentPagination } from './models/student-pagination';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public getStudents(page: number = 1, limit: number = 10): Observable<Student[]>
  {
    const params: HttpParams = new HttpParams().append('page', page.toString()).append('limit', limit.toString());
    const obs: Observable<StudentPagination> = this.http.get<StudentPagination>("http://localhost:3000/api/students", {params});

    const newObs: Observable<Student[]> =  obs.pipe(
      map((pagination: StudentPagination) => {return pagination.docs})
    );

    return newObs;
  }
}
