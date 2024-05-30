import { ArrowBack } from "@mui/icons-material";
import { Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)`
  color: inherit;
  border-radius: 0px;
  padding-left: 0px;

  span,
  svg {
    transition: all 0.3s;
  }

  &:hover,
  &:focus-visible {
    background-color: transparent;

    span {
      color: ${({ theme }) => theme.palette.grey[600]};
    }

    svg {
      fill: ${({ theme }) => theme.palette.grey[600]};
    }
  }

  &:focus-visible {
    outline: auto;
  }
`;

function BackButton() {
  const navigate = useNavigate();

  return (
    <StyledButton onClick={() => navigate(-1)} focusRipple={false}>
      <ArrowBack />
      <Typography variant="button" ml={1}>
        Go Back
      </Typography>
    </StyledButton>
  );
}
BackButton.displayName = "BackButton";

export default BackButton;
