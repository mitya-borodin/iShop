import { priceEnum } from "../enums/priceEnum";

export const priceSet: Set<string> = new Set([
  priceEnum.wholesale,
  priceEnum.retail,
  priceEnum.special,
]);
