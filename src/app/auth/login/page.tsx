"use client";

import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/models/loginSchema";
import { login } from "@/services/user.service";

export default function SignIn() {
  const router = useRouter();

  const {
    register,
    unregister,
    watch,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: FieldValues) => {
    try {
      await login(data);
      toast.success("User logged in successfully.");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            autoFocus
            required
            fullWidth
            label="Email Address"
            margin="normal"
            {...register("email", {
              required: true
            })}
            error={Boolean(errors?.email)}
          />
          {errors?.email && (
            <Typography component="h1" variant="subtitle2" color="red">
              Email Address is required!
            </Typography>
          )}
          <TextField
            required
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            error={Boolean(errors?.password)}
          />
          {errors?.password && (
            <Typography component="h1" variant="subtitle2" color="red">
              Password length should be more than 6 characters!
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/auth/register">
                <Typography component="h1" variant="body2">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
