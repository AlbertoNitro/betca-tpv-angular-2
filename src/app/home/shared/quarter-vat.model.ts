import {Quarter} from './quarter.enum';
import {TaxModel} from './tax.model';

export interface QuarterVatModel {
  quarter: Quarter;
  taxes: TaxModel[];
}
