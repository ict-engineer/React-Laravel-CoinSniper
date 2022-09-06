import CoinAnimate from 'components/CoinAnimate';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useAuth } from 'store/hooks';
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import isEmail from 'utils/validation/isEmail';
import { LOCAL_STORAGE_KEY } from "../../consts";
const { USER_DATA } = LOCAL_STORAGE_KEY;

function RegisterPage() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);
  const [captchaVal, setCaptchaVal] = useState(null);
  const { signUp, authError, setAuthError } = useAuth();

  useEffect(() => {
    setAuthError('');
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  function isFormValid() {
    return name.length > 0 && email.length > 0 && password.length > 7 && password === confirmPassword && acceptTermsConditions === true && captchaVal !== null;
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const result = await signUp({ email: email, password: password, full_name: name });
    if (result) {
      let saved = localStorage.getItem(USER_DATA);
      const parsed = JSON.parse(saved);
      if (parsed.email_verified_at === null || parsed.email_verified_at === '')
        history.push('/verify_account');
      else if (parsed.user_role === 'admin')
        history.push('/dashboard')
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

  function onCaptchaChange(value) {
    setCaptchaVal(value);
  }

  return (
    <div className='flex flex-col flex-auto flex-shrink-0 items-center justify-center p-16'>
      <div className="flex flex-col items-center justify-center w-full">
        <CoinAnimate animation="transition.expandIn">
          <Card className="w-full rounded max-w-256">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img className="w-128 mb-8" src="assets/images/logo.png" alt="logo" />

              <div className="mt-8 mb-8 font-bold text-base uppercase">
                Create your account
              </div>

              <TextField
                label="Name"
                autoFocus
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                variant="outlined"
                required
                fullWidth
                onKeyDown={keyPress}
                style={{ marginBottom: "0.75rem" }}
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  }
                }}
              />

              <TextField
                label="Email"
                type="email"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  }
                }}
                value={email}
                onKeyDown={keyPress}
                onChange={e => { setEmail(e.target.value); setAuthError(''); }}
                variant="outlined"
                required
                fullWidth
                style={{ marginBottom: "0.75rem" }}
              />

              {email !== "" && !isEmail(email) ?
                <p className='text-red-700 mb-6 -mt-6'>Input valid email address.</p>
                : null
              }
              {authError !== "" ?
                <p className='text-red-700 mb-6 -mt-6'>{authError}</p>
                : null
              }

              <TextField
                label="Password"
                type="password"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  }
                }}
                value={password}
                onKeyDown={keyPress}
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                style={{ marginBottom: "0.75rem" }}
              />
              {password !== "" && password.length < 8 ?
                <p className='text-red-700 mb-6 -mt-6'>Password must be at least 8 characters.</p>
                : null
              }

              <TextField
                label="Confirm Password"
                type="password"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  }
                }}
                value={confirmPassword}
                onKeyDown={keyPress}
                onChange={e => setConfirmPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                style={{ marginBottom: "0.75rem" }}
              />

              <FormControl className="mb-8 w-full">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={acceptTermsConditions}
                      onChange={e => setAcceptTermsConditions(e.target.checked)}
                    />
                  }
                  label="I read and accept terms and conditions"
                />
              </FormControl>

              <div className="m-4"></div>

              <div className="flex justify-start w-full">
                <ReCAPTCHA
                  sitekey="6Lcjn64bAAAAAE5dqtTtys_T48G845ESIxwY8ZWg"
                  onChange={onCaptchaChange}
                />
              </div>

              <div className="m-4"></div>

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-8"
                disabled={!isFormValid()}
                onClick={handleSubmit}
              >
                REGISTER
              </Button>

              <div className="flex flex-col items-center justify-center pt-16 pb-12">
                <span className="font-medium">Already registered?</span>
                <Link className="font-medium" to="/login" style={{ color: "#22d3ee" }}>
                  Login here
                </Link>
              </div>
            </CardContent>
          </Card>
        </CoinAnimate>
      </div>
    </div >
  );
}

export default RegisterPage;
