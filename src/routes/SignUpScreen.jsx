import React from "react";
import { Form, Input, Typography, Select, Modal, Row } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import axios from 'axios';
import PopButton from "../components/AnimatedButton";
import AppTopBar from "../components/TopNavBar";
import FormDiv from "../components/FormDiv";
import axios from "axios";
import { localhost } from "./JobsScreen";

const { Title } = Typography;

function SignupScreen () {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
        // Call the register method of UserController to register a new user
            await axios.post(`${localhost}/register`, {
                username: values.name,
                email: values.email,
                password: values.password,
                type: values.type
            }).then((response) => {
                Modal.confirm({
                title: 'Registered successfully',
                content: (
                <div>
                    <p id='success'>You Have Registered Successfully!</p>
                </div>
                ),
                footer: [
                <Row key="row" flex="auto" justify="space-between">
                    <PopButton key="submit" type="primary" onClick={() => {
                    Modal.destroyAll();
                    navigate('/login');
                    }}>
                    Ok
                    </PopButton>
                </Row>
                ]}).catch((error) => {
                    Modal.confirm({
                    title: 'Registered failed',
                    content: (
                    <div>
                        <p id='success'>Register Failed!</p>
                    </div>
                    ),
                    footer: [
                    <Row key="row" flex="auto" justify="space-between">
                        <PopButton key="submit" type="primary" onClick={() => {
                        Modal.destroyAll();
                        }}>
                        Ok
                        </PopButton>
                    </Row>
                    ]
                });
            });
        });

        }catch (error) {
        // Show error modal on registration failure
        console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AppTopBar navigate={navigate} />
        <FormDiv style={{ position: 'absolute', top: '30vh' }}>
        <Title level={2}>Sign up</Title>
        <Form name="signup" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item name='type'>
            <Select value='Consumer'>
                <Select.Option value="Consumer">Consumer</Select.Option>
                <Select.Option value="Maker">Maker</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator (_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <PopButton type="primary" htmlType="submit" block>
              Sign up
            </PopButton>
          </Form.Item>
        </Form>
      </FormDiv>
    </div>
  );
}

export default SignupScreen;