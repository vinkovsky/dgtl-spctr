import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Card from '@components/Card'
import { ColumnNames } from '@models/ColumnNames'

export default {
  title: 'components/Card',
  component: Card,
} as ComponentMeta<typeof Card>

const ErrorTemplate: ComponentStory<typeof Card> = (args) => (
  <DndProvider backend={HTML5Backend}>
    <Card {...args} />
  </DndProvider>
)

export const Default = ErrorTemplate.bind({})

Default.args = {
  id: '',
  name: 'Starlink',
  currentColumnName: ColumnNames.LAUNCHES,
  upcoming: true,
  rocket: 'Rocket',
  date_local: '',
  flight_number: 0,
  onClick: () => null,
}
