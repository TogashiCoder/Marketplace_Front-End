import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Category } from '../models/Category';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // Method to create a product
  createProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, formData);
  }

  // Method to get a product by its ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/by/${productId}`);
  }

  // Method to get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`);
  }

  // Method to update a product
  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${productId}`, formData);
  }

  // Method to delete a product
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${productId}`);
  }


    // Method to get all products by category
    getAllProductsByCategory(categoryId: number): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
    }

    // Method to get all products by seller ID
    getAllProductsBySellerId(sellerId: number): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/seller/${sellerId}`);
    }

    // Method to get all products without a coupon
    getAllProductsWithoutCoupon(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/no-coupon`);
    }

    // Method to get all products by category id
    getProductsByCategory(categoryId:number):Observable<Product[]>{
      return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
    }

    //get number of product in a category
    getNumberOfProductIncategory(categoryId:number):Observable<number>{
      return this.http.get<number>(`${this.apiUrl}/category/${categoryId}/count`);
    }


}
