
export const getUserInfo = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: '0000',
        msg: '成功',
        data: {
          name: '里疼',
          phone: 15810660233,
          token: 'xxsfsfsdsfsfs',
          permissions: ['001001', '002001', '002002', '003001','003002', '004001']
        }
      })
    }, 2000)
  })
}