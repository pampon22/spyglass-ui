import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from 'src/app/models/goal.model';
import { APIService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-goals-view',
  templateUrl: './goals-view.component.html',
  styleUrls: ['./goals-view.component.css']
})
export class GoalsViewComponent implements OnInit {

  goals: any = [];
  // image_URL: string = 'https://www.gstatic.com/youtube/img/promos/growth/c59926d483c3675b72ed09ae5b59e0327acc768664357a50f78234994a418cc0_122x56.webp';

  constructor( private service: APIService) { }

  ngOnInit(): void {
    this.service.findAll().subscribe((data)=>{ this.goals= data;});
    console.log(this.goals);
  }

}
