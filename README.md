## Project title

Random Profiles

## Tech/library used

This project was built by using [Create React App](https://create-react-app.dev/).

## Installation

Install the node modules with `npm install`  

## Available Scripts

In the project directory, you can run:

### `npm start` 

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test` 

Launches the test runner in the interactive watch mode.<br>
See the section about [tests](https://create-react-app.dev/docs/running-tests)  for more information.

### `npm run build`

Builds the app for the production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [creating a production build](https://create-react-app.dev/docs/production-build/) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.<br>

See the section about [npm run eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject) for more information.<br>

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
    mocks/
    styles/
    tests/
    utils/
    App.css
    App.js
    index.css
    index.js
```
For the project to build, **these files must exist with the exact filenames**:
* `public/index.html` is the page template;
* `src/index.js` is the Javascript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src` . For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won't see them.

You can however, create more top level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Browser Tests

This project is tested in Google Chrome, Safari and Mozilla Firefox Browsers.

## Unit Tests

For the unit tests, [Jest](https://jestjs.io/) is used as a Javascript testing framework. Also [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is used to test React components.

## How to use?

After you start the project in localhost, you will see a list of 20 random profiles.
Details are hidden by default. Use the button to show/hide profile details.
You can delete the profiles, load more profiles (1 more profile on each click) or renew profiles (20 new random profiles) with respective buttons.

## Made by

[Irem Peker](https://github.com/IremPeker)


