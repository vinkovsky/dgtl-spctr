import React, { FC, useEffect, MouseEvent } from 'react'
import { Grid, Typography } from '@mui/material'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useNavigate } from 'react-router-dom'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { RootState } from '@app/store'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { launchActions } from '@features/launch/slices/launchSlice'
import Column from '@components/Column'
import Error from '@components/Error'
import Skeleton from '@components/Skeleton'
import Row from '@components/Row'

import { ColumnNames } from '@models/ColumnNames'
import { IAutoSizer } from '@models/IAutoSizer'

const { PAST_LAUNCHES, LAUNCHES, MY_LAUNCHES } = ColumnNames

const Home: FC = () => {
  const { pastLaunches, nextLaunches, bookedLaunches, isLoading, error } = useAppSelector(
    (state: RootState) => state.launchReducer
  )

  const dispatch = useAppDispatch()

  const history = useNavigate()

  useEffect(() => {
    if ((pastLaunches || nextLaunches).length === 0) {
      dispatch(launchActions.getLaunchFetch())
    }
  }, [pastLaunches, nextLaunches, dispatch])

  const handleClick = (event: MouseEvent<HTMLDivElement>, id: string) => {
    history(`/${id}`)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Typography align="center" variant="h4" sx={{ color: 'gray', mt: 5, mb: 2 }}>
        Explore the space 🌏
      </Typography>
      <Grid container spacing={4} sx={{ p: 3 }}>
        <Column columnName={PAST_LAUNCHES}>
          {error && <Error message={error} />}

          {isLoading ? (
            <Skeleton count={6} />
          ) : (
            <AutoSizer>
              {({ height, width }: IAutoSizer) => (
                <List height={height} itemCount={pastLaunches.length} itemSize={160} width={width}>
                  {Row(pastLaunches, PAST_LAUNCHES, handleClick)}
                </List>
              )}
            </AutoSizer>
          )}
        </Column>
        <Column columnName={LAUNCHES}>
          {error && <Error message={error} />}

          {isLoading ? (
            <Skeleton count={6} />
          ) : (
            <AutoSizer>
              {({ height, width }: IAutoSizer) => (
                <List height={height} itemCount={nextLaunches.length} itemSize={160} width={width}>
                  {Row(nextLaunches, LAUNCHES, handleClick)}
                </List>
              )}
            </AutoSizer>
          )}
        </Column>
        <Column columnName={MY_LAUNCHES}>
          {error && <Error message={error} />}

          {isLoading ? (
            <Skeleton count={6} />
          ) : (
            <AutoSizer>
              {({ height, width }: IAutoSizer) => (
                <List height={height} itemCount={bookedLaunches.length} itemSize={160} width={width}>
                  {Row(bookedLaunches, MY_LAUNCHES, handleClick)}
                </List>
              )}
            </AutoSizer>
          )}
        </Column>
      </Grid>
    </DndProvider>
  )
}

export default Home
