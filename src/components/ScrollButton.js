import { styled } from "@mui/material";

const Button = styled("button")({
  padding: 4,
});

const ScrollButton = ({ onClick, right, isShow }) => {
  return (
    <Button onClick={onClick} style={{ opacity: isShow ? "unset" : 0 }}>
      {right ? '>' : '<'}
    </Button>
  );
};

export default ScrollButton;
