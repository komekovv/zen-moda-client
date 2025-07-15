export interface ListResponse<T> {
    data: T[],
    totalCount: number;
}