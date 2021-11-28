import axios from 'axios';
import { DateTime } from 'luxon';
import { GetPricesRequest, GetPricesResponse } from './types';

const _baseApiUrl = 'https://min-api.cryptocompare.com/data/v2';

const getPrices = async (request: GetPricesRequest): Promise<GetPricesResponse> => {
    const { limit, coinSymbol, onOrBefore, targetCurrency } = request;
    const query = {
        fsym: coinSymbol,
        tsym: targetCurrency,
        limit: limit.toString(),
        toTs: onOrBefore.toSeconds().toString(),
        api_key: process.env.CRYPTO_COMPARE_API_KEY ?? '',
        e: request.exchange,
    };
    const endpoint = getEndPoint(onOrBefore);
    const response = await axios.get(`${_baseApiUrl}/${endpoint}?${new URLSearchParams(query).toString()}`);
    return response.data as GetPricesResponse;
};

const getEndPoint = (date: DateTime): string => {
    const sevenDaysAgo = DateTime.now().minus({ days: 7 });
    if (date < sevenDaysAgo) {
        console.log('Given date is before seven days ago. Hourly endpoint is used');
        return `histohour`;
    } else {
        // the minute endpoint only stores the data for the last 7 seven days
        console.log(`Given date is within the last 7 days. Minute endpoint is used`);
        return `histominute`;
    }
};

export const cryptoCompareApi = {
    getPrices,
};
