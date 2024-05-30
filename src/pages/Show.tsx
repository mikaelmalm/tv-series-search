import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { Season, Show as ShowType } from "../types";
import NotFoundView from "./NotFound";
import { Box, Container, Grid } from "@mui/material";
import { getImageUrl, stripHtmlTags } from "../utils/helpers";
import { Bold, Heading, Text } from "../components/Typography";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import InfoCard from "../components/InfoCard";

function ShowView() {
  const { id } = useParams();

  const showQuery = useQuery<ShowType>({
    queryKey: ["show", id],
    queryFn: async () =>
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then((res) => res.json())
        .catch((error) => {
          throw new Error(error);
        }),
  });

  const seasonsQuery = useQuery<Season[]>({
    queryKey: ["show", id, "seasons"],
    queryFn: async () =>
      fetch(`https://api.tvmaze.com/shows/${id}/seasons`).then((res) =>
        res.json()
      ),
  });

  if (showQuery.data?.status === 404 || showQuery.isError) {
    return <NotFoundView />;
  }

  if (showQuery.isLoading)
    return (
      <Container>
        <Loader size="large" />
      </Container>
    );

  const { data } = showQuery;

  const imageUrl = getImageUrl(data?.image?.original, data?.name);

  return (
    <Container>
      <Box my={3}>
        <BackButton />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <InfoCard
            title={data?.name || ""}
            description={`Status: ${data?.status || ""}`}
            image={imageUrl}
            rating={data?.rating?.average}
            hasAction={false}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Heading>Summary</Heading>
          <Box mt={2} mb={3}>
            <Text>{stripHtmlTags(data?.summary || "")}</Text>
          </Box>

          {data?.language ? (
            <Text>
              <Bold>Language:</Bold> {data?.language}
            </Text>
          ) : null}

          {data?.genres && data?.genres.length > 0 ? (
            <Text>
              <Bold>Genres:</Bold> {data?.genres.join(", ")}
            </Text>
          ) : null}
        </Grid>
      </Grid>

      {seasonsQuery.data?.length && seasonsQuery.data?.length > 0 ? (
        <Box my={5}>
          <Box mb={1}>
            <Heading>Seasons</Heading>
          </Box>

          <Grid container spacing={3}>
            {seasonsQuery.data.map((item) => {
              const title = item.name ? item.name : `Season ${item.number}`;
              const image = getImageUrl(item.image?.original, title);

              return (
                <Grid key={item.id} item xs={12} sm={6} md={3}>
                  <InfoCard
                    title={title}
                    description={item.summary || ""}
                    image={image}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : null}
    </Container>
  );
}

ShowView.displayName = "ShowView";

export default ShowView;
