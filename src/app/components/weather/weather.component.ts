import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-weather',
  imports: [ ReactiveFormsModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit{
  searchForm!: FormGroup

  constructor(private fb: FormBuilder, private weatherService: WeatherService){}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      city: [null, Validators.required]
    })
  }

  searchWeather() {
    console.log(this.searchForm.value)
    this.weatherService.searchWeatherByCity(this.searchForm.get(['city'])!.value).subscribe((res) => {
      console.log(res)
    })
  }
}
