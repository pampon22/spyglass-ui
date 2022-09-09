import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Goal } from 'src/app/models/goal.model';
import { APIService } from 'src/app/services/api-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  goalDetails!: FormGroup;
  goal!: Goal;
  today = new Date().toISOString().split("T")[0];
  actionButton: string = 'Save';

  constructor(private service: APIService, private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddGoalComponent>,
    @Inject(MAT_DIALOG_DATA) public editGoal: any
    ) { }

  ngOnInit(): void {
    this.initializeForm();

    if (this.editGoal) {
      this.actionButton = 'Update';
      this.goalDetails.controls['description'].setValue(this.editGoal.description);
      this.goalDetails.controls['amount_needed'].setValue(this.editGoal.amount_needed);
      this.goalDetails.controls['amount_saved'].setValue(this.editGoal.amount_saved);
      this.goalDetails.controls['complete_by'].setValue(this.editGoal.complete_by);
      this.goalDetails.controls['image_URL'].setValue(this.editGoal.image_URL);
    }
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
    if (!this.editGoal) {
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
      window.alert('Kudos to you for taking the first step towards financial freedom');
    } else {
      this.updateGoal();
    }
  }

  updateGoal() {
    const descrip = this.goalDetails.value.description;
    const amt_n = this.goalDetails.value.amount_needed;
    const amt_s = this.goalDetails.value.amount_saved;
    const date = this.goalDetails.value.complete_by;
    const url = this.goalDetails.value.image_URL;
    const id = this.editGoal.id;

    this.goal = new Goal(descrip, amt_n, amt_s, date, url, id);
    
    this.service.update(this.editGoal.id, this.goal).subscribe((data) => {
      this.goalDetails.reset();
      this.dialogRef.close('update');
      this.goal = data;
      console.log(this.goal);
    })
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
