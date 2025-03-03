import { Router } from "express";

import LanguageService from "../../services/language.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/language.js";

const router = Router();

/** @swagger
 *
 * tags:
 *   name: Language
 *   description: API for managing Language objects
 *
 * /language:
 *   get:
 *     tags: [Language]
 *     summary: Get all the Language objects
 *     responses:
 *       200:
 *         description: List of Language objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await LanguageService.list();
    res.json(results);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /language:
 *   post:
 *     tags: [Language]
 *     summary: Create a new Language
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       201:
 *         description: The created Language object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await LanguageService.create(req.validatedBody);
    res.status(201).json(obj);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /language/{id}:
 *   get:
 *     tags: [Language]
 *     summary: Get a Language by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Language object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await LanguageService.get(req.params.id);
    if (obj) {
      res.json(obj);
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /language/{id}:
 *   put:
 *     tags: [Language]
 *     summary: Update Language with the specified id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Language'
 *     responses:
 *       200:
 *         description: The updated Language object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await LanguageService.update(
        req.params.id,
        req.validatedBody
      );
      if (obj) {
        res.status(200).json(obj);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      if (error.isClientError()) {
        res.status(400).json({ error });
      } else {
        next(error);
      }
    }
  }
);

/** @swagger
 *
 * /language/{id}:
 *   delete:
 *     tags: [Language]
 *     summary: Delete Language with the specified id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *        description: OK, object deleted
 */
router.delete("/:id", requireValidId, async (req, res, next) => {
  try {
    const success = await LanguageService.delete(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Not found, nothing deleted" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

export default router;
