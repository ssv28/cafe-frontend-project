import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Card, Typography } from '@mui/material';

const Client = () => {
    const initialValues = {
        name: '',
        email: '',
        contactNumber: '',
        password: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name should be at least 2 characters long'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        contactNumber: Yup.string()
            .matches(/^\d{10}$/, 'Contact number must be exactly 10 digits')
            .required('Contact number is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long')
    });

    const onSubmit = (values, { resetForm }) => {
        axios
            .post('http://localhost:3000/client', values)
            .then(() => {
                console.log("====>>>");  
                resetForm();
            })
            .catch((error) => {
                console.error('Error creating client:', error);
            });
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: '#faf3e0', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ color: '#8d6e63', fontFamily: 'Georgia, serif', fontWeight: "bold" }}>
                Client Registration
            </Typography>

            <Card style={{ padding: '2rem', maxWidth: '500px', margin: '2rem auto', backgroundColor: '#fff8e1' }}>
                <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={onSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            {/* Name Field */}
                            <div style={{ marginBottom: '1rem' }}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    variant="outlined"
                                    value={values.name}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                                />
                                <ErrorMessage name="name" component="div" style={{ color: 'red', marginTop: '0.5rem' }} />
                            </div>

                            {/* Email Field */}
                            <div style={{ marginBottom: '1rem' }}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                    value={values.email}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                                />
                                <ErrorMessage name="email" component="div" style={{ color: 'red', marginTop: '0.5rem' }} />
                            </div>

                            {/* Contact Number Field */}
                            <div style={{ marginBottom: '1rem' }}>
                                <TextField
                                    fullWidth
                                    label="Contact Number"
                                    name="contactNumber"
                                    variant="outlined"
                                    value={values.contactNumber}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                                />
                                <ErrorMessage name="contactNumber" component="div" style={{ color: 'red', marginTop: '0.5rem' }} />
                            </div>

                            {/* Password Field */}
                            <div style={{ marginBottom: '1rem' }}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    value={values.password}
                                    onChange={handleChange}
                                    style={{ backgroundColor: '#ffffff', borderRadius: '5px' }}
                                />
                                <ErrorMessage name="password" component="div" style={{ color: 'red', marginTop: '0.5rem' }} />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{
                                    background: 'linear-gradient(to right, #ff9a8b, #ff6a88, #ff99ac)',
                                    color: '#ffffff',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    borderRadius: '25px'
                                }}
                            >
                                Register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default Client;
