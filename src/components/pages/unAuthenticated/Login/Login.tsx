import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { mock } from '../../../../providers/auth';
import ButtonC from '../../../misc/ButtonC/ButtonC';
import InputC from '../../../misc/InputC/InputC';
import Logo from '../../../misc/LogoC/LogoC';
import TabsC from '../../../misc/TabsC/TabsC';
import UnAuthenticatedLayout from '../UnAuthenticatedLayout/UnAuthenticatedLayout';

import './Login.scss';


function LoginWithPhoneNumberBody(props: any) {

  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');

  return <div>

    <InputC
      value={phone}
      onChange={(e: any) => {
        setPhone(e.target.value)
      }}
      title='Phone Number' type='number' placeholder='Enter your phone number' />
    <br />
    <InputC
      value={pin}
      onChange={(e: any) => {
        setPin(e.target.value)
      }}
      title='Pin' type='password' placeholder='Enter pin' />
    <span style={{ fontWeight: 'bold', display: 'inline-block', marginTop: '10px', fontSize: '14px' }} className='text-primary cursor' onClick={() => props.setMode('reset')}>Forgot PIN?</span>

    <br />
    <br />

    <ButtonC
      disabled={!phone || !pin}
      onClick={async () => {
        await mock()

        props.history.push('/dashboard')

      }}
      style={{ width: '100%' }} className='btn btn-block btn-primary text-white'>
      Log in
    </ButtonC>

  </div>
}
function LoginWithEmailAddressBody(props: any) {

  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');


  return <div>

    <InputC
      value={email}
      onChange={(e: any) => {
        setEmail(e.target.value)
      }}
      title='Email Address' type='email' placeholder='Enter your phone number' />
    <br />
    <InputC
      value={pin}
      onChange={(e: any) => {
        setPin(e.target.value)
      }}
      title='Pin' type='password' placeholder='Enter pin' />
    <span style={{ fontWeight: 'bold', display: 'inline-block', marginTop: '10px', fontSize: '14px' }} className='text-primary cursor' onClick={() => props.setMode('reset')}>Forgot PIN?</span>

    <br />
    <br />

    <ButtonC
      disabled={!email || !pin}
      onClick={async () => {
        await mock()

        props.history.push('/dashboard')

      }}
      style={{ width: '100%' }} className='btn btn-block btn-primary text-white'>
      Log in
</ButtonC>

  </div>
}



function Login(props: any) {

  const [mode, setMode] = useState('login')
  const [phoneOrEmail, setPhoneOrEmail] = useState('')
  const [otp, setOtp] = useState('')

  const [restrictResendOTP, setRestrictResendOTP] = useState(60);

  useEffect(() => {
    const ref = setInterval(() => {
      if (restrictResendOTP == 0 || mode!='otp') return;

      setRestrictResendOTP(restrictResendOTP - 1);
    }, 1000)

    return () => {
      clearInterval(ref)
    }
  })


  return (
    <UnAuthenticatedLayout>
      <div className='Login'>
        {mode == 'login' && <>
          <span className='h3 font-weight-bold'>Welcome back</span>
          <br />
          <span className='small'>Sign in to keep using Nirra</span>

          <br />
          <br />

          <TabsC tabs={[

            {
              title: 'Log in With Phone Number',
              body: () => <LoginWithPhoneNumberBody {...props} setMode={setMode} />
            },
            {
              title: 'Log in With Email Address',
              body: () => <LoginWithEmailAddressBody {...props} setMode={setMode} />
            },
          ]} />
          <span className='d-inline-block' style={{ paddingTop: '30px' }}>
            Don't have an account ? <Link to='/register' className='text-primary' style={{ fontWeight: 'bold' }}>Register Now</Link>

          </span>
        </>}



        {mode == 'reset' && <>
          <span className='h3 font-weight-bold'>Reset Pin</span>
          <br />
          <span className='small'>Enter your phone number or email address</span>

          <br />
          <br />
          <div style={{ textAlign: 'left' }}>
            <InputC
              value={phoneOrEmail}
              onChange={(e: any) => {
                setPhoneOrEmail(e.target.value)
              }}
              title='Phone Number or Email Address' type='email' placeholder='Enter your phone number or email address' />
          </div>

          <br />



          <ButtonC
            disabled={!phoneOrEmail}
            onClick={async () => {
              await mock()

              setMode('otp')

            }}
            style={{ width: '100%' }} className='btn btn-block btn-primary text-white'>
            Send OTP
          </ButtonC>


          <span className='text-center d-block' style={{ paddingTop: '20px' }}>
            <span onClick={() => {
              setMode('login')

            }} className='text-primary cursor' style={{ fontWeight: 'bold' }}>Back To Login</span>

          </span>

        </>}




        {mode=='otp' && <>

<span className='h3 font-weight-bold'>Verify your {false ? 'email address' : 'phone number'}</span>
<br />
<span className='small'>Enter the 4 digit verification code sent to your {false ? 'email address' : 'phone number'} <b style={{ fontWeight: 'bold' }}>{phoneOrEmail}</b></span>


<div>
  <br />
  <br />
  <br />

  <div style={{ display: 'flex', justifyContent: 'center' }}>

    <OtpInput
      inputStyle={{
        width: '50px',
        height: '50px',
        border: '1px solid #C9C9C9',
        borderRadius: '5px'
      }}
      value={otp}
      onChange={setOtp}
      numInputs={4}
      separator={<span style={{
        display: 'inline-block',
        width: '5px'
      }}> </span>}
    />

  </div>
  <br />

  {restrictResendOTP == 0 ? <span style={{ display: 'inline-block', marginTop: '10px', fontSize: '14px' }}>Didn't recieve the code? <a

    onClick={() => {


      setMode('reset')
    }}

    className='text-primary2 cursor' style={{ fontWeight: 'bold' }}>Resend OTP</a></span>

    :

    <span style={{ display: 'inline-block', marginTop: '10px', fontSize: '14px', fontWeight: 'bold' }} className='text-primary cursor'>Resend OTP in 0:{restrictResendOTP}s</span>
  }

  <br />
  <br />
  <br />
</div>

<ButtonC
  disabled={!otp}
  onClick={async () => {
    await mock()

    props.history.push('/dashboard')

  }}
  style={{ width: '100%' }} className='btn btn-block btn-primary text-white'>
  Continue
</ButtonC>


<span className='text-center d-block' style={{ paddingTop: '20px' }}>
  <span onClick={() => {
    setMode('reset')

  }} className='text-primary cursor' style={{ fontWeight: 'bold' }}>{false ? 'Change Email Address' : 'Change Phone Number'}</span>

</span>
<br />

</>}





      </div>

    </UnAuthenticatedLayout>



  );
}

export default Login;
