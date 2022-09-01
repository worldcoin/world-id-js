import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ConfirmedScene } from 'scenes/ConfirmedScene'
import { globalStyles, lightTheme, darkTheme } from 'stitches'

// FIXME: Abstract this into a reusable component for theming config
interface ArgsInterface {
  theme: 'light' | 'dark'
}

export default {
  title: 'Widget',
  component: ConfirmedScene,
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
} as ComponentMeta<typeof ConfirmedScene>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ConfirmedScene> = (args) => {
  globalStyles()
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      className={(args as ArgsInterface).theme === 'light' ? lightTheme : darkTheme}
    >
      <ConfirmedScene />
    </div>
  )
}

export const Confirmed = Template.bind({})
