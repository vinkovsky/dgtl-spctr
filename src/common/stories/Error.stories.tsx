import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Error from '@components/Error'

export default {
  title: 'components/Error',
  component: Error,
} as ComponentMeta<typeof Error>

const ErrorStories: ComponentStory<typeof Error> = (args) => <Error {...args} />

export const Default = ErrorStories.bind({})

Default.args = {
  message: 'Failed to load',
}
