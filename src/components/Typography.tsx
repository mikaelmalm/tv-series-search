import { Box, Typography } from "@mui/material";

export function Title({ children }: { children: React.ReactNode }) {
  return <Typography variant="h1">{children}</Typography>;
}

export function Subtitle({ children }: { children: React.ReactNode }) {
  return <Typography variant="h2">{children}</Typography>;
}

export function Heading({ children }: { children: React.ReactNode }) {
  return <Typography variant="h3">{children}</Typography>;
}

export function Text({ children }: { children: React.ReactNode }) {
  return <Typography variant="body1">{children}</Typography>;
}

export function Bold({ children }: { children: React.ReactNode }) {
  return (
    <Box component="span" sx={{ fontWeight: "bold" }}>
      {children}
    </Box>
  );
}
