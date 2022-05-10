import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'

import { UserMessage } from '@models/UserMessage'
import { ColumnNames } from '@models/ColumnNames'
import Skeleton from '@components/Skeleton'
import Column from '@components/Column'
import Error from '@components/Error'
import Card from '@components/Card'

import { store } from '@app/store'

export default {
  title: 'components/Column',
  component: Column,
  argTypes: {
    columnName: {
      type: 'string',
      description: 'Column name',
      options: [ColumnNames.LAUNCHES, ColumnNames.MY_LAUNCHES, ColumnNames.PAST_LAUNCHES],
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof Column>

const TemplateColumnEmpty: ComponentStory<typeof Column> = (args) => (
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Column {...args} />
    </Provider>
  </DndProvider>
)

const TemplateColumnLoading: ComponentStory<typeof Column> = (args) => (
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Column {...args}>
        <Skeleton count={1} />
      </Column>
    </Provider>
  </DndProvider>
)

const TemplateColumn: ComponentStory<typeof Column> = (args) => (
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Column {...args} />
    </Provider>
  </DndProvider>
)

const TemplateColumnFailedLoading: ComponentStory<typeof Column> = (args) => (
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <Column {...args}>
        <Error message={UserMessage.LoadingFailed} />
      </Column>
    </Provider>
  </DndProvider>
)

export const Empty = TemplateColumnEmpty.bind({})

export const Cards = TemplateColumn.bind({})

export const Loading = TemplateColumnLoading.bind({})

export const FailedLoading = TemplateColumnFailedLoading.bind({})

Empty.args = {
  columnName: ColumnNames.LAUNCHES,
}

Loading.args = {
  columnName: ColumnNames.LAUNCHES,
}

Cards.args = {
  columnName: ColumnNames.LAUNCHES,
  children: (
    <Card
      currentColumnName={ColumnNames.LAUNCHES}
      upcoming={true}
      rocket={'Rocket'}
      id={''}
      name={'Starlink'}
      date_local={''}
      flight_number={0}
      onClick={() => null}
    />
  ),
}

FailedLoading.args = {
  columnName: ColumnNames.LAUNCHES,
}
