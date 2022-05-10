import { MouseEvent } from 'react'
import { ILaunch } from './ILaunch'

export interface IRow {
  (items: ILaunch[], name: string, handleClick: (event: MouseEvent<HTMLDivElement>, id: string) => void)
}
