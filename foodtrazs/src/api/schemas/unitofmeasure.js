export default {
  type: "object",
  properties: {
    unitId: { type: "string" },
    weight: { type: "string" },
    volume: { type: "string" },
    createdBy: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    updatedBy: { type: "string" },
    updatedDate: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};
