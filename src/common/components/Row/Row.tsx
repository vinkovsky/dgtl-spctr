import React, { MouseEvent } from 'react'

import Card from '@components/Card'
import { IRow } from '@models/IRow'

const Row: IRow =
  (items, name, handleClick) =>
  ({ index, style }) =>
    (
      <Card
        {...items[index]}
        style={style}
        onClick={(event: MouseEvent<HTMLDivElement>) => handleClick(event, items[index].id)}
        key={items[index].id}
        currentColumnName={name}
      />
    )

export default Row
