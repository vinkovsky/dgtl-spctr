import React, { FC } from 'react'
import { Paper, Typography } from '@mui/material'

const Error: FC<{ message: string }> = ({ message }) => (
  <Paper
    variant="outlined"
    sx={{
      mt: 2,
      p: 8,
    }}
  >
    <Typography color="error">{message}</Typography>
  </Paper>
)

export default Error
