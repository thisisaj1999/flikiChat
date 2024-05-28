import React from 'react';
import WHeader from '../../../components/Form/WHeader';
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
    <WHeader width={'25rem'} comp={"Login"}>
      <LoginForm fields={loginFields} />
    </WHeader>
  );
};

export default index;
