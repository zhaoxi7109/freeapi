import Footer from '@/components/Footer';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  LockOutlined,
  MobileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { userRegisterUsingPOST } from '@/services/freeapi-backend/userController';

// 弹窗信息组件
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
//注册组件
const Register: React.FC = () => {
  //获取用户登录状态和用户角色
  const [userLoginState] = useState<API.LoginResult>({});
  //获取注册方式和改变方式，account为账号密码注册，phone为手机号验证码注册
  const [type, setType] = useState<string>('account');

  //按钮点击事件,注册时需要参数用户名，密码，确认密码
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册，调用后端注册接口
      const res = await userRegisterUsingPOST({
        //展开运算符
        ...values,
      });
      if (res.data) {
        return <LoginMessage content="注册成功，请重新登录！" />;
      }
      return <LoginMessage content="注册失败，请重新注册！" />;
    } catch (error) {
      const defaultLoginFailureMessage = "注册失败，请重新注册或更换账号或密码";
      message.error(defaultLoginFailureMessage);
      return <LoginMessage content={defaultLoginFailureMessage} />
    }
  };
  //登录状态及角色
  const { status, type: loginType } = userLoginState;
  //返回Register组件内容
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.png" />}
          title="免费API"
          subTitle={'免费 API 开放平台'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values:any) => {
            //onFinish方法对应点击事件
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码注册',
              },
              {
                key: 'mobile',
                label: '手机号注册',
              },
            ]}
          />
          {/* 类似于if语句 */}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请再次确认密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
          {type === 'mobile' && (
            <>
            {/* 手机号输入框 */}
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined className={styles.prefixIcon} />,
                }}
                name="mobile"
                placeholder={'请输入手机号！'}
                rules={[
                  {
                    required: true,
                    message: '手机号是必填项！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
              />
              {/* 验证码框 */}
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={'请输入验证码！'}
                // 获取验证码展示按钮
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${'秒后重新获取'}`;
                  }
                  return '获取验证码';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
                // 获取验证码的方法
                onGetCaptcha={async (phone) => {
                  // 调用后端方法获取验证码
                  const res = await getFakeCaptcha({
                    phone,
                  });
                  //如果获取到验证码则
                  if (res.data) {
                    return;
                  }
                  message.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
