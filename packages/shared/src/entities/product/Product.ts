import { Entity, EntityId, Validation, ValidationResult } from "@rtcts/isomorphic";
import { propertiesDictionary } from "../../dictionaries/propertiesDictionary";
import { propertiesEnum } from "../../enums/propertiesEnum";
import { ClothesSizeProperty } from "./properties/ClothesSizeProperty";
import { ColorProperty } from "./properties/ColorProperty";
import { NumberProperty } from "./properties/NumberProperty";
import { PriceProperty } from "./properties/PriceProperty";
import { ShoesSizeProperty } from "./properties/ShoesSizeProperty";
import { StringProperty } from "./properties/StringProperty";

export interface ProductData {
  [index: string]: any;
  readonly id?: string;
  readonly tags?: string[];
  readonly properties?: Array<
    | StringProperty
    | NumberProperty
    | PriceProperty
    | ColorProperty
    | ClothesSizeProperty
    | ShoesSizeProperty
  >;
}

export class Product implements Entity {
  [index: string]: any;
  readonly id?: string;
  readonly tags?: string[];
  readonly properties?: Array<
    | StringProperty
    | NumberProperty
    | PriceProperty
    | ColorProperty
    | ClothesSizeProperty
    | ShoesSizeProperty
  >;

  constructor(data: Partial<EntityId> & Partial<ProductData>) {
    if (data) {
      if (typeof data.id === "string") {
        this.id = data.id;
      }

      if (Array.isArray(data.tags)) {
        this.tags = data.tags.filter((tag) => typeof tag === "string");
      }

      if (Array.isArray(data.properties)) {
        this.properties = [];

        data.properties.forEach((property) => {
          if (property.type === propertiesEnum.string) {
            this.properties?.push(new StringProperty(property));
          }
          if (property.type === propertiesEnum.number) {
            this.properties?.push(new NumberProperty(property));
          }
          if (property.type === propertiesEnum.price) {
            this.properties?.push(new PriceProperty(property));
          }
          if (property.type === propertiesEnum.color) {
            this.properties?.push(new ColorProperty(property));
          }
          if (property.type === propertiesEnum.clothesSize) {
            this.properties?.push(new ClothesSizeProperty(property));
          }
          if (property.type === propertiesEnum.shoesSize) {
            this.properties?.push(new ShoesSizeProperty(property));
          }
        });
      }
    } else {
      throw new Error(`${this.constructor.name}(data) data should be defined`);
    }
  }
  public isEntity(): this is { id: string } {
    this.isInsert();

    if (typeof this.id !== "string") {
      throw new Error(`${this.constructor.name}.is should be string`);
    }

    return true;
  }
  public hasId(): this is { id: string } {
    return typeof this.id === "string";
  }

  public isInsert(): this is Required<ProductData> {
    if (!Array.isArray(this.tags)) {
      throw new Error(`${this.constructor.name}.tags should be Array<string>`);
    }

    this.tags.forEach((tag, index) => {
      if (typeof tag !== "string") {
        throw new Error(`${this.constructor.name}.tags[${index}] should be string`);
      }
    });

    if (!Array.isArray(this.properties)) {
      throw new Error(`${this.constructor.name}.properties should be Array`);
    }

    this.properties.forEach((property, index) => {
      if (!propertiesDictionary[property.type]) {
        const classNames = Object.values(propertiesDictionary)
          .map((constructor) => constructor.name)
          .join(" | ");

        throw new Error(
          `${this.constructor.name}.properties[${index}] should be instance of ${classNames}`,
        );
      }

      if (!(property instanceof propertiesDictionary[property.type])) {
        throw new Error(
          `${this.constructor.name}.properties[${index}] should be instance of ${
            propertiesDictionary[property.type].name
          }`,
        );
      }
    });

    return true;
  }

  public validation(): ValidationResult {
    const validates: Validation[] = [];

    this.properties?.forEach((property) => {
      property
        .validation()
        .toValidation()
        .forEach((validation) => {
          validates.push(
            new Validation({
              ...validation.toObject(),
              field: `properties.${validation.field as string}`,
            }),
          );
        });
    });

    return new ValidationResult(validates);
  }

  toObject(): ProductData {
    return {
      ...(typeof this.id === "string" ? { id: this.id } : {}),
      tags: this.tags,
      properties: this.properties,
    };
  }

  toJSON(): ProductData {
    return this.toObject();
  }

  toJS(): ProductData {
    return this.toObject();
  }
}
