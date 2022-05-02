import { createMap, createMapper } from "@automapper/core";
import { classes } from '@automapper/classes';
import { CatEntity } from "../typeorm/entities";
import { Cat } from "../../models";

export const TypeOrmMapper = createMapper({
  strategyInitializer: classes()
});

//createMap(TypeOrmMapper, Cat,CatEntity);