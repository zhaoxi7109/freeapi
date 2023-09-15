import {GithubOutlined} from '@ant-design/icons';
import '@umijs/max';
import React from 'react';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = '版权所有归属——昭晞';
  const currentYear = new Date().getFullYear();
  const beiAnMessage = '黔ICP备2023011136号';
  return (
  <DefaultFooter
    copyright= {`${currentYear} ${defaultMessage}`}
    links={[
      {
        key: 'myBlog',
        title: 'zhaoxi的小破站',
        href: 'https://zhaoxi7109.github.io/',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/zhaoxi7109/freeapi',
        blankTarget: true,
      },
      {
        key: 'beianMessage',
        title: beiAnMessage,
        href: 'http://beian.miit.gov.cn/',
        blankTarget: true,
      },
    ]}
  />
  );
};
export default Footer;
