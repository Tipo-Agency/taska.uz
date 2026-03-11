/** Форматирует ввод в полный номер +998 90 123 45 67 */
export const formatUzPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  let local = digits.startsWith('998') ? digits.slice(3) : digits;
  local = local.slice(0, 9);
  const part1 = local.slice(0, 2);
  const part2 = local.slice(2, 5);
  const part3 = local.slice(5, 7);
  const part4 = local.slice(7, 9);
  let formatted = '+998';
  if (part1) formatted += ` ${part1}`;
  if (part2) formatted += ` ${part2}`;
  if (part3) formatted += ` ${part3}`;
  if (part4) formatted += ` ${part4}`;
  return formatted;
};

/** Форматирует только локальную часть (90 123 45 67) для отображения в поле с префиксом +998 */
export const formatUzPhoneLocal = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  let local = digits.startsWith('998') ? digits.slice(3) : digits;
  local = local.slice(0, 9);
  const part1 = local.slice(0, 2);
  const part2 = local.slice(2, 5);
  const part3 = local.slice(5, 7);
  const part4 = local.slice(7, 9);
  if (!part1) return '';
  let formatted = part1;
  if (part2) formatted += ` ${part2}`;
  if (part3) formatted += ` ${part3}`;
  if (part4) formatted += ` ${part4}`;
  return formatted;
};

export const toFullUzPhone = (local: string): string => {
  const digits = local.replace(/\D/g, '');
  if (!digits) return '';
  return formatUzPhone('998' + digits);
};

