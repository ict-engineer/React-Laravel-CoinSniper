import CoinAnimate from 'components/CoinAnimate';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useAuth } from 'store/hooks';
import { useHistory } from "react-router-dom";
import isEmail from 'utils/validation/isEmail';
import { Link } from 'react-router-dom';

function ResetPasswordPage({ location }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetAuthPassword } = useAuth();

  function isFormValid() {
    return email.length > 0 && password.length > 7 && password === confirmPassword;
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    let token = urlParams.get('token');
    const result = await resetAuthPassword({ email: email, password: password, token: token, password_confirmation: confirmPassword });
    if (result)
      history.push('/login');
  }

  return (
    <div className='flex flex-col flex-auto flex-shrink-0 items-center justify-center p-16'>
      <div className="flex flex-col items-center justify-center w-full">
        <CoinAnimate animation="transition.expandIn">
          <Card className="w-full rounded max-w-256">
            <CardContent className="flex flex-col items-center justify-center p-96">
              <img className="w-128 mt-32 mb-8" src="assets/images/logo.png" alt="logo" />

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
                onChange={e => { setEmail(e.target.value); }}
                variant="outlined"
                required
                fullWidth
                style={{ marginBottom: "0.75rem" }}
              />

              {email !== "" && !isEmail(email) ?
                <p className='text-red-700 mb-6 -mt-6'>Input valid email address.</p>
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
                onChange={e => setConfirmPassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
                style={{ marginBottom: "0.75rem" }}
              />

              <div className="m-4"></div>

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-8"
                disabled={!isFormValid()}
                onClick={handleSubmit}
              >
                RESET PASSWORD
              </Button>

              <div className="flex flex-col items-center justify-center pt-24 pb-24 w-full">
                <Link className="font-medium" to="/login" style={{ color: "#22d3ee" }}>
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </CoinAnimate>
      </div>
    </div >
  );
}

export default ResetPasswordPage;
