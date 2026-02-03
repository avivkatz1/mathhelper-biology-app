// create a shell for all the other pages in evolutionSimulator
// use modern JavaScript (ES6+) and best practices
// This shell will be used to navigate between different pages in the evolutionSimulator
// It will have a header, footer, and a main content area
// It will be used to house all the CSS styles for the evolutionSimulator pages
import React from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

const Shell = () => {
  return (
    <Container>
      <Header>
        <Title>Evolution Simulator</Title>
        <Nav>
          <StyledLink to="/biology">Home</StyledLink>
        </Nav>
      </Header>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer>
        <FooterText>© 2024 Evolution Simulator. All rights reserved.</FooterText>
      </Footer>
    </Container>
  );
};

export default Shell;

const Container = styled.div`
  background-color: rgba(83, 204, 220, 0.11);
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  button {
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #2f9134ff;
      color: #def1dfff;
    }
  }
`;
// make header go all the way across the top

const Header = styled.header`
  background-color: rgba(74, 201, 230, 0.68);
  padding: 10px 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  /* bring to top */
`;
const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  /* bring to top */
  z-index: 50;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
`;

const FooterText = styled.p`
  margin: 0;
`;
