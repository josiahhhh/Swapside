export interface StockMovers {
  symbol: string;
  name: string;
  change: number;
  price: number;
  changesPercentage: number;
}

export interface StockPerformance {
  sector: string;
  changesPercentage: string;
}

export interface StockIpo {
  date: string;
  company: string;
  symbol: string;
  exchange: string;
  actions: string;
  princeRange: string;
  shares: number;
}

export interface StockEarning {
  date: string;
  symbol: string;
  eps: number;
  epsEstimated: number;
  time: string;
  revenue: number;
  revenueEstimated: number;
  updatedFromDate: string;
  fiscalDateEnding: string;
}

export interface EarningsCalendarFormat {
  to: string;
  from: string;
}

export interface StockNews {
  image: string;
  publishedDate?: string;
  site?: string;
  symbol?: string;
  text?: string;
  title?: string;
  url?: string;
}

export interface BaseStock {
  address: string;
  beta: number;
  ceo: string;
  change: number;
  cik: string;
  city: string;
  companyName: string;
  country: string;
  currency: string;
  website: string;
  fullTimeEmployees: string;
  industry: string;
  symbol: string;
  image: string;
  exchange: string;
  description: string;
  price: string;
  sector: string;
}

export interface StockFinance {
  date: string;
  symbol: string;
  reportedCurrency: string;
  calendarYear: string;
  fillingDate: string;
  acceptedDate: string;
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  grossProfitRatio: number;
  researchAndDevelopmentExpenses: number;
  generalAndAdministrativeExpenses: number;
  sellingAndMarketingExpenses: number;
  sellingGeneralAndAdministrative: number;
  otherExpenses: number;
  operatingExpenses: number;
  costAndExpenses: number;
  interestExpense: number;
  depreciationAndAmortization: number;
  ebitda: number;
  ebitdaratio: number;
  operatingIncome: number;
  netIncome: number;
  profitMargin: number;
  link: string;
  finalLink: string;
}

export type Frequency =
  | "Annually"
  | "Monthly"
  | "Fortnightly"
  | "Weekly"
  | "Daily";

export interface Strategy {
  initialDeposit: number;
  regularDeposit: number;
  depositFrequency: Frequency;
  compoundFrequency: Frequency;
  numberOfYears: number;
  annualInterestRate: number;
}

export interface YearResult {
  yearNumber: number;
  initialDeposit: number;
  cumulativeRegularDeposits: number;
  cumulativeInterest: number;
  cumulativeTotal: number;
}

export type Result = Array<YearResult> | undefined;
