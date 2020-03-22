import {AdminsService} from './home/admins.service';
import {ArticleService} from './home/shared/article.service';
import {CashierClosureService} from './home/cashier-opened/cashier-closure/cashier-closure.service';
import {CashierService} from './home/shared/cashier.service';
import {ShoppingCartService} from './home/cashier-opened/shopping-cart/shopping-cart.service';
import {StockAlarmService} from './home/stock-alarm/stock-alarm.service';
import {SystemService} from './home/system.service';
import {UserService} from './home/users/user.service';
import {VoucherService} from './home/shared/voucher.service';
import {AdvancedArticlesSearchService} from './home/cashier-opened/advanced-search/advanced-articles-search.service';
import {ArticlesFamilyViewService} from './home/cashier-opened/articles-family/articles-family-view.service';
import {OrderService} from './home/orders/order.service';
import {ProviderService} from './home/shared/provider.service';
import {SendingsService} from './home/sendings/sendings.service';
import {InvoiceService} from './home/shared/invoice/invoice.service';
import {OfferService} from './home/shared/offer.service';
import {CashMovementsService} from './home/cashier-opened/cashier-closure/cash-movements/cash-movements.service';
import {TicketService} from './home/shared/ticket.service';
import {CashierClosureMocks} from './home/cashier-opened/cashier-closure/search/cashier-closure-mocks.service';

export class AppServices {
  public static SERVICES = [
    AdminsService,
    ArticleService,
    AdvancedArticlesSearchService,
    CashierClosureService,
    CashierService,
    OrderService,
    ShoppingCartService,
    StockAlarmService,
    SystemService,
    UserService,
    VoucherService,
    ProviderService,
    ArticlesFamilyViewService,
    SendingsService,
    InvoiceService,
    OfferService,
    CashMovementsService,
    TicketService,
    CashierClosureMocks
  ];
}
