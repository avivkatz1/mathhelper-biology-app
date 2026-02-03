// create a login function with a background image from ../data/images/creature.png
// have a toggle for showing and hiding the password
// have a toggle for remembering the user
// use modern JavaScript (ES6+) and best practices
// have a toggle for register or login
import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage from "../images/creature.png";
import { useDispatch } from "react-redux";
import { addUser } from "../store/biologySlice";
import { useNavigate } from "react-router-dom";
import { handleRegister, handleLogin } from "../api/bioContext";

const BioLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login or registration logic here
    if (formData.username.trim() === "" || formData.password.trim() === "") {
      alert("Please fill in all required fields.");
      return;
    }
    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      } else {
        const { data } = await handleRegister({
          username: formData.username,
          password: formData.password,
        });
        dispatch(addUser({ username: formData.username, password: formData.password }));
        navigate("/biology/evolutionSimulator/creaturecreation");
      }
    } else {
      const createdBy = formData.username.trim() + formData.password.trim();
      const data = await handleLogin({ createdBy: createdBy });
      dispatch(
        addUser({
          username: data.username,
          password: data.password,
          creatures: data.creatures,
          loginNumber: data.loginNumber,
        })
      );
      if (data.creatures.length === 0) {
        navigate("/biology/evolutionSimulator/creaturecreation");
        return;
      } else {
        navigate("/biology/evolutionSimulator/viewcreature");
      }
    }
  };

  return (
    <Container>
      <FormWrapper>
        <FormTitle>{isRegister ? "Register" : "Login"}</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {isRegister && (
            <Input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          )}
          <CheckboxWrapper>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </CheckboxWrapper>
          <SubmitButton type="submit">{isRegister ? "Register" : "Login"}</SubmitButton>
        </Form>
        <ToggleText onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </ToggleText>
      </FormWrapper>
    </Container>
  );
};

export default BioLogin;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  label {
    font-size: 14px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleText = styled.p`
  text-align: center;
  margin-top: 15px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
