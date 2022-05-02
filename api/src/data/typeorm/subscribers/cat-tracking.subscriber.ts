import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import log from "../../../telemetry";
import { CatEntity, CatTrackingEntity } from "../entities";
import { AppDataSource } from "../ormconfig";

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<CatTrackingEntity> {
  listenTo() {
    return CatTrackingEntity;
  }

  async afterInsert(e: InsertEvent<CatTrackingEntity>) {
    const { createdAt, catId } = e.entity;
    await AppDataSource.createQueryBuilder()
      .update(CatEntity)
      .set({ lastSeen: createdAt })
      .where("id = :catId", { catId })
      .returning("id")
      .execute();

    log.info(`Updated last seen for Cat '${catId}' at '${createdAt}'`);
  }
}
