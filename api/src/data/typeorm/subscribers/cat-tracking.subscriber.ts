import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { CatEntity, CatTrackingEntity } from "../entities";
import { AppDataSource } from "../ormconfig";
import log from "../../../telemetry";

/**
 * Updates Cat Last Seen field when a new Tracking Point is inserted.
 */
@EventSubscriber()
export class CatTrackingSubscriber implements EntitySubscriberInterface<CatTrackingEntity> {
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
