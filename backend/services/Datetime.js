const { DateTime } = require("luxon");
const timeZone ="America/New_York";

const createDatetime = (date, time) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const datetimeString = `${month}-${day}-${year}T${time}`;
  const datetime = DateTime.local.fromISO(datetimeString, { zone: timeZone });
  return datetime.toJSDate();
};

module.exports = { createDatetime };
