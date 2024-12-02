// import React from 'react';
// import { Formik, Form } from 'formik';
// import { Container, TextField, Button, Typography, Box, Paper, CircularProgress, MenuItem } from '@mui/material';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// // Validation schema using Yup
// const SignupSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email format').required('Email is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   role: Yup.string().required('Role is required'),
// });

// function Signup() {
//   const navigate = useNavigate();

//   // Form submit handler
//   const handleSubmit = async (values, { setSubmitting, setErrors }) => {
//     try {
//       await axios.post('http://localhost:3000/admin/signup', values);
//       navigate('/admin/login');
//     } catch (error) {
//       setErrors({ apiError: 'Signup failed. Please try again.' });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" style={{ marginTop: '100px' }}>
//       <Paper elevation={8} style={{ padding: '40px', backgroundColor: '#fff1e1', borderRadius: '10px' }}>
//         <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'Pacifico', color: '#8e4b2f' }}>
//           Café Sign-Up
//         </Typography>
//         <Typography variant="body1" align="center" style={{ marginBottom: '20px', color: '#6a3310' }}>
//           Join our Café community and get started today!
//         </Typography>

//         <Formik
//           initialValues={{ name: '', email: '', password: '', role: '' }}
//           validationSchema={SignupSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
//             <Form>
//               <TextField
//                 name="name"
//                 label="Full Name"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 value={values.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.name && Boolean(errors.name)}
//                 helperText={touched.name && errors.name}
//                 InputLabelProps={{ style: { color: '#8e4b2f' } }}
//                 style={{ marginBottom: '15px' }}
//               />
//               <TextField
//                 name="email"
//                 label="Email Address"
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//                 value={values.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.email && Boolean(errors.email)}
//                 helperText={touched.email && errors.email}
//                 style={{ marginBottom: '15px' }}
//               />
//               <TextField
//                 name="password"
//                 label="Password"
//                 fullWidth
//                 margin="normal"
//                 type="password"
//                 variant="outlined"
//                 value={values.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.password && Boolean(errors.password)}
//                 helperText={touched.password && errors.password}
//                 style={{ marginBottom: '15px' }}
//               />
//               <TextField
//                 name="role"
//                 label="Role"
//                 fullWidth
//                 margin="normal"
//                 select
//                 variant="outlined"
//                 value={values.role}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 error={touched.role && Boolean(errors.role)}
//                 helperText={touched.role && errors.role}
//                 style={{ marginBottom: '15px' }}
//               >
//                 <MenuItem value="" disabled>
//                   Select Role
//                 </MenuItem>
//                 <MenuItem value="superadmin">Super Admin</MenuItem>
//                 <MenuItem value="admin">Admin</MenuItem>
//                 <MenuItem value="manager">Manager</MenuItem>
//               </TextField>

//               {errors.apiError && (
//                 <Typography color="error" align="center" style={{ marginTop: '10px' }}>
//                   {errors.apiError}
//                 </Typography>
//               )}

//               <Box textAlign="center" marginTop={3}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   disabled={isSubmitting}
//                   style={{
//                     backgroundColor: '#8e4b2f',
//                     color: 'white',
//                     padding: '10px 30px',
//                     borderRadius: '20px',
//                     textTransform: 'none',
//                   }}
//                 >
//                   {isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}
//                 </Button>
//               </Box>
//             </Form>
//           )}
//         </Formik>
//       </Paper>
//     </Container>
//   );
// }

// export default Signup;
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, CircularProgress, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Role is required'),
});

function Signup() {
  const navigate = useNavigate();

  // State for form fields and errors
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setErrors({});

    try {
      // Validate form data with Yup
      await SignupSchema.validate(formData, { abortEarly: false });
      setIsSubmitting(true);

      // Make API request
      await axios.post('http://localhost:3000/admin/signup', formData);
      navigate('/admin/login');
    } catch (err) {
      if (err.name === 'ValidationError') {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        setApiError('Signup failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Paper elevation={8} style={{ padding: '40px', backgroundColor: '#fff1e1', borderRadius: '10px' }}>
        <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'Pacifico', color: '#8e4b2f' }}>
          Café Sign-Up
        </Typography>
        <Typography variant="body1" align="center" style={{ marginBottom: '20px', color: '#6a3310' }}>
          Join our Café community and get started today!
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Full Name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            InputLabelProps={{ style: { color: '#8e4b2f' } }}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            name="email"
            label="Email Address"
            fullWidth
            margin="normal"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            name="password"
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            name="role"
            label="Role"
            fullWidth
            margin="normal"
            select
            variant="outlined"
            value={formData.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
            style={{ marginBottom: '15px' }}
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            <MenuItem value="superadmin">Super Admin</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </TextField>

          {apiError && (
            <Typography color="error" align="center" style={{ marginTop: '10px' }}>
              {apiError}
            </Typography>
          )}

          <Box textAlign="center" marginTop={3}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: '#8e4b2f',
                color: 'white',
                padding: '10px 30px',
                borderRadius: '20px',
                textTransform: 'none',
              }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
