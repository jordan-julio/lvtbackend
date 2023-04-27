import React from "react";
import { Form, Input, Modal, Row, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import axios from 'axios';
import PopButton from "../components/AnimatedButton";
import AppTopBar from "../components/TopNavBar";
import FormDiv from "../components/FormDiv";
import { localhost } from "./JobsScreen";
import axios from "axios";

const { Title } = Typography;

function LoginScreen () {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
        // Call the register method of UserController to register a new user
            const response = await axios.post(`${localhost}/login`, {
                email: values.email,
                password: values.password,
            });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.user);
                localStorage.setItem('userId', response.data.userId);
            // Show success modal and navigate to home page on success
                Modal.confirm({
                title: 'Login successfully',
                content: (
                <div>
                    <p id='success'>You Have Login Successfully!</p>
                </div>
                ),
                footer: [
                <Row key="row" flex="auto" justify="space-between">
                    <PopButton key="submit" type="primary" onClick={() => {
                    Modal.destroyAll();
                    navigate('/');
                    }}>
                    Ok
                    </PopButton>
                </Row>
                ]
            });

            } catch (error) {
            // Show error modal on registration failure
            console.log(error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AppTopBar navigate={navigate} />
            <FormDiv style={{ position: 'absolute', top: '30vh' }}>
            <Title level={2}>Login</Title>
            <Form
            form={form}
            name="normal_login"
            initialValues={{ email: '', password: '', remember: false }}
            onFinish={onFinish}
            >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <PopButton type="primary" htmlType="submit" block>
                Log in
                </PopButton>
            </Form.Item>
            </Form>
        </FormDiv>
    </div>
    );
}

export default LoginScreen;