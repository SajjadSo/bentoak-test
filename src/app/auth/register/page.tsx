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
import registerSchema from "@/models/registerSchema";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/models/user";
import { addUser } from "@/services/user.service";

export default function SignIn() {
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: FieldValues) => {
    const user = { id: uuidv4(), ...data } as User;

    try {
      await addUser(user);
      toast.success("User registered successfully.");
      router.push("/auth/login");
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                required
                fullWidth
                label="First Name"
                {...register("firstname")}
                error={Boolean(errors?.firstname)}
              />
              {errors?.firstname && (
                <Typography component="h1" variant="subtitle2" color="red">
                  {errors?.firstname.message?.toString()}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                {...register("lastname")}
                error={Boolean(errors?.lastname)}
              />
              {errors?.lastname && (
                <Typography component="h1" variant="subtitle2" color="red">
                  {errors?.lastname.message?.toString()}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                {...register("email")}
                error={Boolean(errors?.email)}
              />
              {errors?.email && (
                <Typography component="h1" variant="subtitle2" color="red">
                  {errors?.email.message?.toString()}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                {...register("password")}
                error={Boolean(errors?.password)}
              />
              {errors?.password && (
                <Typography component="h1" variant="subtitle2" color="red">
                  {errors?.password.message?.toString()}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Confirm Password"
                type="password"
                {...register("confirmPassword")}
                error={Boolean(errors?.confirmPassword)}
              />
              {errors?.confirmPassword && (
                <Typography component="h1" variant="subtitle2" color="red">
                  {errors?.confirmPassword.message?.toString()}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login">
                <Typography component="h1" variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
