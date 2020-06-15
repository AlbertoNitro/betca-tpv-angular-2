export class AppEndpoints {

  static ADMINS_DB = '/admins/db';

  static ARTICLES = '/articles';

  static ARTICLES_FAMILY = '/articles-family';
  static ARTICLES_FAMILY_COMPOSITE = '/familydescription';
  static CREATE_ARTICLES_FAMILY = '/create-articles-family';

  static CASHIER_CLOSURES = '/cashier-closures';
  static CASHIER_CLOSURES_LAST = AppEndpoints.CASHIER_CLOSURES + '/last';
  static CASHIER_CLOSURES_LAST_STATE = AppEndpoints.CASHIER_CLOSURES_LAST + '/state';
  static CASH_MOVEMENT_DEPOSIT = AppEndpoints.CASHIER_CLOSURES_LAST + '/deposit';
  static CASH_MOVEMENT_WITHDRAWAL = AppEndpoints.CASHIER_CLOSURES_LAST + '/withdrawal';
  static CASHIER_CLOSURE_SEARCH = AppEndpoints.CASHIER_CLOSURES + '/search';
  static CASHIER_CLOSURE_SEARCH_BY_PARAMS = AppEndpoints.CASHIER_CLOSURES + '/search-by-params';

  static CUSTOMER_DISCOUNTS = '/customer-discounts';
  static CUSTOMER_POINTS = '/customer-points';

  static SYSTEM_APP_INFO = '/system/app-info';

  static TICKETS = '/tickets';
  static GIFT_TICKETS = '/gift-tickets';

  static TICKET_TRACKING = '/ticket-tracking';

  static TRACKING = '/tracking';

  static USERS = '/users';

  static USER_PASSWORD = '/users/password';

  static BUDGETS = '/budgets';

  static ORDERS = '/orders';

  static ORDERS_CLOSE = '/close';

  static VOUCHERS = '/vouchers';

  static PRINT = '/print';

  static PROVIDERS = '/providers';

  static INVOICES = '/invoices';

  static SEARCH = '/search';

  static NEGATIVE = '/negative';

  static SENDINGS = '/sendings';

  static STOCK_ALARM = '/stock-alarms';

  static STOCK = '/stock';

  static STAFFS = '/staffs';

  static OFFERS = 'offers';

  static SIZES = '/sizes';

  static MESSAGES = '/messages';

  static TO_USER = '/to-user';

  static UNREAD = '/unread';

  static VAT_MANAGEMENT = '/vat-management';

  static TAGS = '/tags';
}
