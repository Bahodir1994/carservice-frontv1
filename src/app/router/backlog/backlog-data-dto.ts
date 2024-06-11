export interface UserData {
    id: string;
    fullName: string;
    phone: string;
}

export interface ClientCarsDataDtoV1 {
    id: number;
    users: UserData;
}

export interface PaymentsDataDtoV1 {
    id: string;
    carParamsId: string;
    insTime: string;
    moneyGive: number;
    moneyNeed: number;
    excessMoney: number | null;
}

export interface CarParamsDataDtoV1 {
    id: string;
    payments: PaymentsDataDtoV1[];
    insTime: string;
    mileage: number;
    toMileage: number;
    oilModel: string;
    fillingVolume: string;
    oilFilter: boolean;
    fuelFilter: boolean;
    airFilter: boolean;
    salonFilter: boolean;
    pampersFilter: boolean;
    serviceCharge: number;
    isActually: boolean;
    totalMoneyNeed: number; // новое поле

}

export interface PageableDataDtoV1 {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PaginatedDataResponsePayment {
    content: CarParamsDataDtoV1[];
    pageable: PageableDataDtoV1;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
}
