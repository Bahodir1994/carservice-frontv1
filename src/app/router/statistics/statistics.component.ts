import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardImage,
  MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup
} from "@angular/material/card";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemTitle, MatListModule,
  MatListSubheaderCssMatStyler
} from "@angular/material/list";
import {MatPaginator} from "@angular/material/paginator";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {StatisticsDataService} from "./statistics-data.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {clients_data_dto_v1, clients_permissions, DataResponse_dto_v1} from "./statistics-data-dto";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardImage,
    MatCardSmImage,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatChipListbox,
    MatChipOption,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatListItemIcon,
    MatListItemLine,
    MatListItemTitle,
    MatListSubheaderCssMatStyler,
    MatPaginator,
    MatTab,
    MatTabGroup,
    NgForOf,
    NgIf,
    MatListModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition('void => *', [
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class StatisticsComponent implements OnInit{
  client_fullName = '';
  lastSelectedUserId = '';
  errorMessageText = '';
  data: clients_data_dto_v1[] = [];
  data_v2: clients_permissions[] = [];
  previousData_v2: clients_permissions[] = [];


  constructor(private dataService: StatisticsDataService, private http: HttpClient, private snackBar: MatSnackBar) {
  }

  applyFilter(event: any) {
    const value = (event.target as HTMLInputElement).value; // Получаем значение поля ввода
    this.loadData(Math.floor(Math.random() * 100) + 1, value.trim().toLowerCase());
  }

  loadData(draw: number, param: string) {
    this.dataService.getData(draw, param)
        .subscribe((response: DataResponse_dto_v1) => {
          this.data = response.data;
        });
  }

  onSubmit(message_text: string, list_clients: string) {
    this.errorMessageText = 'Sms: '
    if (message_text === null || message_text === '' || message_text.length > 500 || this.lastSelectedUserId === null || this.lastSelectedUserId === '') {
        if (message_text === null || message_text === '' || message_text.length > 500){
          this.errorMessageText = this.errorMessageText + ' [uzunligi 1 ta dan 500 ta gacha] ';
        }
        if (this.lastSelectedUserId === null || this.lastSelectedUserId === ''){
          this.errorMessageText = this.errorMessageText + ' [mijoz tanlanish]'
        }
        this.errorMessageText = this.errorMessageText + ' shartlari bajarilishi lozim!'

        this.snackBar.open(this.errorMessageText, 'yopish', {
          duration: 6000,
          verticalPosition: 'bottom',
          horizontalPosition: 'start'
        });
        return;
    }

    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const formData = {
      messageText: message_text,
      clientId: this.lastSelectedUserId,
    };

    this.http.post('http://192.168.224.18:8761/messages', formData, {headers})
        .subscribe(response => {
          this.onItemClick(this.lastSelectedUserId, '');
          this.snackBar.open('Ma\'lumotlar saqlandi', 'yopish', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'start'
          });
        }, error => {
          this.snackBar.open('Ma\'lumotlar saqlashda xatolik', 'yopish', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'start'
          });
        });

  };

  onItemClick(item_id: string, fullName: string) {
    if (item_id !== this.lastSelectedUserId) {
      this.previousData_v2 = [];
      this.data_v2 = [];
    }

    this.lastSelectedUserId = item_id;

    if (fullName !== null && fullName !== '') {
      this.client_fullName = fullName;
    }

    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    let draw = Math.floor(Math.random() * 100) + 1;

    const url = `http://192.168.224.18:8761/messages/${draw}/${item_id}`;

    this.http.get<clients_permissions[]>(url, { headers }).subscribe(
        (response: clients_permissions[]) => {
          const newMessages = response.filter(newItem =>
              !this.previousData_v2.some(oldItem => oldItem.id === newItem.id)
          );
          this.previousData_v2 = [...newMessages, ...this.previousData_v2];
          this.data_v2 = [...this.previousData_v2];
        },
        error => {
          console.error('Error:', error);
        }
    );
  };

  ngOnInit(): void {
    this.loadData(Math.floor(Math.random() * 100) + 1, '');
  }
}
