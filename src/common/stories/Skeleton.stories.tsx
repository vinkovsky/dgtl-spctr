import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Skeleton from '@components/Skeleton'

export default {
  title: 'components/Skeleton',
  component: Skeleton,
  argTypes: {
    count: {
      control: {
        type: 'range',
        min: 1,
        max: 5,
      },
    },
  },
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Default = Template.bind({})

Default.args = {
  count: 1,
}
