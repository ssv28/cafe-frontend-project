
import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import image from '../image/cafe.jpg'

const Table = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/table/find')
      .then((response) => setReservations(response.data))
      .catch((error) => console.error('Error fetching reservations:', error));
  }, []);

  const initialValues = {
    tableNumber: '',
    capacity: '',
    status: 'available',
    reservation: '',
  };

  const validationSchema = Yup.object({
    tableNumber: Yup.number().required('Table number is required'),
    capacity: Yup.number().required('Capacity is required').min(1, 'At least 1'),
    status: Yup.string().required('Status is required'),
    reservation: Yup.string().required('Reservation is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    axios
      .post('http://localhost:3000/table/create', values)
      .then((response) => {
        console.log('Table booked:', response.data);
        resetForm();
      })
      .catch((error) => console.error('Error booking table:', error));
  };

  return (
    <div
      style={{
        padding: '2rem',
        backgroundImage: {image},
        minHeight: '100vh',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        style={{
          textAlign: 'center',
          color: '#5a342c',
          fontWeight : "bold",
          marginBottom: '2rem',
          fontFamily : "'Georgia, serif'"
        }}
      >
        Café Table Management
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ marginBottom: '1rem', color: '#333' }}
            >
              Book a Table
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, handleChange }) => (
                <Form>
                  <TextField
                    label="Table Number"
                    name="tableNumber"
                    type="number"
                    value={values.tableNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="tableNumber"
                    component="div"
                    style={{ color: 'red' }}
                  />

                  <TextField
                    label="Capacity"
                    name="capacity"
                    type="number"
                    value={values.capacity}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <ErrorMessage
                    name="capacity"
                    component="div"
                    style={{ color: 'red' }}
                  />

                  <TextField
                    select
                    label="Status"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="reserved">Reserved</MenuItem>
                    <MenuItem value="occupied">Occupied</MenuItem>
                    <MenuItem value="unavailable">Unavailable</MenuItem>
                  </TextField>
                  <ErrorMessage
                    name="status"
                    component="div"
                    style={{ color: 'red' }}
                  />

                  <TextField
                    select
                    label="Reservation"
                    name="reservation"
                    value={values.reservation}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    {reservations.map((res) => (
                      <MenuItem key={res._id} value={res._id}>
                        {`Reservation on ${new Date(
                          res.date
                        ).toLocaleDateString()} for ${
                          res.numberOfPeople
                        } people`}
                      </MenuItem>
                    ))}
                  </TextField>
                  <ErrorMessage
                    name="reservation"
                    component="div"
                    style={{ color: 'red' }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                      marginTop: '1rem',
                      background:
                        'linear-gradient(90deg, #ff9a8b 0%, #ff6a88 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    Book Table
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ textAlign: 'center', color: '#333' }}
          >
            Available Reservations
          </Typography>
          {reservations.map((reservation) => (
            <Card
              key={reservation._id}
              style={{
                margin: '1rem 0',
                padding: '1rem',
                backgroundColor: '#ffecb3',
              }}
            >
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Date: {new Date(reservation.date).toLocaleDateString()}
                </Typography>
                <Typography>Guests: {reservation.numberOfPeople}</Typography>
                <Typography>Status: {reservation.status}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Table;
