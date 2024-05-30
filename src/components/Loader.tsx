import { Skeleton, Stack } from "@mui/material";

function SmallLoader() {
  return <Skeleton height={32} />;
}

function MediumLoader() {
  return (
    <Stack direction="column" spacing={3}>
      <Skeleton height={"5vh"} />
      <Skeleton height={"5vh"} />
      <Skeleton height={"5vh"} />
    </Stack>
  );
}

function LargeLoader() {
  return (
    <Stack direction="column" spacing={3}>
      <Skeleton height={"8vh"} />
      <Skeleton height={"8vh"} />
      <Skeleton height={"8vh"} />
      <Skeleton height={"8vh"} />
      <Skeleton height={"8vh"} />
      <Skeleton height={"8vh"} />
      <Skeleton height={"8vh"} />
      <Skeleton height={"8vh"} />
      <Skeleton height={"8vh"} />
    </Stack>
  );
}

type LoaderProps = {
  size?: "small" | "medium" | "large";
};

function Loader({ size = "small" }: LoaderProps) {
  switch (size) {
    case "small":
      return <SmallLoader />;
    case "medium":
      return <MediumLoader />;
    default:
      return <LargeLoader />;
  }
}
Loader.displayName = "Loader";

export default Loader;
