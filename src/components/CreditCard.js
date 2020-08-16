import React, { useState } from 'react';

import CreditCardField from './CreditCardField';
import {
  creditCardImage,
  getCardType,
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
  formatPostalCode,
} from '../utils';

export default function CreditCard() {
  const [cardImage, setCardImage] = useState(creditCardImage.other),
    [card, setCard] = useState({
      cardNumber: '',
      cardExpire: '',
      cardCvc: '',
      cardPostalCode: '',
      cardName: '',
    });

  function handleInputChange({ target }) {
    let name = target.name,
      value = target.value,
      cardType = card.cardType;

    if (name === 'cardNumber') {
      value = formatCreditCardNumber(value);
      cardType = getCardType(value);

      setCardImage(creditCardImage[cardType]);
    }

    if (name === 'cardExpire') {
      value = formatExpirationDate(value);
    }

    if (name === 'cardCvc') {
      value = formatCVC(value, card.cardNumber);
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
            <img className="absolute cc-image" src={cardImage} alt="Credit card" />
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
          <div className="flex flex-col mb-2">
            <label htmlFor="cc-name" className="text-sm font-semibold text-gray-700">
              Name on card
            </label>
            <input
              className="w-full p-3 border rounded-sm"
              id="cc-name"
              name="cardName"
              type="text"
              value={card.cardName}
              autoComplete="cc-name"
              onChange={handleInputChange}
            />
          </div>
        </form>
      </section>
    </React.Fragment>
  );
}
