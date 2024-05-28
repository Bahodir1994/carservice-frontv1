import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard-dialog-v1',
  standalone: true,
  templateUrl: './dashboard-dialog-v1.component.html',
  styleUrls: ['./dashboard-dialog-v1.component.css'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatLabel,
    MatIconModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
  ]
})
export class DashboardDialogV1Component implements OnInit {
  carParamForm: FormGroup;
  public loadData: (page: number, size: number, draw: number, param: string) => void;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private http: HttpClient,
      private dialogRef: MatDialogRef<DashboardDialogV1Component>,
      private snackBar: MatSnackBar
  ) {
    this.loadData = data.loadData;
    this.carParamForm = this.fb.group({
      currentDistance: ['', Validators.required],
      distanceTo: ['', Validators.required],
      oilType: ['', Validators.required],
      oilQuantity: ['', Validators.required],
      serviceCharge: ['', Validators.required],
      filters: ['']
    });
  }

  onSubmitCarParams() {
    if (this.carParamForm.valid) {
      const accessToken = localStorage.getItem('accessToken');

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      });

      const requestBody = {
        ...this.carParamForm.value,
        carId: this.data.selectedItem
      };

      this.http.post('http://192.168.224.18:8761/dashboard', requestBody, { headers })
          .subscribe(response => {
            this.loadData(0, 8, Math.floor(Math.random() * 100) + 1, '');
            this.dialogRef.close(true);
            this.snackBar.open('Ma\'lumotlar saqlandi', 'yopish', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'start'
            });
          }, error => {
            this.snackBar.open(`Ma'lumotlar saqlashda xatolik; Ushbu xatolikni administratorga jo'nating: ${error}`, 'yopish', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'start'
            });
          });
    }
  }

  ngOnInit(): void {
    this.loadData(0, 8, Math.floor(Math.random() * 100) + 1, ''); // Call loadData on init
  }
}
