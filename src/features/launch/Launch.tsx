import React, { FC, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'

import { RootState } from '@app/store'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { launchActions } from '@features/launch/slices/launchSlice'
import { Button, Container, Grid, Link, Typography } from '@mui/material'

const Launch: FC = () => {
  const { id } = useParams()

  const { currentLaunch } = useAppSelector((state: RootState) => state.launchReducer)

  // const {
  //   id,
  //   name,
  //   date_local,
  //   flight_number,
  //   links: { webcast },
  //   rocket,
  //   upcoming,
  // } = currentLaunch

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(launchActions.getCurrentLaunch(id!))
  }, [id, dispatch])

  return (
    <>
      {currentLaunch && (
        <Container maxWidth="sm">
          <Grid container spacing={2} columns={12} sx={{ mt: 20 }}>
            <Grid item xs={12}>
              <Typography
                variant="h3"
                color={'primary'}
                sx={{
                  textTransform: 'uppercase',
                }}
              >
                🚀 {currentLaunch.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  textTransform: 'uppercase',
                }}
              >
                {currentLaunch.rocket}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  textTransform: 'uppercase',
                }}
              >
                {`Flight number: ${currentLaunch.flight_number}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{new Date(currentLaunch.date_local).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Link component={RouterLink} to={'/'} underline="none">
                <Button variant="outlined">👈 Back to Home</Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default Launch
