export interface dashboard_data_dto_v1
{
  id: number;
  carNumber: string;
  createdDate: string;
  carModelCode: string;
  carColor: string;
}

export interface pageable_data_dto_v1
{
  pageNumber: number;
  pageSize: number;
}

export interface PaginatedDataResponse {
  data: dashboard_data_dto_v1[]; // Массив данных, который приходит от сервера
  totalElements: number; // Общее количество страниц
  pageable: pageable_data_dto_v1[]; // Текущая страница
}
