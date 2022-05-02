import { Router } from "express";
import { Cat } from "../models";
import { CatsService } from "../services";
import { NewCatValidator } from "../validators";

const CatsRoute = (catsService: CatsService) =>
  Router()
    .get("/", (req, res) =>
      catsService
        .get()
        .then((cats) => res.status(200).json(cats))
        .catch((err) => res.status(400).json(err))
    )
    .get("/search", (req, res) => {
      const { q } = req.query;

      catsService
        .search(q?.toString())
        .then((cats) => res.status(200).json(cats))
        .catch((err) => res.status(400).json(err));
    })
    .get("/:id", (req, res) => {
      const id = req.params.id;
      catsService
        .getById(id)
        .then((cats) => res.status(200).json(cats))
        .catch((err) => res.status(400).json(err));
    })
    .post("/", (req, res) => {
      const cat = req.body as Cat;
      const validation = new NewCatValidator().validateAsync(cat);
      if (Object.keys(validation).length < 1) {
        catsService
          .add(cat)
          .then((createdCat) => res.status(201).json(createdCat))
          .catch((err) => res.status(400).json(err));
      } else {
        res.status(400).json(validation);
      }
    })
    .patch("/:id", (req, res) => {
      const cat = req.body as Cat;
      catsService
        .update(req.params.id, cat)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(400).json(err));
    })
    .delete("/:id", (req, res) =>
      catsService
        .delete(req.params.id)
        .then((_) => res.sendStatus(200))
        .catch((err) => res.status(400).json(err))
    );

export default CatsRoute;
