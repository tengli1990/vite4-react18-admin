import { redirect } from "react-router-dom"

export const checkUser = () => {
  const localStoryUser = localStorage.getItem('token')
  let jsonUser = null

  try {
    jsonUser = JSON.parse(localStoryUser || "")
  } catch (error) {
    console.log(error)
  }

  if (!jsonUser) {
  }

  return jsonUser
}

export const checkAuth = () => {}
