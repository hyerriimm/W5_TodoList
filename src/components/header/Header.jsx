import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi";

const Header = () => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <HiHome
        size="24"
        onClick={() => {
          navigate("/");
        }}
      />
      <StTitle>갓생살기 프로젝트</StTitle>
    </StContainer>
  );
};

export default Header;

const StContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  height: 45px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 0 12px;
`;

const StTitle = styled.div`
  font-size: 24px;
`;