import type { Meta, StoryObj } from '@storybook/vue3'

import type { ICollapsibleProps } from './CollapsibleDemo.vue'

import OkuCollapsibleDemo from './CollapsibleDemo.vue'

interface StoryProps extends ICollapsibleProps {

}

const meta = {
  title: 'Components/Collapsible',
  args: {
    template: '#1',
  },
  component: OkuCollapsibleDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof OkuCollapsibleDemo> & {
  args: StoryProps
}

export default meta
type Story = StoryObj<typeof meta> & {
  args: StoryProps
}

export const Styled: Story = {
  args: {
    template: '#1',
    allshow: true,
  },

  render: (args: any) => ({
    components: { OkuCollapsibleDemo },
    setup() {
      return { args }
    },
    template: `
      <OkuCollapsibleDemo v-bind="args" />
    `,
  }),
}