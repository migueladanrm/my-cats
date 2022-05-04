import moment from "moment";

const catIsIdle = (lastSeen: Date): boolean => {
  const last = moment(lastSeen);
  const now = moment(new Date());

  return moment.duration(now.diff(last)).asMinutes() >= 60;
};

export { catIsIdle };
