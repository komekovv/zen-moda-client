import {api} from "@/api/apiHelper";
import {ListResponse} from "@/api/queryTypes/Common";
import {LocationResponse, LocationCreateRequest} from "@/api/queryTypes/Location";

export const locationService = {
    getUserLocations: async (): Promise<ListResponse<LocationResponse>> => {
        return api.privateGet<ListResponse<LocationResponse>>({url: `/address`});
    },
    postUserLocation: async (data: LocationCreateRequest): Promise<LocationResponse> => {
        return api.post<LocationCreateRequest, LocationResponse>({
            url: `/address`,
            data: data
        });
    },
    putUserLocation: async (id: string, data: LocationCreateRequest): Promise<LocationResponse> => {
        return api.put<LocationCreateRequest, LocationResponse>({
            url: `/address/${id}`,
            data: data
        });
    },
    deleteUserLocation: async (id: string): Promise<any> => {
        return api.delete<{}, any>({
            url: `/address/${id}`,
            data: {}
        })
    }
}