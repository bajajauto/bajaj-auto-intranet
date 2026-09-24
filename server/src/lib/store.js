import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

/*
 * Reads the generated fixtures.
 *
 * This module is the seam step 5 unpicks: each `read()` becomes a SharePoint
 * call, one domain at a time, and nothing above it changes. Routes never touch
 * the filesystem directly for that reason.
 */
const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'fixtures')

const loaded = new Map()

export async function read(name) {
  if (!loaded.has(name)) {
    const raw = await readFile(join(FIXTURES, `${name}.json`), 'utf8')
    loaded.set(name, JSON.parse(raw))
  }
  return loaded.get(name)
}
