import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    const data = {
                 page: page.toString(),
                 limit: limit.toString(),
                 adress: "Beograd",
                 requiredTechnologies: 'java',
                 faculty: 'Matematicki fakultet'
                };

    const params: HttpParams = new HttpParams({fromObject: data})

    const obs: Observable<StudentPagination> = this.http.get<StudentPagination>("http://localhost:3000/api/students", {params});

    const newObs: Observable<Student[]> =  obs.pipe(
      map((pagination: StudentPagination) => {return pagination.docs})
    );

    return newObs;
  }

  public postStudent(student: Student): Observable<Student>
  {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIn0.LeAxoSHdgvR5coB2vzg0kYKI6DAdXhyOF4fzuzaQ_BU"

    const headers: HttpHeaders = new HttpHeaders().append('x-access-token', token)
    console.log(student);
    const obs: Observable<Student> = this.http.post<Student>("http://localhost:3000/api/students", student, {headers});

    return obs;
  }
}
