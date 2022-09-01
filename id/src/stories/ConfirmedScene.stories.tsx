import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ConfirmedScene } from 'scenes/ConfirmedScene'
import { globalStyles } from 'stitches'

export default {
  title: 'Widget',
  component: ConfirmedScene,
} as ComponentMeta<typeof ConfirmedScene>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ConfirmedScene> = () => {
  globalStyles()
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ConfirmedScene />
    </div>
  )
}

export const Confirmed = Template.bind({})
