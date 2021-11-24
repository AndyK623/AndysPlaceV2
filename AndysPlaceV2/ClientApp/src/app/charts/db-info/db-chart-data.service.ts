
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DbChartData } from './DbChartData';

@Injectable({
  providedIn: 'root'
})
export class DbChartDataService {


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  url = this.baseUrl + 'api/DbCharts/GetProducts';

  getProducts = this.http.get<DbChartData[]>(this.url);

}
