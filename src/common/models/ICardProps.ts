import { MouseEvent } from 'react'
import { ILaunch } from './ILaunch'

export interface ICardProps extends ILaunch {
  onClick: (event: MouseEvent<HTMLDivElement>) => void
  currentColumnName: string
  style?: React.CSSProperties | undefined
}
