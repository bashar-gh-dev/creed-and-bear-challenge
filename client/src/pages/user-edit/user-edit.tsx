import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
  Box,
  Button,
  CardActions,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserModel from "../../shared/user.model";
import UsersService from "../../services/users";

export default function UserEditPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, setUser] = useState<UserModel | undefined>(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const usersService = new UsersService();
      setLoading(true);
      try {
        const response = await usersService.getUser(`${params.userId}`);
        setUser(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("unable to get user");
      }
    })();
  }, []);

  const handleEditUser = async () => {
    const usersService = new UsersService();
    try {
      setLoading(true);
      await usersService.updateUser(`${params.userId}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      setLoading(false);
      navigate("..", { relative: "path" });
    } catch (e) {
      setLoading(false);
      setError("unable to update user");
    }
  };

  return (
    <>
      {error ? (
        <Typography>{error}</Typography>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title={params.userId} subheader="September 14, 2016" />
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
                  value={firstName}
                  onInput={(e: any) => setFirstName(e.target.value)}
                />
                <TextField
                  required
                  id="lastName"
                  label="Last name"
                  value={lastName}
                  onInput={(e: any) => setLastName(e.target.value)}
                />
                <TextField
                  required
                  id="email"
                  label="Email"
                  value={email}
                  onInput={(e: any) => setEmail(e.target.value)}
                />
              </div>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginRight: "1rem" }}
              onClick={handleEditUser}
            >
              Save
            </Button>
            <Button
              component={Link}
              to=".."
              relative="path"
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}
