import {
  AlignLeftOutlined,
  GlobalOutlined,
  HomeOutlined,
} from "@ant-design/icons"
import { lazy } from 'react'
import { Outlet } from "react-router-dom"
import Layout from "../components/Layout"

import { Roles, RouterType } from "../types"
import lazyLoad from './lazyLoad'

const Home = lazy(() => import('@/views/Home'))
const BasicList = lazy(() => import('@/views/list/BasicList'))
const QueryList = lazy(() => import('@/views/list/QueryList'))
const JSONViews = lazy(() => import('@/views/editor/JSON'))
const RichText = lazy(() => import('@/views/editor/RichText'))

import Error404 from "@/views/404"

export const mainRoute: RouterType = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "",
      label: "首页",
      element: lazyLoad(<Home />),
      icon: <HomeOutlined />,
    },
    {
      path: "list",
      label: "列表",
      element: <Outlet />,
      icon: <AlignLeftOutlined />,
      children: [
        {
          path: "basic",
          label: "基础列表",
          element: lazyLoad(<BasicList />),
        },
        {
          path: "query",
          label: "查询列表",
          element: lazyLoad(<QueryList />),
          auth: [Roles.ADMIN],
        },
      ],
    },
    {
      path: "editor",
      label: "编辑器",
      element: <Outlet />,
      icon: <AlignLeftOutlined />,
      children: [
        {
          path: "json",
          label: "json编辑器",
          element: lazyLoad(<JSONViews />),
        },
        {
          path: "richtext",
          label: "富文本",
          element: lazyLoad(<RichText />),
          auth: [Roles.ADMIN],
        },
      ],
    },
    {
      path: "about",
      label: "简介",
      element: <>about</>,
      icon: <GlobalOutlined />,
    }
  ],
}
