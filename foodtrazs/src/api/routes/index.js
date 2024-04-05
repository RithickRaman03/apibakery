import { Router } from "express";
import swaggerUI from "swagger-ui-express";

import { handle404, handleError } from "../middlewares/errors.js";
import tenantRouter from "./tenant.js";
import inventoryRouter from "./inventory.js";
import languageRouter from "./language.js";
import roleRouter from "./role.js";
import productRouter from "./product.js";
import organisationRouter from "./organisation.js";
import unitOfMeasureRouter from "./unitofmeasure.js";
import warehouseRouter from "./warehouse.js";
import urls from "../urls.js";
import spec from "../openapi.js";

const router = Router();

// Swagger API docs
const swaggerSpecPath = `${urls.swagger.path}/${urls.swagger.spec}`;
const swaggerUIOptions = {
  swaggerOptions: {
    url: swaggerSpecPath,
  },
};
router.get(swaggerSpecPath, (req, res) => res.json(spec));
router.use(
  urls.swagger.path,
  swaggerUI.serve,
  swaggerUI.setup(null, swaggerUIOptions)
);

// CRUD API
router.use(urls.apiPrefix + urls.tenant.path, tenantRouter);
router.use(urls.apiPrefix + urls.inventory.path, inventoryRouter);
router.use(urls.apiPrefix + urls.language.path, languageRouter);
router.use(urls.apiPrefix + urls.role.path, roleRouter);
router.use(urls.apiPrefix + urls.product.path, productRouter);
router.use(urls.apiPrefix + urls.organisation.path, organisationRouter);
router.use(urls.apiPrefix + urls.unitOfMeasure.path, unitOfMeasureRouter);
router.use(urls.apiPrefix + urls.warehouse.path, warehouseRouter);

// Redirect browsers from index to API docs
router.get("/", (req, res, next) => {
  if (req.accepts("text/html")) {
    res.redirect(urls.swagger.path);
  } else {
    next();
  }
});

// Error handlers
router.use(handle404);
router.use(handleError);

export default router;
