import '@testing-library/jest-dom'
import userLogIn from '@/libs/userLogIn'
import getUserProfile from '@/libs/getUserProfile'
import { screen, render, waitFor } from '@testing-library/react'

describe('Remote User Log-In', () => {
  var logInPromise:Promise<any>
  var logInJsonResult:any
  var token:string
  var profilePromise:Promise<any>
  var profileJsonResult:any

  beforeAll(async () => {
    const email = "alice@eventplanner.com"
    const password = "g00dD@y$"
    logInPromise = userLogIn(email, password)
    logInJsonResult = await logInPromise

    token = logInJsonResult.token
    profilePromise = getUserProfile(token)
    profileJsonResult = await profilePromise
  })

  it('userLogIn must return correct results', () => {
    expect(logInJsonResult.email).toMatch(/alice@eventplanner.com/i) 
  })

  it('getUserProfile must return correct results', () => {
    var profileData = profileJsonResult.data
    expect(profileData.email).toMatch(/alice@eventplanner.com/i)
    expect(profileData.role).toMatch(/user/i)
  })
})
