import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, MenuItem, Card, Typography } from '@mui/material';

const Reservation = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/reservation/all')
            .then((res) => setClients(res.data))
            .catch((err) => console.error(err));
    }, []);

    const initialValues = {
        client: '',
        date: '',
        numberOfPeople: '',
        status: 'pending',
    };

    const validationSchema = Yup.object({
        client: Yup.string().required('Client is required'),
        date: Yup.date().required('Date is required'),
        numberOfPeople: Yup.number()
            .required('Number of people is required')
            .min(1, 'At least 1 person'),
        status: Yup.string().required('Status is required'),
    });

    const onSubmit = (values, { resetForm }) => {
        axios
            .post('http://localhost:3000/reservation/create', values)
            .then(() => {
                console.log("===>>>");
                resetForm();
            })
            .catch((error) => {
                console.error('Error creating reservation:', error);
            });
    };

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f8f5f2', minHeight: '100vh' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontFamily: 'Georgia, serif', fontWeight: "bold", color: '#5d4037' }}>
                Café Reservation Form
            </Typography>

            <Card style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto', backgroundColor: '#fff8e1' }}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <div style={{ marginBottom: '1rem' }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Client"
                                    name="client"
                                    value={values.client}
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="">Select Client</MenuItem>
                                    {clients.map((client) => (
                                        <MenuItem key={client._id} value={client._id}>
                                            {client.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <ErrorMessage name="client" component="div" style={{ color: 'red' }} />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Date"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    label="Number of People"
                                    name="numberOfPeople"
                                    value={values.numberOfPeople}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="Enter number of people"
                                />
                                <ErrorMessage name="numberOfPeople" component="div" style={{ color: 'red' }} />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="confirmed">Confirmed</MenuItem>
                                    <MenuItem value="cancelled">Cancelled</MenuItem>
                                </TextField>
                                <ErrorMessage name="status" component="div" style={{ color: 'red' }} />
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{
                                    background: 'linear-gradient(to right, #ff9a8b, #ff6a88, #ff99ac)',
                                    color: 'white',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                Create Reservation
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default Reservation;
