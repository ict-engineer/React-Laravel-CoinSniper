import CoinAnimate from '../../components/CoinAnimate';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/hooks';
import isEmail from 'utils/validation/isEmail';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const { sendResetEmail } = useAuth();

  function isFormValid() {
    return email.length > 0;
  }

  const handleSubmit = async (ev) => {
    await sendResetEmail({ email: email });
  }

  return (
    <div className='flex flex-col flex-auto flex-shrink-0 items-center justify-center p-16'>
      <div className="flex flex-col items-center justify-center w-full">
        <CoinAnimate animation="transition.expandIn">
          <Card className="w-full rounded max-w-256">
            <CardContent className="flex flex-col items-center justify-center p-32">
              <img className="w-128 m-16" src="assets/images/logo.png" alt="logo" />

              <div className="mt-8 mb-16 font-bold text-base">
                FORGOT PASSWORD
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
                onChange={e => { setEmail(e.target.value); }}
                variant="outlined"
                required
                style={{ marginBottom: "0.75rem" }}
                fullWidth
              />
              {email !== "" && !isEmail(email) ?
                <p className='text-red-700 mb-6 -mt-6'>Input valid email address.</p>
                : null
              }

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-8"
                aria-label="LOG IN"
                disabled={!isFormValid()}
                onClick={handleSubmit}
              >
                Send Reset Email
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

export default ForgotPasswordPage;
