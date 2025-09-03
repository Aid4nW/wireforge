import type { Meta, StoryObj } from '@storybook/nextjs';
import HarnessCanvas from '../components/HarnessCanvas';

const meta = {
  title: 'HarnessCanvas',
  component: HarnessCanvas,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HarnessCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
