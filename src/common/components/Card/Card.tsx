import React, { FC, useRef } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { useDrag, useDrop } from 'react-dnd'

import { ICardProps } from '@models/ICardProps'
import { ICardItem } from '@models/ICardItem'
import { AcceptType } from '@models/AcceptType'

import { checkDrop } from '@utils/checkDrop'

const Card: FC<ICardProps> = (props) => {
  const { name, rocket, id, currentColumnName, onClick, style } = props

  const ref = useRef<HTMLDivElement | null>(null)

  const [{ isDragging }, drag] = useDrag(() => ({
    item: {
      id,
      name,
      currentColumnName,
      hoverId: id,
      columnName: currentColumnName,
    },
    type: AcceptType.Launch,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: AcceptType.Launch,

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
    hover(item: ICardItem | unknown) {
      return ((item as ICardItem).hoverId = id)
    },
    canDrop: ({ currentColumnName, columnName }: ICardItem) => checkDrop(columnName, currentColumnName),
  })

  drag(drop(ref))

  return (
    <Box ref={ref} onClick={onClick} style={style}>
      {isOver
        ? canDrop && (
            <Paper
              variant="outlined"
              sx={{
                mt: 2,
                height: 138,
                border: 'dashed 3px #3F64FD',
              }}
            />
          )
        : null}
      <Paper
        variant="outlined"
        sx={{
          mt: 2,
          p: 5,
          backgroundColor: isDragging ? '#3F64FD' : '',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textTransform: 'uppercase',
            color: isDragging ? '#FFFFFF' : '#3F64FD',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="overline"
          sx={{
            textTransform: 'uppercase',
            color: isDragging ? '#FFFFFF' : '#000000',
          }}
        >
          {rocket}
        </Typography>
      </Paper>
    </Box>
  )
}

export default Card
