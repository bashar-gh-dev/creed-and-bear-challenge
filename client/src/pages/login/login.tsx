import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../components/shared/auth/auth.context";
import AuthService from "../../services/auth";

const LoginPage = () => {
  const authState = useContext(AuthContext);

  const [email, setEmail] = useState("test@gmail.com");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError("");
    const authService = new AuthService();
    setLoading(true);
    try {
      const authData = await authService.login(email);
      if (authData.data.user.id) {
        authState.setAuth({ user: authData.data.user });
        setLoading(false);
      } else {
        setError("unable to login");
        setLoading(false);
      }
    } catch (e) {
      setError("unable to login");
    }
  };

  if (authState.auth?.user.id) return <Navigate to={"/"} />;

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader title="Login" />
            <CardContent>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    id="firstName"
                    label="First name"
                    value={email}
                    onInput={(e: any) => setEmail(e.target.value)}
                  />
                </div>
                {error ? <p>{error}</p> : <></>}
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "1rem" }}
                onClick={login}
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </Box>
      )}
    </>
  );
};

export default LoginPage;
