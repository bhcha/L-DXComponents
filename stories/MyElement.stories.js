import '/src/components/MyElement.js'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Example/MyElement',
  component: 'my-element',
  argTypes: {
    name: { control: 'text' },
  },
};

const Template = ({ name }) => {
  return document.createElement('my-element');
};

export const Default = Template.bind({});
Default.args = {
  name: 'World',
};

export const CustomName = Template.bind({});
CustomName.args = {
  name: 'Storybook',
};

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Primary = {
//   args: {
//     primary: true,
//     label: 'Button3',
//   },
// };
//
// export const Secondary = {
//   args: {
//     label: 'Button3',
//   },
// };
//
// export const Large = {
//   args: {
//     size: 'large',
//     label: 'Button3',
//   },
// };
//
// export const Small = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
// };
