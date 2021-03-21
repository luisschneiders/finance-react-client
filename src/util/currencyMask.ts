/**
 * 
 * @param locale // E.g. de-DE, en-AU, en-US
 * @param value // Props of the group that has the amount
 * @param currency // EUR, AUD US, CAD, Real
 */
export const currencyMask = (locale: string, value: number, currency: string) => {
  return new Intl.NumberFormat(locale, 
          { style: 'currency', currency }
        ).format(value);
}
