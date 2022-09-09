import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { Goal } from 'src/app/models/goal.model';
import { APIService } from 'src/app/services/api-service.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  goals: any = [];
  chartSeries: ApexNonAxisChartSeries = [1, 2, 3, 4];
  // chartSeries: ApexNonAxisChartSeries = [];

  chartLabels = ["Home", "Rent", "Car", "Vacation"];

  chartDetails: ApexChart = {
    type: 'donut',
    toolbar: {
      show: true
    }
  }

  constructor(private service: APIService) { }

  ngOnInit(): void {
    this.populateArrays();
  }
    
  populateArrays(): any {
    this.service.getPieValues().subscribe((value:any)=> {
      this.goals = value;
      const values = [];

      for (let index = 0; index < this.goals.length; index++) {
        values.push(this.goals[index][1]);
        console.log(this.chartSeries);
      }
      return values;
    });
    
  }

}
