export interface car_param_data {
  insTime: number;
  mileage: number;
  toMileage: number;
  oilModel: string;
  fillingVolume: boolean;
  oilFilter: boolean;
  fuelFilter: boolean;
  airFilter: boolean;
  salonFilter: boolean;
  pampersFilter: boolean;
  isActually: boolean;
}

export interface users {
  fullName: string
}

export interface dashboard_data_dto_v1 {
  id: number;
  carNumber: string;
  createdDate: string;
  carParams: car_param_data[];
  carModelCode: string;
  carColor: string;
  users: users;
}

export interface pageable_data_dto_v1 {
  pageNumber: number;
  pageSize: number;
}

export interface PaginatedDataResponse {
  data: dashboard_data_dto_v1[]; // Массив данных, который приходит от сервера
  totalElements: number; // Общее количество страниц
  pageable: pageable_data_dto_v1[]; // Текущая страница
}


/***************************************************************/

export interface chart_data_dto_v1 {
  category: string;
  value: number;
}