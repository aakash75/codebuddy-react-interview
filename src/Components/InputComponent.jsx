import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const steps = ['Form 1', 'Form 2 ', 'Form 3'];

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [emailfeild, setEmailfeild] = React.useState(null);
  const [error_email, setError_email] = React.useState(false);
  const [error_password, setError_password] = React.useState(false);

  const [passwordFeild, setPasswordFeild] = React.useState(null);
  const [firstname, setFirsrname] = React.useState(null);
  const [lastname, setLastname] = React.useState(null);
  const [address, setAddress] = React.useState(null);
  const [countryCode, setCountryCode] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(null);

  const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = step => step === 4;

  const isStepSkipped = step => skipped.has(step);

  function allLetter(inputtxt) {
    const letters = /^[A-Za-z]+$/;

    if (inputtxt.value.match(letters)) {
      return true;
    }

    // alert('message');
    return false;
  }

  // API CALL
  const API_CALL_FUN = () => {
    const BODY = {
      emailId: emailfeild,
      password: passwordFeild,
      firstName: firstname,
      lastName: lastname,
      address,
      countryCode,
      phoneNumber,
    };

    fetch
      .post('https://codebuddy.review/posts', BODY)
      .then(res => {
        console.log(res);
        navigate('/posts');
      })
      .catch(err => {
        // console.log(err);
      });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (emailfeild == null || emailfeild === '') {
        setError_email(true);
        return;
      }

      if (passwordFeild == null || passwordFeild === '') {
        return;
      }
    } else if (activeStep === 1) {
      const regExp = /^[A-Za-z]+$/;

      const VALID_NAME = regExp.test(firstname);

      if (VALID_NAME) {
        if (
          firstname == null ||
          firstname === '' ||
          firstname.length < 2 ||
          firstname.length > 50
        ) {
          return;
        }
      } else {
        return;
      }

      if (lastname) {
        const VALID_LASTNAME = regExp.test(firstname);
        if (!VALID_LASTNAME) {
          return;
        }
      }

      if (address == null || address === '' || address.length < 10) {
        return;
      }
    } else if (activeStep === 2) {
      // const REG_PH = /^d{10}$/;

      // const VALIDATE_PH = REG_PH.test(phoneNumber);
      // if (!VALIDATE_PH) {
      //   return;
      // }

      // if (countryCode == null || countryCode === '') {
      //   return;
      // }

      API_CALL_FUN();
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onChangeEmail = event => {
    const EMAIL_VALUE = event.target.value;
    setEmailfeild(EMAIL_VALUE);
  };

  const onChangepassword = event => {
    const PASSWORD_VALUE = event.target.value;
    setPasswordFeild(PASSWORD_VALUE);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
          // }

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1} </Typography>
          {activeStep === 0 ? (
            <div>
              <form>
                <div>
                  <TextField
                    // error={error_email}
                    id="standard-error"
                    label="email"
                    // defaultValue="Hello World"
                    type="email"
                    required
                    value={emailfeild}
                    variant="standard"
                    onChange={onChangeEmail}
                    fullWidth
                  />
                  <TextField
                    id="standard-error"
                    label="password"
                    type="password"
                    required
                    value={passwordFeild}
                    variant="standard"
                    onChange={onChangepassword}
                    fullWidth
                  />
                </div>
              </form>
            </div>
          ) : null}
          {activeStep === 1 ? (
            <div>
              <form>
                <div>
                  <TextField
                    // error={error_email}
                    id="standard-error"
                    label="first name"
                    // defaultValue="Hello World"
                    type="text"
                    required
                    value={firstname}
                    variant="standard"
                    onChange={e => setFirsrname(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    id="standard-error"
                    label="last name"
                    type="text"
                    required
                    value={lastname}
                    variant="standard"
                    onChange={e => setLastname(e.target.value)}
                    fullWidth
                  />

                  <TextField
                    id="standard-error"
                    label="address"
                    type="text"
                    required
                    value={address}
                    variant="standard"
                    onChange={e => setAddress(e.target.value)}
                    fullWidth
                  />
                </div>
              </form>
            </div>
          ) : null}
          {activeStep === 2 ? (
            <div>
              <form>
                <div>
                  <select onChange={e => setCountryCode(e.target.value)}>
                    <option value="">Please select</option>

                    <option value="+91">+91 India</option>
                    <option value="+1">+1 Amercia</option>
                  </select>
                  <TextField
                    id="standard-error"
                    label="Phone Number"
                    type="text"
                    required
                    value={phoneNumber}
                    variant="standard"
                    onChange={e => setLastname(e.target.value)}
                    fullWidth
                  />
                </div>
              </form>
            </div>
          ) : null}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

            <Button>{activeStep === steps.length - 1 ? null : 'Save'}</Button>

            {activeStep === steps.length - 1 ? (
              <Button onClick={handleNext}>Saveee</Button>
            ) : (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Save & Next'}
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
