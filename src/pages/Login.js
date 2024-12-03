import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Avatar,
  InputAdornment,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

function Login() {
  const Token = localStorage.getItem('Token')
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect (() => {
    if(Token) {
      navigate('/admin')
    }
  },[Token])

  return (
    <>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <CircularProgress size={60} style={{ color: '#fff' }} />
        </Box>
      )}

      <Grid
        container
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f7c59f, #d9946c)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} sm={8} md={5} lg={4}>
          <Paper elevation={10} style={{ padding: '30px', borderRadius: '20px' }}>
            <Box textAlign="center" mb={3}>
              <Avatar style={{ margin: 'auto', backgroundColor: '#d9946c' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                variant="h5"
                style={{
                  marginTop: '10px',
                  color: '#5a342c',
                  fontWeight: 'bold',
                  fontFamily: 'Georgia, serif',
                }}
              >
                Café Login
              </Typography>
            </Box>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginSchema}
              onSubmit={async (values, { resetForm }) => {
                setLoading(true);
                try {
                  const res = await axios.post('http://localhost:5500/admin/login', values);
                  console.log(res.data.token);
                  
                  localStorage.setItem('token', res.data.token);
                  navigate('/admin');
                } catch (err) {
                  console.error('Login failed:', err);
                } finally {
                  setLoading(false);
                  resetForm();
                }
              }}

              
              
            >

              <Form>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    label="Email Address"
                    name="email"
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon style={{ color: '#d9946c' }} />
                        </InputAdornment>
                      ),
                    }}
                    style={{ borderRadius: '10px' }}
                    helperText={
                      <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '12px' }} />
                    }
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon style={{ color: '#d9946c' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                            {showPassword ? (
                              <VisibilityOff style={{ color: '#d9946c' }} />
                            ) : (
                              <Visibility style={{ color: '#d9946c' }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ borderRadius: '10px' }}
                    helperText={
                      <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '12px' }} />
                    }
                  />
                </Box>
                <Box textAlign="center" mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      backgroundColor: loading ? '#aaa' : '#D1913C',
                      color: '#fff',
                      py: 1.5,
                      px: 5,
                    }}
                  >
                    {loading ? 'Loading...' : 'Login'}
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;

