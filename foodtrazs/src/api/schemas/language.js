export default {
  type: "object",
  properties: {
    languageId: { type: "integer" },
    languageName: { type: "string" },
    createdBy: { type: "string" },
    updatedBy: { type: "string" },
    updatedDate: { type: "string", format: "date-time" },
    createdDate: { type: "string", format: "date-time" },
  },
  required: [],
  additionalProperties: false,
};
