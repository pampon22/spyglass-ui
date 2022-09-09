import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/services/api-service.service';
import { AddGoalComponent } from '../add-goal/add-goal.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-goals-view',
  templateUrl: './goals-view.component.html',
  styleUrls: ['./goals-view.component.css']
})
export class GoalsViewComponent implements OnInit {

  goals: any = [];
  // image_URL: string = 'https://www.gstatic.com/youtube/img/promos/growth/c59926d483c3675b72ed09ae5b59e0327acc768664357a50f78234994a418cc0_122x56.webp';

  displayedColumns: string[] = ['description', 'amount_needed', 'amount_saved', 'complete_by', 'image_URL'];
  dataSource!: MatTableDataSource<Goal>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private service: APIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveData();
    setInterval( () => {
      this.retrieveData();}, 
       1000)
    }

  retrieveData(): void {
      this.service.findAll().subscribe((data)=> { 
      this.goals = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
    });
    console.log('all goals' + this.goals);
  }

  openDialog(): void {
    this.dialog.open(AddGoalComponent, {
      width: '40%', height: '60%'
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}