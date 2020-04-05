import { Provider } from './provider.model';

export interface Article {
  code: string;
  description: string;
  retailPrice?: number;
  reference?: string;
  stock?: number;
  provider?: string;
  discontinued?: boolean;
  registrationDate?: Date;
  tax?: number;
  soldUnits?: number;
}

export interface ArticleWithProvider {
  code: string;
  description: string;
  retailPrice?: number;
  reference?: string;
  stock?: number;
  provider?: Provider;
  discontinued?: boolean;
  registrationDate?: Date;
  tax?: number;
  soldUnits?: number;
}