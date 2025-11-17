import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'dee32022e0msh5364e33da4b4382p1b547djsnb4620652eccd';
  private apiUrl = 'https://weather-api167.p.rapidapi.com/api/weather';

  constructor(private http: HttpClient) { }

  searchWeatherByCity(city: string): Observable<any> {
    const headers = new HttpHeaders()
    .set("x-rapidapi-key", this.apiKey)
    .set("x-rapidapi-host","weather-api167.p.rapidapi.com");

    const options = {headers}
    return this.http.get(`${this.apiUrl}/${city}`, options)
  }
}
