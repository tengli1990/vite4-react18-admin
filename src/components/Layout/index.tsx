import React, { Fragment, useContext, useMemo, useState, useEffect } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { Layout as AntdLayout, Menu, MenuProps } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { connect, useSelector, useDispatch } from 'react-redux'
import { mainRoute } from "../../routes/main"
import { RouterType } from "../../types"
import { APP_NAME } from "../../config"

import RightContent from './RightContent'
import styles from './index.module.less'

// useContext
import { UserContext } from "../../providers/user"

type MenuItem = Required<MenuProps>["items"][number]

const { Header, Sider, Content } = AntdLayout

const formatMenu = (menuRoutes: RouterType[] | undefined) => {
  if (!menuRoutes) {
    return
  }

  const user = useSelector((state: any) => state.user)
  const menus: MenuItem[] = []

  for (const route of menuRoutes) {
    const menu = {
      label: route.label,
      key: route.path,
      icon: route.icon,
      children: formatMenu(route.children),
    } as MenuItem

    const hasPermission: boolean | undefined = route?.meta?.permissions?.some((permission: string) => user.permissions.includes(permission))

    if (route.hide !== true && (hasPermission || !route.meta?.permissions)) {
      menus.push(menu)
    }
  }

  return menus
}

// 根据路由匹配当前路由
const pathname2selectedKeys = (pathname: string) => {
  const paths = pathname.match(/\w+/g)
  if (paths === null) {
    return { selectedKeys: [""], subKeys: [] }
  } else {
    const subKeys = paths.slice(0, paths.length - 1)
    return { selectedKeys: paths, subKeys }
  }
}


const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const app = useSelector((state: any) => state.user)
  const dispatch = useDispatch();
  console.log(111, app)



  // 导航展开收缩
  const [collapsed, setCollapsed] = useState(false)
  const [animationClassName, setAnimationClassname] = useState('')



  const formatPath = (pathArray: string[]) => {
    pathArray.reverse()
    return pathArray.reduce((path, cur, index) => {
      if (index === 0) {
        return path + cur
      } else {
        return path + "/" + cur
      }
    }, "/")
  }

  const memoSubKeys = useMemo(
    () => pathname2selectedKeys(location.pathname).subKeys,
    [location]
  )

  const memoSelectedKeys = useMemo(
    () => pathname2selectedKeys(location.pathname).selectedKeys,
    [location]
  )

  const [openKeys, setOpenKeys]: [string[], any] = useState(memoSubKeys)

  const onSelectedMenu = (menu: any) => {
    const path = formatPath(menu.keyPath)
    // 匹配不上清空
    if (!menu.keyPath.includes(openKeys[0])) {
      setOpenKeys([])
    }
    navigate(path)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    if (keys.length) {
      setOpenKeys(keys);
    } else {
      setOpenKeys([]);
    }
  };

  useEffect(() => {
    setOpenKeys(memoSubKeys)
  }, [memoSubKeys, collapsed])

  useEffect(() => {
    // setTimeout(() => {
    //   setAnimationClassname('slide-right')
    // })
    // return () => {
    //   setAnimationClassname('')
    // }
  }, [location])

  useEffect(() => {
    // setTimeout(() => {
    //   // setCurrentUser({
    //   //   name: '里疼'
    //   // })
    //   dispatch({
    //     type: 'user/setCurrentUser',
    //     payload: { name: '里疼' }
    //   })
    // }, 2000)
  }, [])

  return (
    <Fragment>
      {/* {userInfo.userCheck() === false && <Navigate to="/login" replace />} */}
      <AntdLayout className={styles['ant-layout']}>
        <Sider
          className={styles['ant-layout--sider']}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className={styles["logo"]}>
            {collapsed ? APP_NAME.abbreviation : APP_NAME.normal}
          </div>
          <Menu
            mode="inline"
            theme='dark'
            // defaultOpenKeys={memoSubKeys}
            openKeys={openKeys}
            selectedKeys={memoSelectedKeys}
            onOpenChange={onOpenChange}
            items={formatMenu(mainRoute.children)}
            onSelect={onSelectedMenu}
          />
        </Sider>
        <AntdLayout>
          <Header className={styles["header"]}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: styles["trigger"],
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <RightContent />
          </Header>

          {/* main */}
          <Content className={[styles['content'], styles[animationClassName]].join(' ')}>
            <Outlet />
          </Content>
        </AntdLayout>
      </AntdLayout>
    </Fragment>
  )
}

export default Layout
