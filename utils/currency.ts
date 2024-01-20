export class Currency {

    /**
     * @desc convert decimal to USD 
     * @param decimal
     * @returns 
     */
  static DecimalToUSD = function (decimal: number) {
    return decimal.toLocaleString("en-US", {style:"currency", currency:"USD"});
  };
}
