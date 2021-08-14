import Pricing from './Pricing';
import type { CompletableSlide } from 'models/application';
import type { Currency } from 'models/experience-interface';

export interface PricingProps extends CompletableSlide {
    pricePerPerson: number;
    privatePrice: number;
    currency: Currency;
    capacity: number;
    onPricePerPersonChange: (price: number) => void;
    onPrivatePriceChange: (price: number) => void;
    onCurrencyChange: (currency: Currency) => void;
}

export default Pricing;