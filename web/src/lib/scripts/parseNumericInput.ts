const countLeadingZeros = (str: string) => {
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '0') {
      count++;
    } else {
      break;
    }
  }

  return count;
};

const parseNumericInputInner = (input: string, decimals: number) => {
  input = input.replace(/,/g, '.');
  const dotCount = input.split('.').length - 1;

  if (dotCount > 1) {
    return '';
  }

  if (dotCount === 0) {
    const parsed = parseInt(input);
    if (isNaN(parsed)) return '';
    return parsed.toString();
  }

  const endsWithDot = input.charAt(input.length - 1) === '.';
  if (dotCount === 1 && endsWithDot && decimals > 0) {
    const parsed = parseInt(input);
    if (isNaN(parsed)) return '';
    return `${parsed}.`;
  }

  if (dotCount === 1) {
    const [left, right] = input.split('.').map((v) => parseInt(v));
    if (!isNaN(left) && isNaN(right)) {
      if (input.charAt(input.length - 1) === '.') {
        return `${left}.`;
      }
      return left.toString();
    } else if (isNaN(left)) {
      return '';
    }

    if (right.toString().length > decimals) {
      return `${left}.${'0'.repeat(countLeadingZeros(input.split('.')[1]))}${
        right.toString().slice(0, decimals) !== '0' ? right.toString().slice(0, decimals) : ''
      }`;
    }

    return `${left}.${'0'.repeat(countLeadingZeros(input.split('.')[1]))}${right !== 0 ? right : ''}`;
  }

  return '';
};

const parseNumericInput = (input: string, decimals: number) => {
  const parts = parseNumericInputInner(input, decimals).split('.');
  if (parts.length === 2 && parts[1].length > decimals) {
    parts[1] = parts[1].substring(0, decimals);
  }
  return parts.join('.');
};

export default parseNumericInput;
