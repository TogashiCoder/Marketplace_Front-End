import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../models/Rating';
import { Product } from '../models/Product';
import { ReviewDto } from '../models/ReviewDto';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8080/api/ratings';

  constructor(private http: HttpClient) { }

  // Create a new rating
  createRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.apiUrl, rating);
  }

  // Get a single rating by ID
  getRating(id: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiUrl}/${id}`);
  }

  // Delete a rating by ID
  deleteRating(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get all ratings for a product
  getAllRatingsByProduct(productId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/product/${productId}`);
  }

  // Get all ratings for a seller
  getAllRatingsBySeller(sellerId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.apiUrl}/seller/${sellerId}`);
  }

  // Get the number of ratings for a product
  getNumberOfRatingsForProduct(productId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/product/${productId}`);
  }

  // Get the number of ratings for a seller
  getNumberOfRatingsForSeller(sellerId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/seller/${sellerId}`);
  }

  // Get the average rating for a seller's products
  getAverageRatingForSellerProducts(sellerId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average/seller/${sellerId}`);
  }

  // Get best rated products
  getBestRatedProducts(limit: number = 10): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/best-rated?limit=${limit}`);
  }

  // Get most viewed products
  getMostViewedProducts(limit: number = 10): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/most-viewed?limit=${limit}`);
  }

  // Get most favorited products
  getMostFavoritedProducts(limit: number = 10): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/most-favorited?limit=${limit}`);
  }


    // Check if a buyer can rate a product
    canRateProduct(productId: number, buyerId: number): Observable<boolean> {
      return this.http.get<boolean>(`${this.apiUrl}/can-rate/product/${productId}/buyer/${buyerId}`);
    }


    // Get reviews for a product by product ID
  getReviewsForProduct(productId: number): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/reviews/product/${productId}`);
  }


}
