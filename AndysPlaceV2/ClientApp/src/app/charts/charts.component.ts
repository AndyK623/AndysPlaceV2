import { Component, OnInit } from '@angular/core';


import { tap } from 'rxjs/operators';

import { CovidApiService } from './covid-api/covid-api.service';
import { Country } from './covid-api/country';
import { CountryStatus } from './covid-api/CountryStatus';

import { DbChartDataService } from './db-info/db-chart-data.service';
import { DbChartData } from './db-info/DbChartData';

import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

import * as moment from 'moment';




@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  argentinaCovidCasesOptions: EChartsOption;
  cases: CountryStatus[] = [];

  dbProductsByCategoryOptions: EChartsOption;
  productsByCategory: DbChartData[] = []

  //covidChartType: string;

  constructor(private covidApiService: CovidApiService, private productsByCategoryService: DbChartDataService) { }

  ngOnInit() {
    this.covidApiService.getCasesByCountry('argentina').subscribe(result => {
      this.cases = result;
      this.setOptionsCovid();
    }, error => console.error(error));

    this.productsByCategoryService.getProducts.subscribe(result => {
      this.productsByCategory = result;
      this.setOptionsProducts();
    }, error => console.error(error));

  }


  setOptionsCovid() {
    this.argentinaCovidCasesOptions = {
      grid: {
        left: 65
      },
      title: {
        text: ''
      },
      legend: {
        data: ['Confirmed', 'Recovered', 'Deaths']
      },
      tooltip: {

      },
      xAxis: {
        type: 'category',
        data: this.cases.map(c => moment(c.Date).format('DD/MM/YYYY'))
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Confirmed',
        type: 'line',
        data: this.cases.map(c => c.Confirmed)
      },
      {
        name: 'Recovered',
        type: 'line',
        data: this.cases.map(c => c.Recovered)
      },
      {
        name: 'Deaths',
        type: 'line',
        data: this.cases.map(c => c.Deaths)
      }]

    };

    //this.covidChartType = 'line';
  }


  setOptionsProducts() {
    this.dbProductsByCategoryOptions = {
      
      grid: {
        bottom: 110,
      },
      title: {
        text: ''
      },
      legend: {
        data: ['Number of Products']
      },
      tooltip: {

      },
      xAxis: {
        type: 'category',
        data: this.productsByCategory.map(p => p.category),
        //Esto me alinea el text ddebajo del eje x con su respectiva columna!
        axisTick: {
          alignWithLabel: true
        },
        //Con esto le doy formato al texto debajo del eje x
        axisLabel: {
          rotate: 90,
          

        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Number of Products',
          type: 'bar',
          data: this.productsByCategory.map(p => p.totalProducts)
        }
      ]

    };
  }

  /*changeChartType() {
    
    var chart = document.getElementById('covid-chart');
    var myChart = echarts.init(chart);

    if (this.covidChartType == 'line') {
      this.argentinaCovidCasesOptions = {
        title: {
          text: ''
        },
        legend: {
          data: ['Confirmed', 'Recovered', 'Deaths']
        },
        tooltip: {

        },
        xAxis: {
          type: 'category',
          data: this.cases.map(c => moment(c.Date).format('DD/MM/YYYY'))
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Confirmed',
          type: 'bar',
          data: this.cases.map(c => c.Confirmed)
        },
        {
          name: 'Recovered',
          type: 'bar',
          data: this.cases.map(c => c.Recovered)
        },
        {
          name: 'Deaths',
          type: 'bar',
          data: this.cases.map(c => c.Deaths)
        }]
      };

      this.covidChartType = 'bar';
    }
    else {
      this.argentinaCovidCasesOptions = {
        title: {
          text: ''
        },
        legend: {
          data: ['Confirmed', 'Recovered', 'Deaths']
        },
        tooltip: {

        },
        xAxis: {
          type: 'category',
          data: this.cases.map(c => moment(c.Date).format('DD/MM/YYYY'))
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: 'Confirmed',
          type: 'line',
          data: this.cases.map(c => c.Confirmed)
        },
        {
          name: 'Recovered',
          type: 'line',
          data: this.cases.map(c => c.Recovered)
        },
        {
          name: 'Deaths',
          type: 'line',
          data: this.cases.map(c => c.Deaths)
        }]
      };

      this.covidChartType = 'line';
    }


    
    myChart.setOption(this.argentinaCovidCasesOptions);
    
  }*/


}
