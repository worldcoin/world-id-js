import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WorldIDWidget } from '../Widget'

export default {
  title: 'Widget/Core Widget',
  component: WorldIDWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  args: {
    actionId: 'wid_test_12345678',
  },
} as ComponentMeta<typeof WorldIDWidget>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WorldIDWidget> = (args) => <WorldIDWidget {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  signal: 'a_valid_signal',
}

export const Disabled = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Disabled.args = {
  signal: '',
}
