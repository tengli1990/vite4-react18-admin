import Error404 from "@/views/404"
import { Navigate } from 'react-router-dom'
import { RouterType } from '@/types/index'


export const ErrorRoute: RouterType = {
  path: "*",
  element: <Navigate to="/" />,
  meta: {
    verification: false
  }
}
