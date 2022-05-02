import { Request } from "express";
import environment from "../environment";

function getRequestPaginationParams(req: Request): { page: number; size: number } {
  const q = req.query.q;
  const page = req.query.page;
  const size = req.query.size;

  return {
    page: page != undefined ? Number.parseInt(page as string) : 0,
    size: size != undefined ? Number.parseInt(size as string) : environment.defaultPageSize
  };
}

export { getRequestPaginationParams };
