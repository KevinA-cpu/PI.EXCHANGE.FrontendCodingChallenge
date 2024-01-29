import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TrendingGifsService {
  private giphyApiUrl = `${environment.GIPHY_API_URL}/${environment.GIPHY_API_VERSION}/gifs`;
  private giphyApiKey = `?api_key=${environment.GIPHY_API_KEY}`;
  private offset = 50;
  private limit = 6;

  constructor(private http: HttpClient) {}

  resetOffset() {
    this.offset = 50;
  }

  getTrendingGifs() {
    const trendingUrl = `${this.giphyApiUrl}/trending${this.giphyApiKey}`;
    return this.http.get(trendingUrl);
  }

  getMoreTrendingGifs() {
    const trendingUrl = `${this.giphyApiUrl}/trending${this.giphyApiKey}&offset=${this.offset}&limit=${this.limit}`;
    this.offset += this.limit;
    return this.http.get(trendingUrl);
  }

  searchGifs(query: string) {
    const searchUrl = `${this.giphyApiUrl}/search${this.giphyApiKey}&q=${query}`;
    return this.http.get(searchUrl);
  }

  searchMoreGifs(query: string) {
    const searchUrl = `${this.giphyApiUrl}/search${this.giphyApiKey}&q=${query}&offset=${this.offset}&limit=${this.limit}`;
    this.offset += this.limit;
    return this.http.get(searchUrl);
  }
}
