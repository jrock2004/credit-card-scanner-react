import React, { useState } from 'react';

import CreditCardField from './CreditCardField';
import {
  creditCardImage,
  getCardType,
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
  formatPostalCode,
  validateCreditCardNumber,
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

    console.log(name, value);

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

    setCard({ ...card, [name]: value });
  }

  function validateCardNumber({ target }) {
    let value = target.value,
      isValid = validateCreditCardNumber(value),
      errorInput = document.querySelector('.cardNumberError');

    if (value !== '' && !isValid) {
      console.log(target, isValid);

      errorInput.innerHTML = 'Credit card number is invalid';
    } else {
      errorInput.innerHTML = '';
    }
  }

  return (
    <React.Fragment>
      <section className="max-w-68">
        <form autoComplete="on">
          <CreditCardField id="card-number" label="Credit card number" cssClass="relative mb-2">
            <img className="absolute cc-image" src={cardImage} alt="Credit card" />
            <input
              autocompletetype="cc-number"
              type="tel"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              pattern="[\d| ]{16,22}"
              className="w-full py-3 pl-16 pr-2 text-lg border rounded-sm"
              value={card.cardNumber}
              onChange={handleInputChange}
              onBlur={validateCardNumber}
            />
          </CreditCardField>
          <div className="mb-2 grid grid-cols-3 gap-3">
            <CreditCardField id="card-expire" label="Expiration" cssClass="test">
              <input
                type="tel"
                name="cardExpire"
                autocompletetype="cc-exp"
                placeholder="MM/YY"
                pattern="\d\d/\d\d"
                className="p-3 border rounded-sm"
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
                value={card.cardCvc}
                onChange={handleInputChange}
              />
            </CreditCardField>
            <CreditCardField
              id="postal-code"
              label="Postal Code"
              value={card.cardPostalCode}
              autoComplete="postal-code"
              handleInputChange={handleInputChange}
            />
          </div>
          <CreditCardField
            id="cardName"
            label="Name on card"
            cssClass="mb-2"
            value={card.cardName}
            autoComplete="cc-name"
            handleInputChange={handleInputChange}
          />
        </form>
      </section>
    </React.Fragment>
  );
}
