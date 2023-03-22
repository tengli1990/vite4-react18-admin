import React from 'react';
import PageHeader from '@/components/PageHeader'
import { Button } from 'antd'


const QueryList: React.FC = () => {
  return <>
    <PageHeader
      title={<>查询列表</>}
      subTitle={<>我是副标题</>}
      extra={<><Button type="primary">新增</Button></>}

    />
    Query List
  </>
}


export default QueryList