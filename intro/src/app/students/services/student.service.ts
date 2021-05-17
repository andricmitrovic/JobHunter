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

  public getStudents(query: any, page: number = 1, limit: number = 10): Observable<Student[]>
  {
    console.log("From get request");
    console.log(query);

    const data = { 
                 page: page.toString(), 
                 limit: limit.toString(), 
                 adress: query.adress, 
                 requiredTechnologies: query.technologies, 
                 faculty: query.faculty
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
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. \
    eyJhZG1pblVzZXJuYW1lIjoiYWRtaW4iLCJhZG1pblBhc3N3b3JkIjoiYWRtaW5wYXNzIiwiaWF0IjoxNjE3NzM4NzEzLCJleHAiOjE2MjAzMzA3MTN9. \
    h-H96EdSvm_q6PFrKrjPoi-c5akNVgDynrrq1bTblIw"

    const headers: HttpHeaders = new HttpHeaders().append('x-access-token', token)
    const obs: Observable<Student> = this.http.post<Student>("http://localhost:3000/api/students", student, {headers});

    return obs;
  }
}
