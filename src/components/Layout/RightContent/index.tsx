import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd'
import { LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const RightContent: React.FC = () => {
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <LockOutlined />,
      label: '修改密码',
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      key: '3',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        dispatch({
          type: 'user/logout',
          payload: {
            navigate
          }
        })
      }
    }
  ];

  return <div className={styles["right-content"]}>
    {/* <div className={styles["right-content--item"]}>消息</div> */}
    <Dropdown menu={{ items }} placement="bottom">
      <span className={styles['right-content--item']}><img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar" />{user.name}</span>
    </Dropdown>
  </div>
}

export default RightContent