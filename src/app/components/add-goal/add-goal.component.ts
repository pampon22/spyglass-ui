import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Goal } from 'src/app/models/goal.model';
import { APIService } from 'src/app/services/api-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  goalDetails!: FormGroup;
  goal!: Goal;
  today = new Date().toISOString().split("T")[0];

  constructor(private service: APIService, private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddGoalComponent>
    ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.goalDetails = this.fb.group({
      description:  ['', Validators.required],
      amount_needed:['', Validators.required],
      amount_saved:['', Validators.required],
      complete_by:['', Validators.required],
      image_URL:['', Validators.required],
    })
  };

  onSubmit(): void {
    const descrip = this.goalDetails.value.description;
    const amt_n = this.goalDetails.value.amount_needed;
    const amt_s = this.goalDetails.value.amount_saved;
    const date = this.goalDetails.value.complete_by;
    const url = this.goalDetails.value.image_URL;

    this.goal = new Goal(descrip, amt_n, amt_s, date, url);
    this.service.save(this.goal).subscribe((data) => {
      this.goalDetails.reset();
      this.dialogRef.close('save');
    });
    window.alert('Kudos to you for taking the right steps towards financial freedom');
    
  }

  // get description() {
  //   return this.goalDetails.get('description');
  // }

  // get amount_needed() {
  //   return this.goalDetails.get('amount_needed');
  // }

  // get amount_saved() {
  //   return this.goalDetails.get('amount_saved');
  // }

  // get complete_by() {
  //   return this.goalDetails.get('complete_by');
  // }

}
