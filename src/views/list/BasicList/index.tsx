import React from 'react';
import PageHeader from '@/components/PageHeader'
import { Button } from 'antd'


const BasicList: React.FC = () => {
  return <>
    <PageHeader
      title={<>基础列表</>}
      subTitle={<>我是副标题</>}
      extra={<><Button type="primary">新增</Button></>}

    />
    Basic List
  </>
}


export default BasicList