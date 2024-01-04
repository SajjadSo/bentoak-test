import { User } from "@/models/user";

export const addUser = async (user: User) => {
  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (res.status === 400) {
    throw new Error("Email already exists!");
  }

  if (res.status === 500) {
    throw new Error("Error on registering a new user");
  }
};

export const login = async (user: Partial<User>) => {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if (res.status === 404) {
    throw new Error("User not found!");
  }
  if (res.status === 500) {
    throw new Error("Error on logging in user!");
  }
};

export const logout = async () => {
  await fetch(`/api/auth/logout`, {
    method: "GET"
  });
};
