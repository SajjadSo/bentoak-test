const BASE_URL = "https://dummyjson.com/products";

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}`, {
    method: "GET"
  });

  if (!res.ok) {
    throw new Error("Error on getting all products!");
  }

  return res.json();
};
