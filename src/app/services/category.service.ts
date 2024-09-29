import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) { }





  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/all`);
  }



  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }




  getAllCategoryNames():Observable<string[]>
  {
    return this.http.get<string[]>(`${this.apiUrl}/names`)
  }




}
