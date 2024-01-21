export default class Product {
  constructor(
    _id,
    __v,
    userId,
    name,
    brand,
    description,
    imageUrl,
    price,
    createdAt,
    updatedAt
  ) {
    this._id = _id;
    this.__v = __v;
    this.userId = userId;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json) {
    const {
      _id,
      __v,
      userId,
      name,
      brand,
      description,
      imageUrl,
      price,
      createdAt,
      updatedAt,
    } = json;

    return new Product(
      _id,
      __v,
      userId,
      name,
      brand,
      description,
      imageUrl,
      price,
      createdAt,
      updatedAt
    );
  }

  static toJson() {
    return {
      _id: this._id,
      __v: this.__v,
      userId: this.userId,
      name: this.name,
      brand: this.brand,
      description: this.description,
      imageUrl: this.imageUrl,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static listKey () {
      return Object.keys(this.toJson());
  }
}
