import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

const SignInPage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {isAuthenticated ? (
        <Typography variant="h5">You are already logged in.</Typography>
      ) : (
        <div>
          <Typography variant="h4">Sign In</Typography>
          <Typography variant="body1">
            Please click the button below to log in:
          </Typography>
          <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
            <br />
            <label htmlFor="storename">Storename:</label>
            <input type="text" id="storename" name="storename" />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            <br />
            <LoginButton />
          </form>
        </div>
      )}
    </Box>
  );
};

export default SignInPage;
