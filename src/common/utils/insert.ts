import { ILaunch } from '@models/ILaunch'

type InsertFnType = (arr: ILaunch[], index: number, item: ILaunch[]) => ILaunch[]

export const insert: InsertFnType = (arr, index, item) => [...arr.slice(0, index), ...item, ...arr.slice(index)]
