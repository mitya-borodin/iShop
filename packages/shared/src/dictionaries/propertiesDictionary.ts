import { ClothesSizeProperty } from "../entities/product/properties/ClothesSizeProperty";
import { ColorProperty } from "../entities/product/properties/ColorProperty";
import { NumberProperty } from "../entities/product/properties/NumberProperty";
import { PriceProperty } from "../entities/product/properties/PriceProperty";
import { ShoesSizeProperty } from "../entities/product/properties/ShoesSizeProperty";
import { StringProperty } from "../entities/product/properties/StringProperty";
import { propertiesEnum } from "../enums/propertiesEnum";

export const propertiesDictionary = Object.freeze({
  [propertiesEnum.string]: StringProperty,
  [propertiesEnum.number]: NumberProperty,
  [propertiesEnum.price]: PriceProperty,
  [propertiesEnum.color]: ColorProperty,
  [propertiesEnum.clothesSize]: ClothesSizeProperty,
  [propertiesEnum.shoesSize]: ShoesSizeProperty,
});
