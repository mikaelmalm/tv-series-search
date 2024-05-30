import { Link } from "react-router-dom";
import { Subtitle, Title } from "./Typography";
import { Box, Container } from "@mui/material";

function Header() {
  return (
    <Container>
      <Box textAlign="center" my={8}>
        <Link to="/">
          <Title>Show Finder</Title>
          <Subtitle>Find your next show to bingewatch</Subtitle>
        </Link>
      </Box>
    </Container>
  );
}
Header.displayName = "Header";

export default Header;
