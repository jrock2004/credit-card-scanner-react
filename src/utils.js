import Payment from 'payment';

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function getCardType(value) {
  const issuer = Payment.fns.cardType(value);

  switch (issuer) {
    case 'amex':
      return 'americanExpress';
    case 'dankort':
      console.log('Need image for dankort');

      return 'other';
    case 'dinersclub':
      return 'dinersClub';
    case 'discover':
      return 'discover';
    case 'elo':
      return 'elo';
    case 'hipercard':
      return 'hipercard';
    case 'jcb':
      return 'jCB';
    case 'laser':
      console.log('Need image for laser');

      return 'other';
    case 'maestro':
      return 'maestro';
    case 'mastercard':
      return 'masterCard';
    case 'mir':
      return 'mir';
    case 'troy':
      console.log('Need image for troy');

      return 'other';
    case 'unionpay':
      console.log('Need image for unionpay');

      return 'other';
    case 'visa':
      return 'visa';
    case 'visaelectron':
      console.log('Need image for visaelectron');

      return 'other';
    default:
      return 'other';
  }
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(
        10,
        15
      )}`;
      break;
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(
        10,
        14
      )}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(
        8,
        12
      )} ${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value, cardNumber) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (cardNumber) {
    const issuer = getCardType(cardNumber);

    maxLength = issuer === 'americanExpress' ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  // If autofill is returning MM/YYYY
  if (clearValue.length === 6) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(4, 6)}`;
  }

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function formatFormData(data) {
  return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}

export function formatPostalCode(value) {
  return value.slice(0, 5);
}

export const creditCardImage = {
  americanExpress:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/amex.svg?sanitize=true',
  dinersClub:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/diners.svg?sanitize=true',
  discover:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/discover.svg?sanitize=true',
  elo:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/elo.svg?sanitize=true',
  hipercard:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/hipercard.svg?sanitize=true',
  jCB:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/jcb.svg?sanitize=true',
  maestro:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/maestro.svg?sanitize=true',
  masterCard:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/mastercard.svg?sanitize=true',
  mir:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/mir.svg?sanitize=true',
  other:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/generic.svg?sanitize=true',
  visa:
    'https://github.com/aaronfagan/svg-credit-card-payment-icons/raw/master/mono/visa.svg?sanitize=true',
};
