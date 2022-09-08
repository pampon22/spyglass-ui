import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Goal } from 'src/app/models/goal.model';
import { APIService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  goalDetails!: FormGroup;
  goal!: Goal;
  today = new Date().toISOString().split("T")[0];

  constructor(private service: APIService, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.today);
    this.initializeForm();
  }

  initializeForm(): void {
    this.goalDetails = this.fb.group({
      description:  ['', Validators.required],
      amount_needed:['', Validators.required],
      amount_saved:['', Validators.required],
      complete_by:['', Validators.required],
      // image_URL:['', Validators.required],
    })
  };

  onSubmit(): void {
    // this.goal.setDescription(this.goalDetails.value.description);
    // this.goal.setAmount_needed(this.goalDetails.value.amount_needed);
    // this.goal.setAmount_saved(this.goalDetails.value.amount_saved);
    // this.goal.setComplete_by(this.goalDetails.value.complete_by);
    // // this.goal.setImageURL(this.goalDetails.value.image_URL);

    const descrip = this.goalDetails.value.description;
    const amt_n = this.goalDetails.value.amount_needed;
    const amt_s = this.goalDetails.value.amount_saved;
    const date = this.goalDetails.value.complete_by;
    // const url = this.goalDetails.value.image_URL;

    this.goal = new Goal(descrip, amt_n, amt_s, date);
    console.log(this.goal);
    this.service.save(this.goal).subscribe((data) => console.log(data));
  }

  get description() {
    return this.goalDetails.get('description');
  }

  get amount_needed() {
    return this.goalDetails.get('amount_needed');
  }

  get amount_saved() {
    return this.goalDetails.get('amount_saved');
  }

  get complete_by() {
    return this.goalDetails.get('complete_by');
  }

}
