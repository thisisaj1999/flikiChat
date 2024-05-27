import React from 'react';
import WpHeader from '../../../components/Form/WpHeader';
import LoginForm from './LoginForm';


const loginFields = [
  {
    fieldType: 'email',
    label: 'Email',
    name: 'email',
    rules: [
      { type: 'email', message: 'The input is not valid Email' },
      { required: true, message: 'Please input your Email' },
    ],
    placeholder: 'johndoe@email.com',
    className: 'LoginEmail',
  },
  {
    fieldType: 'password',
    label: 'Password',
    name: 'password',
    rules: [{ required: true, message: 'Please input your password!' }],
    placeholder: '',
    className: 'LoginPassword',
  },
];

const index = () => {
  return (
    <WpHeader>
      <LoginForm fields={loginFields} />
    </WpHeader>
  );
};

export default index;
