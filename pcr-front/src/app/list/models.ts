import { fromCouple, modelDataMatcher, parseArrayWith } from 'src/utils/model-utils';

export class PcrItems {
    public id?: number = null;
    public name?: string = null;
    public chromosome?: string = null;
    public start?: number = null;
    public end?: number = null;
    public percentage?: number = null;

    constructor(data: Partial<PcrItems> = {}) {
        modelDataMatcher(data, this);
    }

    public static fromServerData(data: Partial<PcrItems>): PcrItems {
        return fromCouple(data, PcrItems, {
        });
    }
}


export interface ServerPcrList {
    items?: PcrItems[];
    pagination: {
        current_item_count?: number;
        current_page_number?: number;
        pagination_size?: number;
        total_item_count?: number;
        total_page_count?: number;
    };
}


export class PcrList {
    public items?: PcrItems[] = [];
    public pagination: {
        current_item_count?: number;
        current_page_number?: number;
        pagination_size?: number;
        total_item_count?: number;
        total_page_count?: number;
    } = null;

    constructor(data: Partial<PcrList> = {}) {
        modelDataMatcher(data, this);
    }

    public static fromServerData(data: Partial<ServerPcrList>): PcrList {
        return fromCouple(data, PcrList, {
            ...parseArrayWith('items', PcrItems.fromServerData)
        });
    }
}
