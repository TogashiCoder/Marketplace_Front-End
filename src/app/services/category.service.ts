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

//

createCategory(categoryDto: Category): Observable<Category> {
  return this.http.post<Category>(`${this.apiUrl}/admin/add`, categoryDto);
}

setCategoryAsSubcategory(categoryId: number, parentCategoryId: number): Observable<Category> {
  return this.http.patch<Category>(`${this.apiUrl}/admin/${categoryId}/set-parent/${parentCategoryId}`, {});
}

removeSubcategory(categoryId: number): Observable<Category> {
  return this.http.patch<Category>(`${this.apiUrl}/admin/${categoryId}/remove-parent`, {});
}

updateCategory(id: number, categoryDto: Category): Observable<Category> {
  return this.http.put<Category>(`${this.apiUrl}/admin/${id}`, categoryDto);
}

deleteCategory(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/admin/${id}`);
}

getRootCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(`${this.apiUrl}/root`);
}

getSubcategories(id: number): Observable<Category[]> {
  return this.http.get<Category[]>(`${this.apiUrl}/${id}/subcategories`);
}


}
