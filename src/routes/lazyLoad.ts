import React, { Suspense, ReactNode } from 'react'

const lazyLoad = (children: ReactNode): ReactNode => {
  return React.createElement(Suspense, {}, children)
}

export default lazyLoad