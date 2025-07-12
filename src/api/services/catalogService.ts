import { api } from '@/api/apiHelper';
import { GetCatalogsResponse } from '@/api/queryTypes/Catalog';

export const catalogService = {
    getCatalogs: async (): Promise<GetCatalogsResponse> => {
        return api.publicGet<GetCatalogsResponse>({ url: '/client-catalog' });
    }
};