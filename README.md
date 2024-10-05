# NBA SEARCH


## General
The search app is built using `Vite`, `react`, `Tailwind` for styling, `axios` , `react query` for fetching data.


## Running the app
To get started with the project, follow these steps:

- Run `npm i` at root folder
- Post installation run `npm run dev` script

## App structure

 - Pages folder - currently only one page -  the search and favorite page
 - Features folder - hold players component and sub components in addition hold the Favorite comp.
 - Core folder:
   - api - hold axios client setting
   - hooks there are several core hooks - debounce, infinite scroll and the fetch hook
   - types