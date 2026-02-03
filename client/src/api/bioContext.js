import apiClient from "./client";

const handleRegister = async (user) => {
  const { data } = await apiClient.post("/biology/register", user);
  return data;
};

const handleLogin = async (user) => {
  const { data } = await apiClient.post("/biology/login", user);
  return data;
};

const addCreature = async (creatureObject) => {
  const { data } = await apiClient.post("/biology/creature", creatureObject);
  return data;
};

export { handleRegister, handleLogin, addCreature };
