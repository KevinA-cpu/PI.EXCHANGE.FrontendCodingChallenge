# PI.EXCHANGE.FrontendCodingChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Create an environment file `src/environments/environment.development.ts` with the following content base on the `src/environments/environment.ts` file:

```typescript
production: false,
GIPHY_API_KEY='YOUR_GIPHY_API_KEY',
GIPHY_API_VERSION='YOUR_GIPHY_API_VERSION',
GIPHY_API_URL='YOUR_GIPHY_API_URL',
```

Run `npm install` before `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Or you can see the live demo [here](https://pi-exchange-frontend-coding-challenge.netlify.app/).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
