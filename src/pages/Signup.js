import React, { useState } from 'react';
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
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Validation schema using Yup
const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  role: Yup.string().required('Role is required'),
});

function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #FFD194, #D1913C)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} sm={8} md={5} lg={4}>
          <Paper elevation={10} sx={{ p: 4, borderRadius: 2 }}>
            <Box textAlign="center" mb={3}>
              <Avatar sx={{ m: 'auto', bgcolor: '#D1913C' }}>
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
                Café Sign Up
              </Typography>
            </Box>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                role: '',
              }}
              validationSchema={signupSchema}
              onSubmit={async (values, { resetForm }) => {
                console.log(values);
                
                setLoading(true);
                try {
                  const res = await axios.post(
                    'http://localhost:3000/admin/signup',
                    values
                  );
                  console.log("===>>>",res);
                  setData(res)
                  localStorage.setItem('token', res.data.token);
                  navigate('/admin/login');
                } catch (err) {
                  console.error('Sign Up failed:', err);
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
                    label="Full Name"
                    name="name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter your name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon style={{ color: '#D1913C' }} />
                        </InputAdornment>
                      ),
                    }}
                    helperText={
                      <ErrorMessage
                        name="name"
                        component="div"
                        style={{ color: 'red', fontSize: '12px' }}
                      />
                    }
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    label="Email Address"
                    name="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter your email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon style={{ color: '#D1913C' }} />
                        </InputAdornment>
                      ),
                    }}
                    helperText={
                      <ErrorMessage
                        name="email"
                        component="div"
                        style={{ color: 'red', fontSize: '12px' }}
                      />
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
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter your password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon style={{ color: '#D1913C' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                            {showPassword ? (
                              <VisibilityOff style={{ color: '#D1913C' }} />
                            ) : (
                              <Visibility style={{ color: '#D1913C' }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    helperText={
                      <ErrorMessage
                        name="password"
                        component="div"
                        style={{ color: 'red', fontSize: '12px' }}
                      />
                    }
                  />
                </Box>
                <Box mb={2}>
                  <Field
                    as={TextField}
                    select
                    label="Role"
                    name="role"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="role"
                        component="div"
                        style={{ color: 'red', fontSize: '12px' }}
                      />
                    }
                  >
                    <MenuItem value="" disabled>
                      Select Role
                    </MenuItem>
                    <MenuItem value="superadmin">Super Admin</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                  </Field>
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                  </Button>
                </Box>
              </Form>
            </Formik>
            <Box mt={2} textAlign="center">
              <Typography variant="body2" color="textSecondary">
                Already have an account?{' '}
                <Button color="primary" onClick={() => navigate('/admin/login')}>
                  Login
                </Button>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Signup;
