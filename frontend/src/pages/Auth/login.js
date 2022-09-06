import CoinAnimate from '../../components/CoinAnimate';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/hooks';
import { useHistory } from "react-router-dom";
import isEmail from 'utils/validation/isEmail';
import { LOCAL_STORAGE_KEY } from "../../consts";
const { USER_DATA } = LOCAL_STORAGE_KEY;

function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authError, setAuthError } = useAuth();

  useEffect(() => {
    setAuthError('');
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function isFormValid() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (ev) => {
    const result = await login({ email: email, password: password });
    if (result) {
      let saved = localStorage.getItem(USER_DATA);
      const parsed = JSON.parse(saved);
      if (parsed.email_verified_at === null || parsed.email_verified_at === '')
        history.push('/verify_account');
      else if (parsed.user_role === 'admin') {
        history.push('/dashboard')
      }
      else
        history.push('/home');
    }
  }

  const keyPress = (e) => {
    if (!isFormValid())
      return;

    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <div className='flex flex-col flex-auto flex-shrink-0 items-center justify-center p-16'>
      <div className="flex flex-col items-center justify-center w-full">
        <CoinAnimate animation="transition.expandIn">
          <Card className="w-full rounded max-w-256">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img className="w-128 m-16" src="assets/images/logo.png" alt="logo" />

              <div className="mt-8 mb-16 font-bold text-base">
                LOGIN TO YOUR ACCOUNT
              </div>

              <TextField
                label="Email"
                autoFocus
                type="email"
                value={email}
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  }
                }}
                onChange={e => { setEmail(e.target.value); setAuthError(''); }}
                variant="outlined"
                required
                fullWidth
                onKeyDown={keyPress}
                style={{ marginBottom: "0.75rem" }}
              />
              {email !== "" && !isEmail(email) ?
                <p className='text-red-700 mb-6 -mt-6'>Input valid email address.</p>
                : null
              }
              <TextField
                label="Password"
                type="password"
                value={password}
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  }
                }}
                onChange={e => { setPassword(e.target.value); setAuthError(''); }}
                variant="outlined"
                required
                fullWidth
                onKeyDown={keyPress}
                style={{ marginBottom: "0.75rem" }}
              />
              {password !== "" && password.length < 8 ?
                <p className='text-red-700 mb-6 -mt-6'>Password must be at least 8 characters.</p>
                : null
              }
              {authError !== "" ?
                <p className='text-red-700 mb-6 -mt-6'>{authError}</p>
                : null
              }

              <div className="flex items-center justify-end w-full mb-4" style={{ color: "#22d3ee" }}>
                <Link className="font-medium" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-8"
                aria-label="LOG IN"
                disabled={!isFormValid()}
                onClick={handleSubmit}
              >
                LOGIN
              </Button>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <span className="font-medium">Don't have an account?</span>
                <Link className="font-medium" to="/register" style={{ color: "#22d3ee" }}>
                  Create an account
                </Link>
              </div>
            </CardContent>
          </Card>
        </CoinAnimate>
      </div>
    </div >
  );
}

export default LoginPage;
