import swaggerJsDoc from "swagger-jsdoc";

import tenantSchema from "./schemas/tenant.js";
import inventorySchema from "./schemas/inventory.js";
import languageSchema from "./schemas/language.js";
import roleSchema from "./schemas/role.js";
import productSchema from "./schemas/product.js";
import organisationSchema from "./schemas/organisation.js";
import unitOfMeasureSchema from "./schemas/unitofmeasure.js";
import warehouseSchema from "./schemas/warehouse.js";

export const definition = {
  openapi: "3.0.0",
  info: {
    title: "foodtrazs",
    version: "0.0.1",
    description: "A REST+JSON API service",
  },
  servers: [
    {
      url: "/api/v1",
      description: "API v1",
    },
  ],
  components: {
    schemas: {
      Tenant: tenantSchema,
      Inventory: inventorySchema,
      Language: languageSchema,
      Role: roleSchema,
      Product: productSchema,
      Organisation: organisationSchema,
      UnitOfMeasure: unitOfMeasureSchema,
      Warehouse: warehouseSchema,
    },
  },
};

const options = {
  definition,
  apis: ["./src/api/routes/*.js"],
};

const spec = swaggerJsDoc(options);

export default spec;
