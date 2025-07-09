import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { homeService } from '@/api/services/homeService';
import { HomeResponse } from '@/api/queryTypes/Home';
import { HOME_QUERY_KEYS } from '@/api/queryKeys';

export const useHomeData = (
    options?: Omit<UseQueryOptions<HomeResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<HomeResponse>({
        queryKey: HOME_QUERY_KEYS.HOME_DATA,
        queryFn: () => homeService.getHomeData(),
        ...options,
    });
};