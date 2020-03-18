import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { blog } from 'src/app/models/blog/blog.model';


const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl:string = 'http://dev.vn/api/blog'

  constructor(private http:HttpClient) { }

  //get todos
  getBlogs(sort,filter,total,offset,page):Observable<blog[]> {
  	return this.http.post<blog[]>(this.baseUrl,{sort,filter,total,offset,page});
  }

  getBlog(worker):Observable<blog> {
    return this.http.post<blog>(`${this.baseUrl}`,{worker});
  }
}
