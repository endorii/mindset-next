import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosResponse } from "axios";
import { Area, City, Warehouse } from "./interfaces/nova-post.interface";

@Injectable()
export class NovaPostService {
    private readonly API_BASE_URL = "https://api.novaposhta.ua/v2.0/json/";
    private readonly apiKey: string | undefined;

    constructor(private configService: ConfigService) {
        this.apiKey = this.configService.get<string>("NOVA_POST_API_KEY");
    }

    async getAreas(): Promise<Area[]> {
        const response: AxiosResponse<{ success: boolean; data: Area[] }> = await axios.post(
            this.API_BASE_URL,
            {
                apiKey: this.apiKey,
                modelName: "Address",
                calledMethod: "getAreas",
                methodProperties: {},
            }
        );

        if (response.data.success) {
            return response.data.data;
        }
        throw new InternalServerErrorException("Failed to fetch areas");
    }

    async getCitiesByArea(areaRef: string): Promise<City[]> {
        const response: AxiosResponse<{ success: boolean; data: City[] }> = await axios.post(
            this.API_BASE_URL,
            {
                apiKey: this.apiKey,
                modelName: "Address",
                calledMethod: "getCities",
                methodProperties: { AreaRef: areaRef },
            }
        );

        if (response.data.success) {
            return response.data.data;
        }
        throw new InternalServerErrorException("Failed to fetch cities");
    }

    async getWarehouses(cityRef: string): Promise<Warehouse[]> {
        const response: AxiosResponse<{ success: boolean; data: Warehouse[] }> = await axios.post(
            this.API_BASE_URL,
            {
                apiKey: this.apiKey,
                modelName: "Address",
                calledMethod: "getWarehouses",
                methodProperties: { CityRef: cityRef },
            }
        );

        if (response.data.success) {
            return response.data.data;
        }
        throw new InternalServerErrorException("Failed to fetch warehouses");
    }
}
