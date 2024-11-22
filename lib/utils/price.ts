export function isValidPriceFormat(priceString: string){
    const decimalRegex = /^\d{1,6}(\.\d{1,2})?$/; // Regular expression for decimal(8,2)
    return decimalRegex.test(priceString.toString());
}