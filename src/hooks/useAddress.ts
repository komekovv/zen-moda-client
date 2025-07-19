import {useMutation, UseMutationOptions, useQuery, UseQueryOptions, useQueryClient} from "@tanstack/react-query";
import {ListResponse} from "@/api/queryTypes/Common";
import {LocationCreateRequest, LocationResponse} from "@/api/queryTypes/Location";
import {locationService} from "@/api/services/locationService";

export const useUserLocation = (
    options?: Omit<UseQueryOptions<ListResponse<LocationResponse>>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<ListResponse<LocationResponse>>({
        queryKey: ['user_locations'],
        queryFn: () => locationService.getUserLocations(),
        ...options,
    });
};

export const usePostUserLocationMutation = (
    options?: UseMutationOptions<LocationResponse, Error, LocationCreateRequest>
) => {
    const queryClient = useQueryClient();

    return useMutation<LocationResponse, Error, LocationCreateRequest>({
        mutationFn: (data: LocationCreateRequest) => locationService.postUserLocation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_locations'] });
        },
        ...options,
    });
};

export const usePutUserLocationMutation = (
    options?: UseMutationOptions<LocationResponse, Error, {id: string, data: LocationCreateRequest}>
) => {
    const queryClient = useQueryClient();

    return useMutation<LocationResponse, Error, {id: string, data: LocationCreateRequest}>({
        mutationFn: ({id, data}) => locationService.putUserLocation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_locations'] });
        },
        ...options,
    });
};

export const useDeleteUserLocationMutation = (
    options?: UseMutationOptions<any, Error, string>
) => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, string>({
        mutationFn: (id: string) => locationService.deleteUserLocation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_locations'] });
        },
        ...options,
    });
};