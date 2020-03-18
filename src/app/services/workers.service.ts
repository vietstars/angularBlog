import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { worker } from 'src/app/models/workers/workers.model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

	baseUrl:string = 'http://dev.vn/api/worker'

  constructor(private http:HttpClient) { }

  //get todos
  getWorkers(sort,filter,total,offset,page):Observable<worker[]> {
  	return this.http.post<worker[]>(this.baseUrl,{sort,filter,total,offset,page});
  }

  addWorker(data):Observable<worker> {
    return this.http.post<worker>(`${this.baseUrl}/add`,{data});
  }
}
