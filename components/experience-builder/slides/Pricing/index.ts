import type { CompletableSlide } from 'models/application';
import type { Currency } from 'models/experience-interface';

import Pricing from './Pricing';

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