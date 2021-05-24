import React, { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { mock } from '../../../../providers/auth';
import ButtonC from '../../../misc/ButtonC/ButtonC';
import InputC from '../../../misc/InputC/InputC';
import Logo from '../../../misc/LogoC/LogoC';
import TabsC from '../../../misc/TabsC/TabsC';
import UnAuthenticatedLayout from '../UnAuthenticatedLayout/UnAuthenticatedLayout';

import './Register.scss';


function RegisterWithPhoneNumberBody(props: any) {


  const [phone, setPhone] = useState(props.phoneRef.current);

  return <div>

    <InputC
      value={phone}
      onChange={(e: any) => {
        setPhone(e.target.value)
        props.phoneRef.current = e.target.value
      }}
      title='Phone Number' type='number' subType='phone' placeholder='Enter your phone number' />
    <span style={{ display: 'inline-block', marginTop: '10px', fontSize: '14px' }}>We will send you a one-time code to verify this phone number belongs to you</span>

    <br />
    <br />
    <br />


    <ButtonC
      disabled={!phone}
      onClick={async () => {
        await mock()

        props.setVerificationMode(phone)

      }}
      style={{ width: '100%' }} className='btn btn-block btn-primary text-white'>
      Proceed
</ButtonC>

  </div>
}
function RegisterWithEmailAddressBody(props: any) {



  const [email, setEmail] = useState(props.emailRef.current);


  return <div>

    <InputC
      value={email}
      onChange={(e: any) => {
        setEmail(e.target.value)
        props.emailRef.current = e.target.value
      }}
      title='Email Address' type='email' placeholder='Enter your phone number' />

    <span style={{ display: 'inline-block', marginTop: '10px', fontSize: '14px' }}>We will send you a one-time code to verify this email address belongs to you</span>

    <br />
    <br />
    <br />

    <ButtonC
      disabled={!email}
      onClick={async () => {
        await mock()

        props.setVerificationMode(email)

      }}
      style={{ width: '100%' }} className='btn btn-block btn-primary text-white'>
      Proceed
</ButtonC>

  </div>
}



function Register(props: any) {

  const phoneRef = useRef('')
  const emailRef = useRef('')


  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [verificationMode, setVerificationMode] = useState(null);

  const [otp, setOtp] = useState('');
  const [restrictResendOTP, setRestrictResendOTP] = useState(60);

  useEffect(() => {
    const ref = setInterval(() => {
      if (restrictResendOTP == 0 || !verificationMode) return;

      setRestrictResendOTP(restrictResendOTP - 1);
    }, 1000)

    return () => {
      clearInterval(ref)
    }
  })


  return (
    <UnAuthenticatedLayout>
      <div className='Register'>
        {!verificationMode && <>

          <span className='h3 font-weight-bold'>Create your Nirra Account</span>
          <br />
          <span className='small'>Welcome, Let's get you started</span>

          <br />
          <br />

          <TabsC
            onTabChange={setActiveTabIndex}
            tabs={[

              {
                title: 'Register With Phone Number',
                body: () => <RegisterWithPhoneNumberBody {...props} setVerificationMode={(setVerificationMode)} phoneRef={phoneRef} />
              },
              {
                title: 'Register With Email Address',
                body: () => <RegisterWithEmailAddressBody {...props} setVerificationMode={setVerificationMode} emailRef={emailRef} />
              },
            ]} />
          <span className='d-inline-block' style={{ paddingTop: '30px' }}>
            Already have an account ? <Link to='/login' className='text-primary' style={{ fontWeight: 'bold' }}>Log in</Link>

          </span>
          < br />
          <span className='d-inline-block' style={{ paddingTop: '30px', fontSize: '12px' }}>
            By registering, you agree to our  <Link to='/login' className='text-primary' style={{ fontWeight: 'bold' }}>Terms and Conditions</Link>

          </span>
        </>}

        {verificationMode && <>

          <span className='h3 font-weight-bold'>Verify your {activeTabIndex == 1 ? 'email address' : 'phone number'}</span>
          <br />
          <span className='small'>Enter the 4 digit verification code sent to your {activeTabIndex == 1 ? 'email address' : 'phone number'} <b style={{ fontWeight: 'bold' }}>{verificationMode}</b></span>


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


                setVerificationMode(null)
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
              setVerificationMode(null)

            }} className='text-primary cursor' style={{ fontWeight: 'bold' }}>{activeTabIndex == 1 ? 'Change Email Address' : 'Change Phone Number'}</span>

          </span>
          <br />

        </>}



      </div>





    </UnAuthenticatedLayout>



  );
}

export default Register;
