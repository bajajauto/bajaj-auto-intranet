/*
 * The API contract for every data domain in the site.
 *
 * Each service has one contract describing what its methods take and what they
 * return. The mock adapter and the real API adapter are two implementations of
 * the same contract, and `npm run verify:contracts` proves the mocks still
 * satisfy it. When the API is built, these schemas are the specification — the
 * server owes the client exactly this and nothing else.
 *
 * Adding a domain: write `<name>.contract.js`, export it here, and register it
 * in scripts/verify-contracts.mjs so it is actually checked.
 */

export * from './_shared.js'
export * from './bajajBytes.contract.js'
export * from './calendar.contract.js'
export * from './csr.contract.js'
export * from './employeeLetters.contract.js'
export * from './news.contract.js'
export * from './notices.contract.js'
export * from './notifications.contract.js'
export * from './podcast.contract.js'
export * from './policyLibrary.contract.js'
export * from './stock.contract.js'
export * from './vehicles.contract.js'
export * from './youtube.contract.js'

import { bajajBytesContract } from './bajajBytes.contract.js'
import { calendarContract } from './calendar.contract.js'
import { csrContract } from './csr.contract.js'
import { employeeLettersContract } from './employeeLetters.contract.js'
import { newsContract } from './news.contract.js'
import { noticesContract } from './notices.contract.js'
import { notificationsContract } from './notifications.contract.js'
import { podcastContract } from './podcast.contract.js'
import { policyLibraryContract } from './policyLibrary.contract.js'
import { stockContract } from './stock.contract.js'
import { vehiclesContract } from './vehicles.contract.js'
import { youtubeContract } from './youtube.contract.js'

/** Every contract, keyed by service name. */
export const contracts = {
  bajajBytes: bajajBytesContract,
  calendar: calendarContract,
  csr: csrContract,
  employeeLetters: employeeLettersContract,
  news: newsContract,
  notices: noticesContract,
  notifications: notificationsContract,
  podcast: podcastContract,
  policyLibrary: policyLibraryContract,
  stock: stockContract,
  vehicles: vehiclesContract,
  youtube: youtubeContract,
}
