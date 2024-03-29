import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/services/api-service.service';
import { AddGoalComponent } from '../add-goal/add-goal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Goal } from 'src/app/models/goal.model';

@Component({
  selector: 'app-goals-view',
  templateUrl: './goals-view.component.html',
  styleUrls: ['./goals-view.component.css']
})
export class GoalsViewComponent implements OnInit {

  goals: any = [];

  displayedColumns: string[] = ['description', 'amount_needed', 'amount_saved', 'complete_by', 'image_URL', 'action'];
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
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(): void {
    this.dialog.open(AddGoalComponent, {
      width: '30%', height: '70%'
    }).afterClosed().subscribe(value => {
      if (value==='update') {
        this.retrieveData();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editGoal(row: Goal): void {
    this.dialog.open(AddGoalComponent, {
      width: '40%', data: row
    })
  }

  removeGoal(id: number): void {
    this.service.delete(id).subscribe();
    window.alert('Successfully deleted');
  }

}