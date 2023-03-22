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

import { INDEX, LIST_MANAGER, EDITOR_MANAGER, ABOUT } from '@/config/permission.config'

export const mainRoute: RouterType = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "",
      label: "首页",
      element: lazyLoad(<Home />),
      icon: <HomeOutlined />,
      meta: {
        permissions: [INDEX.ID]
      }
    },
    {
      path: "list",
      label: "列表",
      element: <Outlet />,
      icon: <AlignLeftOutlined />,
      meta: {
        permissions: [LIST_MANAGER.BASIC, LIST_MANAGER.QUERY]
      },
      children: [
        {
          path: "basic",
          label: "基础列表",
          element: lazyLoad(<BasicList />),
          meta: {
            permissions: [LIST_MANAGER.BASIC]
          }
        },
        {
          path: "query",
          label: "查询列表",
          element: lazyLoad(<QueryList />),
          auth: [Roles.ADMIN],
          meta: {
            permissions: [LIST_MANAGER.QUERY]
          }
        },
      ],
    },
    {
      path: "editor",
      label: "编辑器",
      element: <Outlet />,
      icon: <AlignLeftOutlined />,
      meta: {
        permissions: [EDITOR_MANAGER.JSON, EDITOR_MANAGER.RICHTEXT]
      },
      children: [
        {
          path: "json",
          label: "json编辑器",
          element: lazyLoad(<JSONViews />),
          meta: {
            permissions: [EDITOR_MANAGER.JSON]
          }
        },
        {
          path: "richtext",
          label: "富文本",
          element: lazyLoad(<RichText />),
          meta: {
            permissions: [EDITOR_MANAGER.RICHTEXT]
          }
        },
      ],
    },
    {
      path: "about",
      label: "简介",
      element: <>about</>,
      icon: <GlobalOutlined />,
      meta: {
        permissions: [ABOUT.ID]
      }
    }
  ],
}
