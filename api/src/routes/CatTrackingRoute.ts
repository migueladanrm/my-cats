import { Router } from "express";
import { TrackingPoint } from "../models";
import { CatTrackingService } from "../services";
import { getRequestPaginationParams } from "../utils/express.utils";

/**
 * Cat Tracking Resource
 * @param catTrackingService Cat Tracking Service
 * @returns
 */
const CatTrackingRoute = (catTrackingService: CatTrackingService) =>
  Router()
    .get("/:catId", (req, res) => {
      const catId = req.params.catId;
      const { page, size } = getRequestPaginationParams(req);

      catTrackingService
        .get(catId, page, size)
        .then((points) => res.status(200).json(points))
        .catch((err) => res.status(400).json(err));
    })
    .get("/:catId/last", (req, res) =>
      catTrackingService
        .getLast(req.params.catId)
        .then((point) => {
          if (point) res.status(200).json(point);
          else res.status(404).json({ message: "The cat doesn't have tracking points." });
        })
        .catch((err) => res.status(400).json(err))
    )
    .post("/:catId", (req, res) =>
      catTrackingService
        .add(req.params.catId, req.body as TrackingPoint)
        .finally(() => res.sendStatus(200))
    );

export default CatTrackingRoute;
