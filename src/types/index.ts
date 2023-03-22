import { ReactNode } from 'react';

export type RouterType = {
  // route props
  path?: string
  element?: ReactNode
  children?: RouterType[]
  loader?: () => void
  // menu props
  icon?: ReactNode
  name?: string
  label?: string
  hide?: boolean
  // auth props
  auth?: Roles[],
  meta?: {
    verification?: false
  }
}


export type MenuType = {
  label: string
  key: string
  icon: ReactNode
  children: MenuType[]
}

export enum StorageKeys {
  USER = "user",
}

export interface ContextProps {
  children?: ReactNode
}

export enum Roles {
  ADMIN = 0,
  USER = 1,
}


export type UserType = {
  name?: string
  token?: string
  role?: Roles
}