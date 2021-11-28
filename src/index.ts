import dotenv from 'dotenv';
dotenv.config(); // make sure to call this before importing from other files

import { ArgumentParser } from 'argparse';
import { DateTime } from 'luxon';
import { cryptoCompareApi } from './cryptoCompareApi/cryptoCompareApi';
import { GetPricesRequest, GetPricesResponse } from './cryptoCompareApi/types';
import { getPriceDisplayInformation } from './helpers/getPriceDisplayInformation';

export type Args = {
    coinSymbol: string;
    date: DateTime;
    exchange: string;
    currency: string;
};

const main = async (args: Args) => {
    try {
        const request: GetPricesRequest = {
            targetCurrency: args.currency,
            coinSymbol: args.coinSymbol,
            onOrBefore: args.date,
            limit: 1,
            exchange: args.exchange,
        };

        const response: GetPricesResponse = await cryptoCompareApi.getPrices(request);
        const priceDisplayInformation = getPriceDisplayInformation(args, response);

        console.log('Price information: ', priceDisplayInformation);
    } catch (error) {
        console.error(error);
    }
};

const getArguments = (): Args => {
    const parser = new ArgumentParser({
        description: '',
    });

    parser.add_argument('coinSymbol', {
        help: "The symbol of the coin to get price information for (for example, 'Btc')",
    });

    parser.add_argument('date', {
        help: 'The date to get the price information. This should be formatted like yyyy-mm-ddThh:mm',
        type: (dateString: string): DateTime => {
            const date: DateTime = DateTime.fromISO(dateString);
            if (!date.isValid) throw new Error(date.invalidExplanation ?? '');
            return date;
        },
    });

    parser.add_argument('-e', '--exchange', {
        default: 'cccagg',
        help: 'The exchange to get the price information from. Default is cccaggg.',
    });

    parser.add_argument('-c', '--currency', {
        default: 'USD',
        help: 'The currency used to display the price information. Default is USD.',
    });

    const args: Args = parser.parse_args();
    return args;
};

const args = getArguments();
void main(args);
