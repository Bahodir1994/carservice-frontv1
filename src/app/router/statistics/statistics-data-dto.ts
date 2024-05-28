import {pageable_data_dto_v1, products_data_dto_v1} from "../client/client-data-dto";

export interface clients_data_dto_v1
{
    id: string;
    fullName: string;
    phone: string;
    email: string;
}

export interface DataResponse_dto_v1 {
    data: clients_data_dto_v1[];
}

/************************************************/

export interface clients_messages
{
    id: string;
    message: string;
    insTime: string;
}

export interface clients_permissions
{
    id: string;
    messageUsers: clients_messages;
    userId: string;
    readTime: string;
}