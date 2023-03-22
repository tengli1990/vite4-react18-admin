import Login from "../views/Login"
import { RouterType } from "../types"


export const loginRoute: RouterType = {
  path: "/login",
  element: <Login />,
  meta: {
    verification: false
  }
}
