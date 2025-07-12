import {
    useQuery,
    UseQueryOptions
} from '@tanstack/react-query';
import { catalogService } from '@/api/services/catalogService';
import { GetCatalogsResponse } from '@/api/queryTypes/Catalog';
import {CATALOG_QUERY_KEYS} from "@/api/queryKeys";

export const useCatalogs = (
    options?: Omit<UseQueryOptions<GetCatalogsResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<GetCatalogsResponse>({
        queryKey: CATALOG_QUERY_KEYS.CATALOGS_LIST(),
        queryFn: () => catalogService.getCatalogs(),
        ...options,
    });
};