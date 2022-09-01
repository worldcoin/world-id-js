import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WorldIDWidget } from '../Widget'

const disabledControl = {
  table: {
    disable: true,
  },
}

export default {
  title: 'Widget/Core Widget',
  component: WorldIDWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    actionId: disabledControl,
    signal: disabledControl,
    enableTelemetry: disabledControl,
    appName: disabledControl,
    signalDescription: disabledControl,
    advancedUseRawActionId: disabledControl,
    advancedUseRawSignal: disabledControl,
    onSuccess: disabledControl,
    onError: disabledControl,
    onInitSuccess: disabledControl,
    onInitError: disabledControl,
    debug: disabledControl,
  },
  args: {
    actionId: 'wid_test_12345678',
    debug: true,
    enableTelemetry: false,
    disableRemoteFonts: false,
  },
} as ComponentMeta<typeof WorldIDWidget>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WorldIDWidget> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <WorldIDWidget {...args} />
  </div>
)

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

export const InvalidActionId = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InvalidActionId.args = {
  actionId: '',
}
