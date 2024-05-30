import { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Search from "../components/Search";
import Loader from "../components/Loader";
import InfoCard from "../components/InfoCard";
import { Text } from "../components/Typography";

import type { Show, TVMazeShowSearchResult } from "../types";
import { getImageUrl } from "../utils/helpers";
import useDebounce from "../hooks/useDebounce";

const PAGE_SIZE = 8;

type ListViewProps = {
  noShowsFound: boolean;
  loading: boolean;
  shows: Show[];
};

function ListView({ noShowsFound, loading, shows }: ListViewProps) {
  if (loading) return <Loader size="medium" />;

  return noShowsFound ? (
    <Text>No shows found</Text>
  ) : (
    <Grid container spacing={3}>
      {shows.map((item) => {
        const title = item.name;
        const image = getImageUrl(item.image?.original, title);
        const rating = "rating" in item ? item?.rating?.average : null;

        return (
          <Grid key={item.id} item xs={12} sm={6} md={3}>
            <Link to={`${item.id}`}>
              <InfoCard
                hasAction
                title={title}
                description={item.summary || ""}
                image={image}
                rating={rating}
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("q") || "";
  const queryValue = useDebounce(searchValue);
  const currentPage = Number(searchParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const initialShowsQuery = useQuery<Show[]>({
    queryKey: ["shows"],
    enabled: !searchValue,
    queryFn: async () =>
      fetch(`https://api.tvmaze.com/shows`).then((res) => res.json()),
  });

  const searchQuery = useQuery<TVMazeShowSearchResult[]>({
    queryKey: ["search", queryValue],
    queryFn: async () =>
      fetch(`https://api.tvmaze.com/search/shows?q=${queryValue}`).then((res) =>
        res.json()
      ),
  });

  const allShows = queryValue
    ? searchQuery.data?.map((item) => item.show)
    : initialShowsQuery.data;
  const pages = allShows?.length ? Math.ceil(allShows.length / PAGE_SIZE) : 0;
  const shows = allShows?.slice(startIndex, PAGE_SIZE + startIndex) || [];

  const isLoading = searchQuery.isLoading || initialShowsQuery.isLoading;

  const noShowsFound =
    !isLoading && !shows?.length && searchValue === queryValue;

  /**
   * Reset page to 1 when page is greater than 1 and no shows are found.
   *
   * This covers a bug where the user could do a browser back to land on a page (lets say 3)
   * on a query that returns no results.
   *
   */
  useEffect(() => {
    if (noShowsFound && currentPage > 1) {
      setSearchParams((params) => {
        params.set("page", "1");
        return params;
      });
    }
  }, [currentPage, noShowsFound]);

  /**
   * Reset page to 1 when search query changes.
   */
  useEffect(() => {
    setSearchParams((params) => {
      params.delete("page");
      return params;
    });
  }, [searchQuery.data]);

  function handleSearch(value: string) {
    setSearchParams((params) => {
      params.set("q", value);
      return params;
    });
  }

  function handleClear() {
    setSearchParams((params) => {
      params.set("q", "");
      return params;
    });
  }

  function handlePageChange(page: number) {
    setSearchParams((params) => {
      params.set("page", `${page}`);
      return params;
    });
  }

  if (initialShowsQuery.isLoading) {
    return (
      <Container>
        <Loader size="large" />
      </Container>
    );
  }
  return (
    <Container>
      <Box mb={5}>
        <Search
          value={searchValue}
          onChange={handleSearch}
          onClear={handleClear}
        />
      </Box>

      <ListView loading={isLoading} noShowsFound={noShowsFound} shows={shows} />

      {allShows?.length && allShows.length > PAGE_SIZE ? (
        <Stack my={5} alignItems="center">
          <Pagination
            siblingCount={isSmallScreen ? 0 : 2}
            count={pages}
            page={parseInt(`${currentPage}`)}
            onChange={(_, page) => handlePageChange(page)}
          />
        </Stack>
      ) : null}
    </Container>
  );
}
Home.displayName = "Home";

export default Home;
