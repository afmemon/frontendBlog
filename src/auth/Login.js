import { LoadingButton } from "@mui/lab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { enqueueSnackbar } from "notistack";
import { encryptData } from "../lib/encryptDecrypt";
import LoginGuard from "../components/loginguard";
import CssBaseline from "@mui/material/CssBaseline";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      let data1 = new FormData(event.currentTarget);
      const body = {
        email: data1.get("email"),
        password: data1.get("password"),
      };
      const result = await axiosInstance.post("/api/auth/login", body);
      const { message, status, user, token } = result.data;
      setLoading(false);
      if (!status)
        return enqueueSnackbar(JSON.stringify(message), { variant: "error" });

      localStorage.setItem("token", token);
      localStorage.setItem("d", encryptData(JSON.stringify(user)));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginGuard>
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "white",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
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
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/auth/register">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </LoginGuard>
  );
}
