import { DateTime } from 'luxon';

export const formatDate = (dateString) =>
  DateTime.fromISO(dateString).setLocale('en-GB').toLocaleString(DateTime.DATE_FULL);
