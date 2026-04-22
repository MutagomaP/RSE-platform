import { SecuritiesService, CreateSecurityDto, FindSecuritiesQueryDto } from './securities.service';
export declare class SecuritiesController {
    private securitiesService;
    constructor(securitiesService: SecuritiesService);
    findAll(query: FindSecuritiesQueryDto): Promise<import("./security.entity").Security[]>;
    getMarketSummary(): Promise<{
        totalListings: number;
        totalMarketCap: number;
        gainers: import("./security.entity").Security[];
        losers: import("./security.entity").Security[];
    }>;
    findByTicker(ticker: string): Promise<import("./security.entity").Security>;
    findOne(id: string): Promise<import("./security.entity").Security>;
    create(dto: CreateSecurityDto): Promise<import("./security.entity").Security>;
    updatePrice(id: string, price: number): Promise<import("./security.entity").Security>;
}
