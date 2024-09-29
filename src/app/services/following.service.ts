import { Follower } from '../models/Follower';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  private apiUrl = 'http://localhost:8080/api/followers';

  constructor(private http: HttpClient) { }

  follow(buyerId: number, sellerId: number): Observable<Follower> {
    const follower: Follower = { buyerId, sellerId };
    return this.http.post<Follower>(`${this.apiUrl}/follow`, follower);
  }


  unfollow(buyerId: number, sellerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/unfollow/${buyerId}/${sellerId}`);
  }

  getAllFollowersOfSeller(sellerId: number): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.apiUrl}/seller/${sellerId}`);
  }

  getAllFollowingForBuyer(buyerId: number): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.apiUrl}/buyer/${buyerId}`);
  }

  isFollowing(buyerId: number, sellerId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check/${buyerId}/${sellerId}`);
  }

  getFollowerById(id: number): Observable<Follower> {
    return this.http.get<Follower>(`${this.apiUrl}/${id}`);
  }

  getAllFollowers(): Observable<Follower[]> {
    return this.http.get<Follower[]>(this.apiUrl);
  }

  getFollowerCountForSeller(sellerId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/seller/${sellerId}/count`);
  }
}
