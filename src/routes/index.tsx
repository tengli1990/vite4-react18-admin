import { useMemo, useEffect } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
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

  const userInfo = useSelector((state: any) => state.user)
  console.log('routes/index.tsx', userInfo)

  // 过滤路由
  const formatRoute = (routes: RouterType[]): RouteObject[] => {
    const _routes: RouteObject[] = [];
    for (const route of routes) {
      const { path, element, children } = route;
      // if (auth === undefined || auth.includes(userInfo.role!)) {
      _routes.push({
        path,
        element: <Render {...route}>{element}</Render>,
        children: children ? formatRoute(children) : undefined
      })
      // }
    }
    return _routes
  }

  const appRoutes = useMemo(() => {
    const allRoutes = [loginRoute, mainRoute, ErrorRoute];
    return createBrowserRouter(formatRoute(allRoutes))
  }, [])
  return <RouterProvider router={appRoutes} />
}

export {
  AppRouter
}