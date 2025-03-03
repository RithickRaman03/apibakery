import { Product } from "../models/init.js";
import DatabaseError from "../models/error.js";

class ProductService {
  static async list() {
    try {
      return Product.findMany();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return await Product.findUnique({ where: { id } });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      return await Product.create({ data });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return await Product.update({
        where: { id },
        data,
      });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      await Product.delete({ where: { id } });
      return true;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default ProductService;
