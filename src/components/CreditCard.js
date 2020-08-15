import React, { useState, useEffect } from 'react';

import CreditCardField from './CreditCardField';
import {
  getCardType,
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
  formatPostalCode,
} from '../utils';

export default function CreditCard() {
  const [card, setCard] = useState({
    creditCards: {
      americanExpress:
        'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/amex.svg?sanitize=true',
      dinersClub:
        'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/diners.svg?sanitize=true',
      discover:
        'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/discover.svg?sanitize=true',
      jCB:
        'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/jcb.svg?sanitize=true',
      masterCard:
        'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/mastercard.svg?sanitize=true',
      other:
        'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/generic.svg?sanitize=true',
      visa:
        'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/visa.svg?sanitize=true',
    },
    cardNumber: '',
    cardType: 'other',
    cardTypeImage:
      'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/generic.svg?sanitize=true',
    cardExpire: '',
    cardCvc: '',
    cardPostalCode: '',
  });

  useEffect(() => {
    const type = card.creditCards[card.cardType];

    setCard({ ...card, cardTypeImage: type });
  }, [card.cardType]);

  function handleInputChange({ target }) {
    let name = target.name,
      value = target.value,
      cardType = card.cardType;

    if (name === 'cardNumber') {
      value = formatCreditCardNumber(value);
      cardType = getCardType(value);
    }

    if (name === 'cardExpire') {
      value = formatExpirationDate(value);
    }

    if (name === 'cardCvc') {
      value = formatCVC(value);
    }

    if (name === 'cardPostalCode') {
      value = formatPostalCode(value);
    }

    setCard({ ...card, [name]: value, cardType });
  }

  return (
    <React.Fragment>
      <section className="max-w-68">
        <form autoComplete="on">
          <div className="relative flex flex-col mb-2">
            <label htmlFor="card-number" className="text-sm font-semibold text-gray-700">
              Credit card number
            </label>
            <img className="absolute cc-image" src={card.cardTypeImage} alt="Credit card" />
            <input
              autocompletetype="cc-number"
              type="tel"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              pattern="[\d| ]{16,22}"
              className="w-full py-3 pl-16 pr-2 text-lg border rounded-sm"
              required
              value={card.cardNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2 grid grid-cols-3 gap-3">
            <CreditCardField id="card-expire" label="Expiration">
              <input
                type="tel"
                name="cardExpire"
                autocompletetype="cc-exp"
                placeholder="MM/YY"
                pattern="\d\d/\d\d"
                className="p-3 border rounded-sm"
                required
                value={card.cardExpire}
                onChange={handleInputChange}
              />
            </CreditCardField>
            <CreditCardField id="card-cvc" label="CVC">
              <input
                type="tel"
                name="cardCvc"
                autocompletetype="cc-csc"
                pattern="\d{3,4}"
                className="p-3 border rounded-sm"
                required
                value={card.cardCvc}
                onChange={handleInputChange}
              />
            </CreditCardField>
            <CreditCardField id="postal-code" label="Postal Code">
              <input
                type="tel"
                name="cardPostalCode"
                autocompletetype="postal-code"
                className="p-3 border rounded-sm"
                required
                value={card.cardPostalCode}
                onChange={handleInputChange}
              />
            </CreditCardField>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
}
