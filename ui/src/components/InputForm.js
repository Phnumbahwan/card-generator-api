import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Card, CardContent, CardMedia,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import {useState} from "react";
import QRCode from "qrcode";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function InputForm() {
    const [gender, setGender] = useState('');
    const [qrcode, setQrcode] = useState('');

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender2, setGender2] = useState('');
    const [school, setSchool] = useState('');
    const [address, setAddress] = useState('');
    const [organization, setOrganization] = useState('');

    const generateQrcode = (url) => {
        QRCode.toDataURL(url, (err, url) => {
            if(err) return console.error(err)

            console.log(url)
            setQrcode(url)
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = await fetch('http://127.0.0.1/api/users', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                firstname: data.get('firstName'),
                lastname: data.get('lastName'),
                email: data.get('email'),
                age: data.get('age'),
                gender: data.get('gender'),
                school: data.get('school'),
                address: data.get('address'),
                organization: data.get('organization')
            })
        });
        const response = await res.json();
        setLastName(response.lastname);
        setFirstName(response.firstname);
        setEmail(response.email);
        setAge(response.age);
        setGender2(response.gender);
        setSchool(response.school);
        setAddress(response.address);
        setOrganization(response.organization);
        generateQrcode('http://127.0.0.1/api/users/' + response.id);
        console.log(response);
    };

    let expanded;
    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline/>
                <Grid container spacing={50}>
                    <Grid item md={6} sx={{
                        width: '100%'
                    }}>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Card elevation={16} sx={{
                                    width: 545,
                                    padding: 5
                            }}>
                                <Grid xs display="flex" justifyContent="center" alignItems="center">
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://picsum.photos/200/300"
                                        sx={{ width: 200, height: 200, margin: 0, padding: 0 }}
                                    />
                                </Grid>
                                <CardContent>
                                    <Typography sx={{ fontWeight: '100', fontSize: '10px' }}>
                                        LAST NAME
                                    </Typography>
                                    <Typography variant={'h6'} sx={{ fontWeight: '700' }}>
                                        {lastName || '---'}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '100', fontSize: '10px' }}>
                                        FIRST NAME
                                    </Typography>
                                    <Typography variant={'h6'} sx={{ fontWeight: '700' }}>
                                        {firstName || '---'}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '100', fontSize: '10px' }}>
                                        EMAIL ADDRESS
                                    </Typography>
                                    <Typography variant={'h6'} sx={{ fontWeight: '700' }}>
                                        {email || '---'}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '100', fontSize: '10px' }}>
                                        AGE
                                    </Typography>
                                    <Typography variant={'h6'} sx={{ fontWeight: '700' }}>
                                        {age || '---'}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '100', fontSize: '10px' }}>
                                        Gender
                                    </Typography>
                                    <Typography variant={'h6'} sx={{ fontWeight: '700' }}>
                                        {gender2 || '---'}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '100', fontSize: '10px' }}>
                                        School
                                    </Typography>
                                    <Typography variant={'h6'} sx={{ fontWeight: '700' }}>
                                        {school || '---'}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '100', fontSize: '10px' }}>
                                        ADDRESS
                                    </Typography>
                                    <Typography variant={'h6'} sx={{ fontWeight: '700' }}>
                                        {address || '---'}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '100', fontSize: '10px' }}>
                                        ORGANIZATION
                                    </Typography>
                                    <Typography variant={'h6'} sx={{ fontWeight: '700' }}>
                                        {organization || '---'}
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: 300,
                                            height: 300
                                        }}
                                    >
                                        {
                                            qrcode && <>
                                                <img src={qrcode}/>
                                            </>
                                        }
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Make your own Card
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="age"
                                            label="Age"
                                            name="age"
                                            autoComplete="age"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl required sx={{width: '100%'}}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
                                            <Select
                                                labelId="gender"
                                                id="gender"
                                                value={gender}
                                                name="gender"
                                                onChange={(e) => setGender(e.target.value)}
                                                autoWidth
                                                label="Gender"
                                            >
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                                <MenuItem value="secret">Secret</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="school"
                                            label="School"
                                            name="school"
                                            autoComplete="school"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            name="address"
                                            autoComplete="address"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="organization"
                                            label="Organization"
                                            name="organization"
                                            autoComplete="organization"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Generate
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}