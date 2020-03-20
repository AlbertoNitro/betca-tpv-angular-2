export class AppEndpoints {

  static ADMINS_DB = '/admins/db';

  static ARTICLES = '/articles';

  static ARTICLES_FAMILY = '/articles-family';
  static ARTICLES_FAMILY_COMPOSITE = '/familydescription';

  static CASHIER_CLOSURES = '/cashier-closures';
  static CASHIER_CLOSURES_LAST = AppEndpoints.CASHIER_CLOSURES + '/last';
  static CASHIER_CLOSURES_LAST_STATE = AppEndpoints.CASHIER_CLOSURES_LAST + '/state';
  static CASH_MOVEMENT_DEPOSIT = AppEndpoints.CASHIER_CLOSURES_LAST + '/deposit';
  static CASH_MOVEMENT_WITHDRAWAL = AppEndpoints.CASHIER_CLOSURES_LAST + '/withdrawal';

  static CUSTOMER_DISCOUNTS = '/customer-discounts';

  static SYSTEM_APP_INFO = '/system/app-info';

  static TICKETS = '/tickets';

  static USERS = '/users';

  static BUDGETS = '/budgets';

  static ORDERS = '/orders';

  static ORDERS_CLOSE = '/close';

  static VOUCHERS = '/vouchers';

  static PRINT = '/print';

  static PROVIDERS = '/providers';

  static INVOICES = '/invoices';

  static NEGATIVE = '/negative';

  static SENDINGS = '/sendings';

  static STOCK_ALARM = '/stock-alarm';

  static STAFFS = '/staffs';

  static OFFERS = 'offers';
}
