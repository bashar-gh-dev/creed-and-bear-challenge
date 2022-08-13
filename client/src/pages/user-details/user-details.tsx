import { Link, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, CardActions, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import UsersService from "../../services/users";
import UserModel from "../../shared/user.model";

export default function UserDetailsPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserModel | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const usersService = new UsersService();
      setLoading(true);
      try {
        const response = await usersService.getUser(`${params.userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("unable to get user");
      }
    })();
  }, []);

  return (
    <>
      {error ? (
        <Typography>{error}</Typography>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={user?.avatar}></Avatar>}
            title={params.userId}
            subheader="September 14, 2016"
          />

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              First name: {user?.first_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last name: {user?.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user?.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to="edit"
              relative="path"
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
            <Button
              component={Link}
              to=".."
              relative="path"
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}
