import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { UserMessage } from '@models/UserMessage'
import Alert from '@components/Alert'

export default {
  title: 'components/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />

export const Default = Template.bind({})

Default.args = {
  children: UserMessage.Booking,
}
