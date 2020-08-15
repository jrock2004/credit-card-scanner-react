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
      console.log('Need image for elo');

      return 'other';
    case 'hipercard':
      console.log('Need image for hipercard');

      return 'other';
    case 'jcb':
      return 'jCB';
    case 'laser':
      console.log('Need image for laser');

      return 'other';
    case 'maestro':
      console.log('Need image for maestro');

      return 'other';
    case 'mastercard':
      return 'masterCard';
    case 'mir':
      console.log('Need image for mir');

      return 'other';
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
