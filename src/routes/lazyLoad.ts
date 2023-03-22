import React, { Suspense, ReactNode } from 'react'

const lazyLoad = (children: ReactNode): ReactNode => {
  console.log('路由拦截')
  return React.createElement(Suspense, {}, children)
}

export default lazyLoad