# TV Series Search

## Description

This is a simple web application that allows users to search for TV series and view details about them. The application uses the TVMaze API to fetch TV series data.

## Installation

When developed, the application was build using [Bun](https://bun.sh), however, the following steps is written for node, but it will work for bun as well if that is what you prefer.

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run start ` to start the application in development mode
4. Run `npm run build` to build the application for production
5. Run `npm run preview` to preview the production build

## Tech Stack

- React
- Typescript
- React-query
- MaterialUI
- Vite
- Vitest

## Application Requirements

Not to be confused with system requirements, the application requirements are the features that the application should have, limitations and so on.

- The application be responsive and work on both mobile and desktop
- The application should have at least two views, one for the search and one for the details of the series
- The application should be able to handle slow internet connection and give feedback to the user for any possible errors
- The application should be able to handle direct links to the detailed view
- The application should be working on the latest version of Chrome
- The application should be written using Typescript

## Design decisions

- We name pages/views as `XXXView` to differentiate them from components
- We keep state in the URL to be able to use browser back (and forward), and to be able to share the URL
- When there is no image to be found, we show a placeholder image

## Future improvements

- I would love to have better design, multiple themes that can be set manually but also follow the system theme
- E2E testing with playwright
- More pages, like seasons, episodes, cast, etc. Maybe even combine the tvmaze API with a better image service to present the shows with a full container cover image
- Better error handling
- Load more shows after the user goes to the last page
- Better test coverage regarding the components
- Better skeleton loading, for now it is just a common one for all components
