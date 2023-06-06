import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const body = {
        name: data.get("firstName") + " " + data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      };

      const result = await axiosInstance.post("/api/auth/register", body);
      const { message, status } = result.data;
      setLoading(false);

      if (!status && message?.email)
        return enqueueSnackbar(message?.email[0], { variant: "error" });

      enqueueSnackbar(message, { variant: "success" });
      navigate("/auth/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          py: 7,
          px: 5,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Get Started
        </Typography>
        <Box sx={{ color: "grey", mt: 2 }}>Create your account now</Box>
        <Box
          component="form"
          // noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                size="small"
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
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                size="small"
              />
            </Grid>
          </Grid>

          <LoadingButton
            type="submit"
            sx={{ mt: 3, mb: 2, textTransform: "none" }}
            fullWidth
            variant="contained"
            loading={loading}
          >
            Sign Up
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/auth/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
