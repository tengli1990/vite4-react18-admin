import React, { Suspense, ReactNode, lazy } from 'react'

const lazyLoad = (callback: any): ReactNode => {
  const Element = lazy(callback)
  return <Suspense><Element /></Suspense>
}

export default lazyLoad