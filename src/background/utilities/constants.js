const getDate = () => {
    return new Date().toLocaleDateString('en-ca')
}

export const CRYPTO_RATES_API = 'a80e850f-aef8-4994-ae7c-64d611ec0cc9';
export const CRYPTO_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
export const CRYPTO_NEWS = `https://newsapi.org/v2/everything?q=nft&from=${getDate()}&sortBy=publishedAt&apiKey=093808bf1b1a40d7855a082cac4c1058`;
export const NOTES_BASE = 'https://crypto-info-ee353-default-rtdb.europe-west1.firebasedatabase.app//notes.json';
export const UPDATE_NEWS = 1000 * 60 * 60;
export const UPDATE_RATES = 260000;


export default {
    CRYPTO_RATES_API,
    CRYPTO_URL,
    CRYPTO_NEWS,
    UPDATE_NEWS,
    UPDATE_RATES,
    NOTES_BASE,
}
