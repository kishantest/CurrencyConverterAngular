export interface Currency {
  currencyCode: string,
  currencyName: string
}
export interface CurrencyListResult {
  success: boolean,
  currencies: Array<Currency>,
  errorCode: string,
  errorMessage: string
}

export interface ConvertCurrency {
  fromCurrencyCode: string,
  toCurrencyCode: string,
  amount: number
}

export interface ConvertCurrencyResult {
  fromCurrencyCode: string,
  toCurrencyCode: string,
  amount: number,
  rate: number,
  convertedAmount: number,
  success: boolean,
  errorCode: string,
  errorMessage: string
}
