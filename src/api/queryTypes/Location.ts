export interface LocationResponse {
    id: string;
    name: string;
    phone_number: string;
    address: string;
    district: string;
}

export interface LocationCreateRequest {
    name: string;
    phone_number: string;
    address: string;
    district: string;
}