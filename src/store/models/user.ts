import { getUserInfo } from '@/apis/user'
import { useNavigate } from 'react-router-dom'
import { getToken, setToken, setUser, removeToken, removeUser } from "@/utils/token"


export interface IUserState {
  name?: string,
  phone?: number,
  token?: string | null,
  permissions?: any[]
}

const user = {
  state: {
    name: '李腾',
    phone: 15810660233,
    token: null,
    permissions: []
  },
  reducers: {
    updateCurrentUser(state: IUserState, currentUser: IUserState) {
      return { ...state, ...currentUser }
    },

    updateToken(state: IUserState, token: string) {
      return { ...state, ...{ token } }
    }
  },
  effects: () => ({
    /** 初始化应用数据数据 */
    setCurrentUser(info: IUserState) {
      (this as any).updateCurrentUser(info)
    },
    getToken() {
      (this as any).updateToken(getToken())
      return (this as any).token
    },
    getUserInfo(payload: any) {
      const { navigate, redirect } = payload
      getUserInfo().then(res => {
        if (res.code !== '0000') {
          return
        }
        const { data } = res;


        setToken(data.token);
        setUser(data);

        (this as any).updateToken(data.token);
        navigate(redirect, { replace: true });
      })
    },
    logout(payload: any) {
      const { navigate } = payload
      console.log('推出登录')
      removeUser()
      removeToken()
      navigate('/login')
    }
  }),
}

export default user
