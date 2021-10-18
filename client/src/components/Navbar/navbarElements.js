//@ts-check
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #5d1049;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  padding-top: 20px;
  z-index: 1;
  border-bottom: 50px solid #720d5d;

  @media screen and (max-width: 480px) {
    width: 100vw;
  }
`;

export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;
  margin-left: -100px;
  @media screen and (max-width: 480px) {
    margin-left: 6vw;
  }
`;

export const NavLink = styled(Link)`
  color: #dbc0c0;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  margin-left: 10px;
  margin-right: 10px;
  height: 40px;
  cursor: pointer;
  &.active {
    color: white;
    font-weight: 550;
    border: 2px solid white;
    border-radius: 25px;
  }
  &:hover {
    color: white;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 4vh;
    left: 10vw;
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: -100px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
