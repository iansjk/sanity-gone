import { Meta, Story } from "@storybook/react";
import AuthorCredit, { AuthorCreditProps } from "./AuthorCredit";

export default {
  title: "Introduction/AuthorCredit",
  component: AuthorCredit,
} as Meta;

const Template: Story<AuthorCreditProps> = (args) => <AuthorCredit {...args} />;
export const Default = Template.bind({});
Default.args = {
  authorDiscordTag: "nikoleye#5580",
};
