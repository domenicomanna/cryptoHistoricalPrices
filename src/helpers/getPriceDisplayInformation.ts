import { DateTime } from 'luxon';
import { Args } from '..';
import { GetPricesResponse, PriceInformation } from '../cryptoCompareApi/types';

export type PriceDisplayInformation = {
    coin: string;
    date: string;
    high: number;
    low: number;
    average: number;
};

export const getPriceDisplayInformation = (args: Args, response: GetPricesResponse): PriceDisplayInformation => {
    if (response.Response.toLowerCase() === 'error') {
        throw new Error(response.Message);
    }
    const prices: PriceInformation[] = response.Data.Data;
    if (prices.length === 0) {
        throw new Error(`No data before ${args.date} found`);
    }

    const lastEntry: PriceInformation = prices[prices.length - 1];
    const date = DateTime.fromSeconds(lastEntry.time);

    const priceDisplayInformation: PriceDisplayInformation = {
        coin: args.coinSymbol,
        date: date.toISO(),
        high: lastEntry.high,
        low: lastEntry.low,
        average: (lastEntry.high + lastEntry.low) / 2,
    };

    return priceDisplayInformation;
};
