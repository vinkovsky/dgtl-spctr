import { ColumnNames } from '@models/ColumnNames'

const { PAST_LAUNCHES } = ColumnNames

type CheckDropType = (columnName: string, currentColumnName: string) => boolean

export const checkDrop: CheckDropType = (columnName, currentColumnName) =>
  currentColumnName !== PAST_LAUNCHES && currentColumnName !== columnName && columnName !== PAST_LAUNCHES
