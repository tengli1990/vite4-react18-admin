/**
 * @author teng.li
 * The file enables `models` to import all models
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files: any = import.meta.glob('./models/**/*.ts', { eager: true })

const models: any = {}
Object.keys(files).forEach((key) => {
  const filename = key.replace(/(\.\/models\/|\.ts)/g, '')
  console.log(key, filename)
  models[filename] = files[key].default
})

export default models
