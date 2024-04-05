export default {
  type: "object",
  properties: {
    inventoryId: { type: "number" },
    productId: { type: "string" },
    warehouseId: { type: "string" },
    quantity: { type: "string" },
    organisationId: { type: "string" },
    tenantId: { type: "string", format: "date-time" },
    createdBy: { type: "string" },
    updatedBy: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    updatedDate: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
