import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {login, getMe} from "../../store/reducer/user";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";

const theme = createTheme();


function Auth({authorization, login, getMe}) {
    let navigate = useNavigate();


    useEffect(() => {
        getMe()
    }, [])


    useEffect(() => {
        if (authorization)
            navigate('/dashboard')
    }, [authorization])


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const phoneNumber = data.get('phoneNumber')
        const password = data.get('password')
        if (phoneNumber && password)
            login({
                phoneNumber,
                password
            })
        else
            toast.error('You need to fill all inputs', {
                autoClose: 1500
            })
    };

    return <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Mail/Phone number"
                        name="phoneNumber"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>

}

export default connect(({user: {authorization}}) => ({authorization}),
    {login, getMe})(Auth);