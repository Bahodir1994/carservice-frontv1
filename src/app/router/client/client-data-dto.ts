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

export interface client_cars_data_dto_v1 {
    id: number;
    carNumber: string;
    createdDate: string;
    carParams: car_param_data[];
    carModelCode: string;
    carColor: string;
}

export interface products_data_dto_v1
{
    id: string;
    fullName: string;
    phone: string;
    email: string;
}

export interface pageable_data_dto_v1
{
    pageNumber: number;
    pageSize: number;
}

export interface PaginatedDataResponse {
    data: products_data_dto_v1[]; // Массив данных, который приходит от сервера
    totalElements: number; // Общее количество страниц
    pageable: pageable_data_dto_v1[]; // Текущая страница
}


export interface Pokemon {
    value: string;
    viewValue: string;
}

export interface PokemonGroup {
    disabled?: boolean;
    name: string;
    pokemon: Pokemon[];
}
