import { useMemo, useEffect } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '@/utils/token';
import { RouterType } from '../types'

import { loginRoute } from "./login"
import { mainRoute } from "./main"
import { ErrorRoute } from './error'


// 拦截器
const Render = (props: any) => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = document.URL.split(window.location.host)[1]
  const { meta = {}, children } = props


  useEffect(() => {
    const token = getToken()
    if (!token && meta.verification !== false) {
      navigate(`/login?redirect=${encodeURIComponent(currentRoute)}`)
    }
  }, [location])

  return children
}

const AppRouter = () => {

  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'user/getUserInfo'
    })
  }, [])

  // 过滤路由
  const formatRoute = (routes: RouterType[]): RouteObject[] => {
    const _routes: RouteObject[] = [];
    for (const route of routes) {

      const { path, element, children, meta = {} } = route;

      const item = {
        path,
        element: <Render {...route}>{element}</Render>,
        children: children ? formatRoute(children) : undefined
      }

      const hasPermission: boolean | undefined = meta.permissions?.some((permission: string) => user.permissions.includes(permission));

      if (hasPermission || !meta.permissions) {
        _routes.push(item)
      }
    }
    return _routes
  }

  const appRoutes = useMemo(() => {
    const allRoutes = [loginRoute, mainRoute, ErrorRoute];
    return createBrowserRouter(formatRoute(allRoutes))
  }, [formatRoute])

  return <RouterProvider router={appRoutes} />
}

export {
  AppRouter
}