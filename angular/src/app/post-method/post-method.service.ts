import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class PostMethodService{
    constructor(private httpclient: HttpClient) { }
    getData(): Observable<any>{
        return this.httpclient.get<any>("https://jsonplaceholder.typicode.com/posts")
    }
    post(data:any): Observable<any>{
        return this.httpclient.post<any>("https://jsonplaceholder.typicode.com/posts",data)
    }
}
