import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private http: HttpClient) { }


    get<T>(path: string): Observable<T> {
        return this.http.get<T>(path);
    }

    post<T>(path: string, body: Object = {}): Observable<T> {
        return this.http.post<T>(`${path}`, JSON.stringify(body));
    }

    put<T>(path: string, body: Object = {}): Observable<T> {
        return this.http.put<T>(`${path}`, JSON.stringify(body));
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${path}`);
    }
}
