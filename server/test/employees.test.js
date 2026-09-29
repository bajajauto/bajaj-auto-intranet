import { before, describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { buildApp } from '../src/app.js'
import { bearer, testApp } from './helpers.js'

/*
 * The fixture employee must reach only the account whose email it carries.
 * Everyone else signed in gets 403 — never the fixture, never a guess.
 */

const FIXTURE_EMAIL = 'dpaul1@bajajauto.co.in'

let app
let token

before(async () => {
  ;({ app, token } = await testApp())
})

const as = (email) => token({ claims: { preferred_username: email } })

describe('letters resolve the employee from the token', () => {
  test('the matching account gets its own record', async () => {
    const res = await app.inject({ url: '/letters/employee', headers: bearer(await as(FIXTURE_EMAIL)) })
    assert.equal(res.statusCode, 200)
    assert.equal(res.json().empId, '118687')
  })

  test('UPN case does not matter', async () => {
    const res = await app.inject({
      url: '/letters/employee',
      headers: bearer(await as(FIXTURE_EMAIL.toUpperCase())),
    })
    assert.equal(res.statusCode, 200)
  })

  test('any other signed-in account gets 403, not the fixture', async () => {
    const res = await app.inject({
      url: '/letters/employee',
      headers: bearer(await as('someone.else@bajajauto.co.in')),
    })
    assert.equal(res.statusCode, 403)
    assert.equal(res.json().empId, undefined)
  })

  test('generating a letter is refused without a record', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/letters/generate',
      headers: bearer(await as('someone.else@bajajauto.co.in')),
      payload: { letterTypeId: 'address-proof', entityId: 'BAL' },
    })
    assert.equal(res.statusCode, 403)
  })

  test('a body naming an employee is ignored — the token decides', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/letters/generate',
      headers: bearer(await as(FIXTURE_EMAIL)),
      payload: {
        letterTypeId: 'address-proof',
        entityId: 'BAL',
        input: { designation: 'CEO', empId: '000001' },
      },
    })
    assert.equal(res.statusCode, 200)
    const text = JSON.stringify(res.json())
    assert.match(text, /118687|DEBOSMITA PAUL/)
    assert.doesNotMatch(text, /000001/)
  })

  test('forms resolve the same way', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/letters/forms/generate',
      headers: bearer(await as('someone.else@bajajauto.co.in')),
      payload: { formId: 'anything', entityId: 'BAL' },
    })
    assert.equal(res.statusCode, 403)
  })
})

describe('auth off', () => {
  test('development still sees the fixture employee', async () => {
    const open = await buildApp({ verify: null })
    const res = await open.inject({ url: '/letters/employee' })
    assert.equal(res.statusCode, 200)
    assert.equal(res.json().empId, '118687')
  })
})
