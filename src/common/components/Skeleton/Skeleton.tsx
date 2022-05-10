import React, { FC, Fragment } from 'react'
import { Skeleton as MuiSkeleton } from '@mui/material'

const Skeleton: FC<{ count: number }> = ({ count }) => (
  <Fragment>
    {Array.from(Array(count)).map((_, index) => (
      <MuiSkeleton key={index} variant="rectangular" height={145} sx={{ borderRadius: 1, mt: 2 }} />
    ))}
  </Fragment>
)

export default Skeleton
