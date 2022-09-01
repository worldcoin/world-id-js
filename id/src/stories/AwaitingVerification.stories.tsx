import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AwaitingVerificationScene } from 'scenes/AwaitingVerificationScene'
import { globalStyles, lightTheme, darkTheme } from 'stitches'

interface ArgsInterface {
  theme: 'light' | 'dark'
}

export default {
  title: 'Widget',
  component: AwaitingVerificationScene,
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['light', 'dark'],
      },
    },
  },
  args: {
    theme: 'light',
  },
} as ComponentMeta<typeof AwaitingVerificationScene>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AwaitingVerificationScene> = (args) => {
  globalStyles()
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      className={(args as ArgsInterface).theme === 'light' ? lightTheme : darkTheme}
    >
      <AwaitingVerificationScene />
    </div>
  )
}

export const AwaitingVerification = Template.bind({})
