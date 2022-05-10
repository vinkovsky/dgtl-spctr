import React, { forwardRef } from 'react'
import { AlertProps, Alert as MuiAlert } from '@mui/material'

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export default Alert
