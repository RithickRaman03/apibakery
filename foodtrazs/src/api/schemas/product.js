export default {
  type: "object",
  properties: {
    productId: { type: "string" },
    tenantId: { type: "string" },
    organisationId: { type: "string" },
    name: { type: "string" },
    branchId: { type: "string" },
    createdBy: { type: "string" },
    updatedBy: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    updatedDate: { type: "string", format: "date-time" },
  },
  required: [],
  additionalProperties: false,
};
