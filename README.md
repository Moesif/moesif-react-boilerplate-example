
# Example Moesif Integration for React Boilerplate

[React Boilerplate](https://github.com/react-boilerplate/react-boilerplate) is a popular template for getting started quickly with a new
single page app (SPA), it supports a lot of features.

[Moesif](https://www.moesif.com) is an API analytics platform. [Moesif-browser-js](https://github.com/Moesif/moesif-browser-js) is a SDK that
allows you to capture all the API calls make by your Single Page App from inside the browser, and send to Moesif for analysis and tracking.

This is an example with Moesif integrated.

## Steps to create this example

You can follow these steps to add Moesif into your app based on react-boilerplate.

- Followed React Boilerplate's setup instructions to clone the repo and set up the repo.
  - `git clone --depth=1 https://github.com/react-boilerplate/react-boilerplate.git react-boilerplate-moesif-example`
  - `npm run setup`
- Edit `app/index.html` file to add Moesif between the `head` tags.
  ```html
  <script src="//unpkg.com/moesif-browser-js@1.3.0/moesif.min.js"></script>

  <script type="text/javascript">
    var options = {
      applicationId: 'Your Moesif application id'
      // add other option here.
    };

    // for options see below.
    moesif.init(options);

    // this starts the capturing of the data.
    moesif.start();
  </script>

  ```
  Of course, please obtain your Moesif Application Id from your Moesif account.
  That is it.

- Add a simple test component to verify API calls are captured. (Optional step)
  - Added `app/Containers/App/testSendingApi.js`
  - Since this tester tests with both superagent and axios to sending APIs. `npm install -S superagent axios`.
  - imported `testingSendingApi.js` component and added to `app/Containers/App/index.js` and removed Header and Footer components.
  ```javascript
  import TestSendingApi from './testSendingApi';

  // inside render method:
  return (
   <TestSendingApi />
  );
  //
  ```


## Run this example

- Same as instructed in react-boilerplate. `npm run start`
- Click on the button to sent few example Api requests from the browser. It sends to 'jsonplaceholder', a mock API server.
- Log into your Moesif account and check that data is captured.

## Notes on Server Side Rendering

Often react is setup with server side rendering, including this boilerplate can be configured to do server side rendering. Just
be aware if you setup server side rendering, `moesif-browser-js` will not initiate correctly if started on the server side.
Usually for server side rendering setup, you have to initiate inside a `componentDidMount` life cycle method to ensure that the
code is run on the client side.

Assuming you do not use server side rendering, another option is to add Moesif to the entry point for client side: `app/app.js`.

```javascript
// Option 2 for moesif, add to the entry point for client side code.

import moesif from 'moesif-browser-js';
const options = {
  applicationId:
    'your application id here',
  // add other option here.
};

// if you set up server side rendering, you must do the following two method inside a componentDidMount lifecyle method.
// probably in the top most react component.
moesif.init(options);
// this starts the capturing of the data.
moesif.start();
```

## Note on [create-react-app](https://github.com/facebook/create-react-app)

If you are using Facebook's `create-react-app` tool to setup your initial boilerplate code
for a react app.

For simple setup/integration with Moesif, The best place to initiate Moesif is inside.
`/public/index.html`, which is the same as `app/index.html` of react boilerplate in this repo.
