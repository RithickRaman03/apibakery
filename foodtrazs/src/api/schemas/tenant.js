export default {
  type: "object",
  properties: {
    tenantId: { type: "string" },
    dbName: { type: "string" },
    dbUsername: { type: "string" },
    dbPassword: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    updatedDate: { type: "string", format: "date-time" },
    createdBy: { type: "string" },
    updatedBy: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
