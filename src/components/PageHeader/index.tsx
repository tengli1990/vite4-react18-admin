import React, { ReactNode, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import styles from './index.module.less'

interface IProps {
  title?: ReactNode;
  subTitle?: ReactNode;
  back?: boolean | null;
  onBack?: (event?: Event) => void;
  extra?: ReactNode;
  children?: ReactNode
}
const PageHeader: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate()
  const { title, subTitle, extra, back = true, onBack = () => { }, children } = props
  const onPrevLink = (e: SyntheticEvent) => {
    navigate(-1)
    // history.go(-1)
    onBack()
  }
  return <><div className={styles['page-header']}>
    <div className={styles['page-header--top']}>
      <div className={styles['page-header--top__left']}>
        <span className={styles['page-header--top__title']}>{back && <ArrowLeftOutlined onClick={(e) => { onPrevLink(e) }} className={styles['icon']} />}{title}</span>
        <span className={styles['page-header--top__sub-title']}>{subTitle}</span>
      </div>
      <div className={styles['page-header--top__extra']}>{extra}</div>
    </div>
  </div>
  </>
}

export default PageHeader