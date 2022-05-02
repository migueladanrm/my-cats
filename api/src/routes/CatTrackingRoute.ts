import { Router } from "express";
import { CatsService } from "../services";

const CatTrackingRoute = (catsService: CatsService) =>
  Router({ mergeParams: true })
    .get("/", (req, res) => {})
    .post("/", (req, res) => {});

    export default CatTrackingRoute;