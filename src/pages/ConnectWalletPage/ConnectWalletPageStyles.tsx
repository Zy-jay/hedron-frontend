import styled from "styled-components";

export const HeaderText = styled("h2")(() => ({
  fontSize: "24px",
}));

export const ConnectWalletButton = styled("button")(() => ({
  borderRadius: "30px",
  background: "#ffe6f4",
  border: "0px solid black",
  width: "10rem",
  height: "3rem",
  boxShadow: " 2px 2px 2px 2px #ffe6f4",
  cursor: "pointer",
  ":hover": {
    background: "#fffb7d",
    boxShadow: " 2px 2px 2px 2px #ffe6f4",
  },
}));
