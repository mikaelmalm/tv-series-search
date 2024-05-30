import { Box, Button, Container } from "@mui/material";
import { Subtitle, Text } from "../components/Typography";

function NotFoundView() {
  return (
    <Container>
      <Box my={5}>
        <Subtitle>Not Found</Subtitle>

        <Box my={3}>
          <Text>
            Unfortunately, the page you are looking for does not exist.
          </Text>
        </Box>

        <Button variant="contained" color="primary" href="/">
          Go back to the start page
        </Button>
      </Box>
    </Container>
  );
}
NotFoundView.displayName = "NotFoundView";

export default NotFoundView;
