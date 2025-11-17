import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../service/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
 
  city: string = '';
  weatherData: any = null;
  loading = false;
  errorMessage = '';

  constructor(private weatherService: WeatherService){}

  searchWeather() {
    if (!this.city.trim()){
      this.errorMessage = "Veuillez entrer une ville";
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.weatherData = null;

    this.weatherService.searchWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },

      error: (err) => {
        this.loading = false;

        if(err.status === 404){
          this.errorMessage = "Ville introuvable !";
        } else if (err.status === 401) {
          this.errorMessage = "Erreur API : clé API invalide"
        } else {
          this.errorMessage = "Une erreur est servenue"
        }
      }
    });
  }
}
