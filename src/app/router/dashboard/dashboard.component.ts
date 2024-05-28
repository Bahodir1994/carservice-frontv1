import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {dashboard_data_dto_v1, chart_data_dto_v1, pageable_data_dto_v1, PaginatedDataResponse} from "./dashboard-data-dto";
import {DashboardDataService} from "./dashboard-data-service";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatGridListModule} from "@angular/material/grid-list";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {MatProgressBar} from "@angular/material/progress-bar";
import {Router} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DashboardDialogV1Component} from "../dialogos/dashboard-dialog-v1/dashboard-dialog-v1.component";
import * as Highcharts from 'highcharts';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [
        CommonModule, MatCardModule,
        MatDividerModule, MatButtonModule, MatPaginatorModule,
        MatIconModule, MatChipsModule, MatGridListModule,
        MatFormFieldModule, MatFormFieldModule, MatInputModule,
        FormsModule, MatButtonModule, MatIconModule, MatProgressBar,
        MatDialogModule
    ],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    data: dashboard_data_dto_v1[] = [];
    chartData: chart_data_dto_v1[] = [];
    recordsTotal = 0;
    pageable: pageable_data_dto_v1[] = []
    carForm: FormGroup;
    Highcharts: typeof Highcharts = Highcharts;

    chartOptions: Highcharts.Options = {
        chart: {
            type: 'column'
        },
        title: {
            text: "ENG KO\'P KELADIGAN AVTO TURLARI"
        },
        subtitle: {
            text: '<a href="https://worldpopulationreview.com/world-cities" target="_blank">Eng ko\'p keladigan avto turlari</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                autoRotation: [-45, -90],
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Population in 2021: <b>{point.y:.1f} millions</b>'
        },
        series: [{
            name: 'Population',
            type: 'column',
            colors: [
                '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa', '#03c69b',  '#00f194'
            ],
            colorByPoint: true,
            groupPadding: 0,
            data: [
                ['Cobalt', 156],
                ['Matiz', 128],
                ['Lada', 98],
                ['Onix', 65],
                ['Tracker', 60],
                ['Damas', 59],
                ['Niva', 40]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                inside: true,
                verticalAlign: 'top',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    };
    chartOptions2: Highcharts.Options = { // Chart options
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Eng faol mijozlar'
        },
        tooltip: {
            valueSuffix: '%'
        },
        subtitle: {
            text: '<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">Eng faol mijozlar</a>'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [
                    {
                        enabled: true,
                        distance: 20
                    } as any,  // Using 'any' type casting
                    {
                        enabled: true,
                        distance: -40,
                        format: '{point.y}',  // Displaying the actual number values
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    } as any  // Using 'any' type casting
                ]
            }
        },
        series: [
            {
                type: 'pie',
                name: 'Percentage',
                data: [
                    {
                        name: 'Sattoraka',
                        y: 8
                    },
                    {
                        name: 'Alibek',
                        sliced: true,
                        selected: true,
                        y: 14
                    },
                    {
                        name: 'Quvonch Bugalter',
                        y: 18
                    },
                    {
                        name: 'Zapravshik Ali',
                        y: 19
                    },
                    {
                        name: 'Aslim aka',
                        y: 3
                    }
                ]
            }
        ]
    };

    currentDate = new Date();
    startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 11, 1);
    usaDataLast12Months = [
        124, 191, 124, 231, 84, 231,124, 151, 74, 20, 200, 231,
    ];
    chartOptions3: Highcharts.Options = {
        chart: {
            type: 'area'
        },
        accessibility: {
            description: 'Image description: An area chart compares the nuclear ' +
                'stockpiles of the USA and the USSR/Russia between 1945 and ' +
                '2017. The number of nuclear weapons is plotted on the Y-axis ' +
                'and the years on the X-axis. The chart is interactive, and the ' +
                'year-on-year stockpile levels can be traced for each country. ' +
                'The US has a stockpile of 6 nuclear weapons at the dawn of the ' +
                'nuclear age in 1945. This number has gradually increased to 369 ' +
                'by 1950 when the USSR enters the arms race with 6 weapons. At ' +
                'this point, the US starts to rapidly build its stockpile ' +
                'culminating in 32,040 warheads by 1966 compared to the USSR’s 7,' +
                '089. From this peak in 1966, the US stockpile gradually ' +
                'decreases as the USSR’s stockpile expands. By 1978 the USSR has ' +
                'closed the nuclear gap at 25,393. The USSR stockpile continues ' +
                'to grow until it reaches a peak of 45,000 in 1986 compared to ' +
                'the US arsenal of 24,401. From 1986, the nuclear stockpiles of ' +
                'both countries start to fall. By 2000, the numbers have fallen ' +
                'to 10,577 and 21,000 for the US and Russia, respectively. The ' +
                'decreases continue until 2017 at which point the US holds 4,018 ' +
                'weapons compared to Russia’s 4,500.'
        },
        title: {
            text: 'US and USSR nuclear stockpiles'
        },
        subtitle: {
            text: 'Source: <a href="https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/" ' +
                'target="_blank">FAS</a>'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        },
        yAxis: {
            title: {
                text: 'Nuclear weapon states'
            }
        },
        tooltip: {
            pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>' +
                'warheads in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: this.startDate.getMonth(),
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            type: 'area',
            name: '12 oylik',
            data: this.usaDataLast12Months
        }]
    };

    constructor(
        private dataService: DashboardDataService,
        private router: Router,
        private fb: FormBuilder,
        public dialog: MatDialog
    ) {
        this.carForm = this.fb.group({
            fio: ['', Validators.required],
            phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
            carType: ['', Validators.required],
            carNumber: ['', Validators.required],
            carColor: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadData(0, 8, Math.floor(Math.random() * 100) + 1, '');
        Highcharts.chart('container', this.chartOptions);
        Highcharts.chart('container2', this.chartOptions2);
        Highcharts.chart('container3', this.chartOptions3);
    }

    openDialog(item: any) {
        const dialogRef = this.dialog.open(DashboardDialogV1Component, {
            data: {
                selectedItem: item,
                loadData: this.loadData.bind(this)
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadData(0, 8, Math.floor(Math.random() * 100) + 1, '0');
            }
            console.log(`Dialog result: ${result}`);
        });
    }

    applyFilter(event: any) {
        const value = (event.target as HTMLInputElement).value; // Получаем значение поля ввода
        this.loadData(0, 8, Math.floor(Math.random() * 100) + 1, value.trim().toLowerCase());
    }

    public loadData(page: number, size: number, draw: number, param: string) {
        this.dataService.getPaginatedData(page, size, draw, param)
            .subscribe((response: PaginatedDataResponse) => {
                this.data = response.data;
                this.recordsTotal = response.totalElements;
                this.pageable = response.pageable;
            });
    }

    onPageChange(event: any, searchParam: string) {
        const newPage = event.pageIndex; // Новый индекс страницы
        const newSize = event.pageSize; // Новый размер страницы
        this.loadData(newPage, newSize, Math.floor(Math.random() * 100) + 1, searchParam); // Загрузка данных для новой страницы и размера страницы
    }

    ngAfterViewInit(): void {
        this.loadData(0, 8, Math.floor(Math.random() * 100) + 1,'');
    }
}
