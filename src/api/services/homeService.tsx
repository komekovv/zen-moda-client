import { api } from '@/api/apiHelper';
import { HomeResponse } from '@/api/queryTypes/Home';

export const homeService = {
    getHomeData: async (): Promise<HomeResponse> => {
        return api.publicGet<HomeResponse>({
            url: '/client/home'
        });
    }
};