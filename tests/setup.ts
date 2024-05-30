import { expect, afterEach, afterAll, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { lostQuery, lostSeasons, shows } from "./mocks";

expect.extend(matchers);

const restHandlers = [
  http.get("https://api.tvmaze.com/search/shows", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    switch (query?.toLowerCase()) {
      case "lost": {
        return HttpResponse.json(lostQuery);
      }

      case "randomshow": {
        return HttpResponse.json([]);
      }

      default: {
        return HttpResponse.json(shows);
      }
    }
  }),

  http.get("https://api.tvmaze.com/shows/123", () => {
    return HttpResponse.json(lostQuery[0].show);
  }),

  http.get("https://api.tvmaze.com/shows/123/seasons", () => {
    return HttpResponse.json(lostSeasons);
  }),

  http.get("https://api.tvmaze.com/shows", () => {
    return HttpResponse.json(shows);
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});
