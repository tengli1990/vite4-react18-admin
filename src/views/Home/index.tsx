import React from 'react';
import PageHeader from '@/components/PageHeader'
import { Button } from 'antd'


const Home: React.FC = () => {
  console.log('home home home')
  return <>
    <PageHeader
      title={<>仪表盘</>}
      subTitle={<>我是副标题</>}
      extra={<><Button type="primary">新增</Button><Button type="primary">新增</Button></>}

    />
    Home
  </>
}


export default Home