import { init } from '@rematch/core'
import models from './loader'

const configureStore = () => {
  const store = init({
    plugins: [],
    models,
  })
  return store
}

export default configureStore
