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

    async getAreas() {
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
            const areas = response.data.data;

            return areas.map((area) => ({
                // ...area,
                Ref: area.Ref,
                Description: this.transliterateToLatin(area.Description),
            }));
        }
        throw new InternalServerErrorException("Failed to fetch areas");
    }

    async getCitiesByArea(areaRef: string) {
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
            const cities = response.data.data;

            return cities.map((city) => ({
                // ...city,
                Ref: city.Ref,
                Description: this.transliterateToLatin(city.Description),
            }));
        }
        throw new InternalServerErrorException("Failed to fetch cities");
    }

    async getWarehouses(cityRef: string) {
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
            const warehouses = response.data.data;

            return warehouses.map((warehouse) => ({
                // ...warehouse,
                Ref: warehouse.Ref,
                Description: this.transliterateToLatin(warehouse.Description),
            }));
        }
        throw new InternalServerErrorException("Failed to fetch warehouses");
    }

    private transliterateToLatin(text: string): string {
        const ukToLatin: Record<string, string> = {
            а: "a",
            б: "b",
            в: "v",
            г: "h",
            ґ: "g",
            д: "d",
            е: "e",
            є: "ie",
            ж: "zh",
            з: "z",
            и: "y",
            і: "i",
            ї: "i",
            й: "i",
            к: "k",
            л: "l",
            м: "m",
            н: "n",
            о: "o",
            п: "p",
            р: "r",
            с: "s",
            т: "t",
            у: "u",
            ф: "f",
            х: "kh",
            ц: "ts",
            ч: "ch",
            ш: "sh",
            щ: "shch",
            ь: "'",
            ю: "iu",
            я: "ia",
            "'": "",
            А: "A",
            Б: "B",
            В: "V",
            Г: "H",
            Ґ: "G",
            Д: "D",
            Е: "E",
            Є: "Ie",
            Ж: "Zh",
            З: "Z",
            И: "Y",
            І: "I",
            Ї: "I",
            Й: "I",
            К: "K",
            Л: "L",
            М: "M",
            Н: "N",
            О: "O",
            П: "P",
            Р: "R",
            С: "S",
            Т: "T",
            У: "U",
            Ф: "F",
            Х: "Kh",
            Ц: "Ts",
            Ч: "Ch",
            Ш: "Sh",
            Щ: "Shch",
            Ь: "'",
            Ю: "Iu",
            Я: "Ia",
        };

        return text
            .split("")
            .map((char) => ukToLatin[char] || char)
            .join("");
    }
}
