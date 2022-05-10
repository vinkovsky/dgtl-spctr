import React, { FC, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Grid, Paper, Snackbar, Typography } from '@mui/material'
import { useDrop } from 'react-dnd'

import { useAppDispatch } from '@hooks/redux'
import { launchActions } from '@features/launch/slices/launchSlice'

import { AcceptType } from '@models/AcceptType'
import { UserMessage } from '@models/UserMessage'
import { IColumnProps } from '@models/IColumnProps'
import { ColumnNames } from '@models/ColumnNames'
import { ICardItem } from '@models/ICardItem'

import { checkDrop } from '@utils/checkDrop'
import Alert from '@components/Alert'

const { MY_LAUNCHES, LAUNCHES } = ColumnNames

const Column: FC<IColumnProps> = (props) => {
  const { children, columnName } = props

  const dispatch = useAppDispatch()

  const [openSnackbar, setOpenSnackbar] = useState({
    message: '',
    isOpen: false,
  })

  const [cancelBooking, setCancelBooking] = useState({
    id: '',
    name: '',
    hoverId: '',
    isOpen: false,
  })

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: AcceptType.Launch,

    drop: ({ id, hoverId, name }: ICardItem) => {
      switch (columnName) {
        case MY_LAUNCHES:
          dispatch(launchActions.setBookedLaunch({ id, hoverId }))
          setOpenSnackbar({
            message: `${name} ${UserMessage.Booking}`,
            isOpen: true,
          })
          break
        case LAUNCHES:
          setCancelBooking({ id, hoverId, name, isOpen: true })
          break
      }
    },
    hover(item: ICardItem | unknown) {
      return ((item as ICardItem).columnName = columnName)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
    canDrop: ({ currentColumnName }: ICardItem) => checkDrop(columnName, currentColumnName),
  })

  const handleDisagree = () => {
    setCancelBooking((state) => ({ ...state, isOpen: false }))
  }

  const handleAgree = () => {
    const { id, hoverId, name } = cancelBooking
    dispatch(launchActions.setCancelBookedLaunch({ id, hoverId }))
    setCancelBooking((state) => ({ ...state, isOpen: false }))
    setOpenSnackbar({
      message: `${name} ${UserMessage.CancelBooking}`,
      isOpen: true,
    })
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar((state) => ({ ...state, isOpen: false }))
  }

  return (
    <>
      <Grid item xs={4}>
        <Typography align="center" variant="h5" gutterBottom sx={{ textTransform: 'uppercase', color: 'gray' }}>
          {columnName}
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            height: '70vh',
            overflow: 'hidden',
            p: 2,
            backgroundColor: isOver ? (canDrop ? '#EDF1FF ' : '#F3F3F3') : '#FFFFFF',
            border: isOver
              ? canDrop
                ? 'dashed 3px #3F64FD'
                : '1px solid rgba(0, 0, 0, 0.12)'
              : '1px solid rgba(0, 0, 0, 0.12)',
          }}
          ref={drop}
        >
          {children}
        </Paper>
      </Grid>
      <Snackbar open={openSnackbar.isOpen} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} sx={{ width: '100%', backgroundColor: '#C2E9BC', color: '#000000' }}>
          {openSnackbar.message} 🤘
        </Alert>
      </Snackbar>
      <Dialog open={cancelBooking.isOpen} onClose={handleDisagree}>
        <DialogTitle>{UserMessage.ConfirmCancelBooking} 🤨</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleAgree}>
            Yes
          </Button>
          <Button onClick={handleDisagree}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Column
