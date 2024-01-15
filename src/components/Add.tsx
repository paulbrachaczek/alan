import Button from "@material-ui/core/Button";
import { CssBaseline, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography"; 
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import * as Yup from 'yup';
import Select from '@mui/material/Select';
import { useNavigate  } from "react-router-dom";

const BASE_URL = "http://localhost:4000/events";
const phoneRegex = RegExp(
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
);

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Field is required'),
  description: Yup.string().min(10, 'Too Short').max(250, 'Too Long').required('Field is Required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  type: Yup.string().required('Field is required'),
  phone: Yup.string().required('Field is required').matches(phoneRegex, "Invalid phone number"),
  address: Yup.string().required('Field is required'),
  date: Yup.string().required('Field is required'),
});

interface Values {
  id: number;
  title: string;
  date: string;
  picture: string;
  type: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export default function Add() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      id: 0,
      title: '',
      date: '',
      picture: 'https://loremflickr.com/200/200',
      type: '',
      email: '',
      phone: '',
      description: '',
      address: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: Values) => {
      const newEvent = JSON.stringify(values);
      const headers = {"Content-Type": "application/json"}

      try {
        const response = await fetch(BASE_URL, {
          method: 'POST',
          headers,
          body: newEvent
        });
        navigate("/");
      } catch (error) {
        console.error('Fetch error: ', error);
      }

    }
  });
  
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 30,
          }}
        > 
          <Typography component="h1" variant="h5">
            Add new Event
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="filled"
                    autoComplete="given-title"
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="typeLabel">{formik.values.type.length ? '' : 'Type'}</InputLabel>
                    <Select
                      labelId="typeLabel"
                      id="type"
                      value={formik.values.type}
                      label="Event Type"
                      name="type"
                      onChange={formik.handleChange}
                      error={formik.touched.type && Boolean(formik.errors.type)}
                    >
                      <MenuItem value={'culture'}>Culture</MenuItem>
                      <MenuItem value={'health'}>Health</MenuItem>
                      <MenuItem value={'sport'}>Sport</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="date"
                    name="date"
                    value={formik.values.date}
                    onChange={(value) => formik.setFieldValue("date", value, true)}
                    slotProps={{
                      textField: {
                          variant: "outlined",
                          error: formik.touched.date && Boolean(formik.errors.date),
                          helperText: formik.touched.date && formik.errors.date
                      }
                    }}
                  />
                </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    variant="filled"
                    id="description"
                    label="description"
                    name="description"
                    autoComplete="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="picture"
                    label="picture"
                    name="description"
                    autoComplete="picture"
                    value={formik.values.picture}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    variant="filled"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone number"
                    name="phone"
                    variant="filled"
                    autoComplete="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="adress"
                    label="Address"
                    name="address"
                    variant="filled"
                    autoComplete="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button type='button' variant="contained" 
                  disabled={!formik.dirty} onClick={() => formik.resetForm()}>
                    Reset form
                  </Button>
                </Grid>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button type='submit' variant="contained">Add event</Button>
                </Grid>          
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
  );
}
