import React from 'react';
import superagent from 'superagent';
import axios from 'axios';

export default class TestSendingAPi extends React.Component {
  render() {
    let pastSection = null;

    if (this.state && this.state.pastRequests) {
      pastSection = (
        <div>
          {this.state.pastRequests.map((item, index) => (
            <div key={JSON.stringify(item)}>
              <p>request {index + 1}</p>
              <pre>{JSON.stringify(item)}</pre>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <h1>Send some API requests to test your Moesif Integration</h1>
        <h2>Please edit app/index.html to add your moesif application id</h2>
        <h2>
          Click button below to send some example requests, and you should see
          the data captured in your Moesif account
        </h2>
        <button
          type="button"
          style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
          }}
          onClick={() => {
            const count =
              this.state && this.state.pastRequests
                ? this.state.pastRequests.length + 1
                : 1;
            superagent
              .get(`https://jsonplaceholder.typicode.com/todos/${count}`)
              .then(response => response.body)
              .then(json => {
                this.setState(
                  prevState =>
                    prevState && prevState.pastRequests
                      ? { pastRequests: [...prevState.pastRequests, json] }
                      : { pastRequests: [json] },
                );
              })
              .catch(err => {
                this.setState(
                  prevState =>
                    prevState && prevState.pastRequests
                      ? { pastRequests: [...prevState.pastRequests, err] }
                      : { pastRequests: [err] },
                );
              });
          }}
        >
          Click to send an API request using SuperAgent to JSONPlaceHolder (/todos)
        </button>
        <button
          type="button"
          style={{
            backgroundColor: '#FFAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
          }}
          onClick={() => {
            const count =
              this.state && this.state.pastRequests
                ? this.state.pastRequests.length + 1
                : 1;
            axios
              .get(`https://jsonplaceholder.typicode.com/posts/${count}`)
              .then(response => response.data)
              .then(json => {
                this.setState(
                  prevState =>
                    prevState && prevState.pastRequests
                      ? { pastRequests: [...prevState.pastRequests, json] }
                      : { pastRequests: [json] },
                );
              })
              .catch(err => {
                this.setState(
                  prevState =>
                    prevState && prevState.pastRequests
                      ? { pastRequests: [...prevState.pastRequests, err] }
                      : { pastRequests: [err] },
                );
              });
          }}
        >
          Click to send an API request using axios to JSONPlaceHolder (/posts)
        </button>

        <button
          type="button"
          style={{
            backgroundColor: '#BBAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
          }}
          onClick={() => {
            const count =
              this.state && this.state.pastRequests
                ? this.state.pastRequests.length + 1
                : 1;
            fetch(`https://jsonplaceholder.typicode.com/albums/${count}`, {
              headers: { abd: 'asdfasfads', foo: 'bar' },
            })
              .then(response => {
                // console.log('normal usage scenario headers');
                // for (var pair2 of response.headers.entries()) {
                //   console.log(pair2);
                //   // reqHeaders[pair2[0]] = pair2[1];
                // }

                // const secondResponse = response.clone();

                // setTimeout(() => {
                //   console.log('second json data after 10 seconds');
                //   console.log('is body used read?');
                //   console.log(secondResponse.bodyUsed);
                //   secondResponse.json().then((data) => {
                //     console.log(data);
                //   });
                // }, 10000);
                return response.json();
              })
              .then(json => {
                this.setState(
                  prevState =>
                    prevState && prevState.pastRequests
                      ? { pastRequests: [...prevState.pastRequests, json] }
                      : { pastRequests: [json] },
                );
              })
              .catch(err => {
                this.setState(
                  prevState =>
                    prevState && prevState.pastRequests
                      ? { pastRequests: [...prevState.pastRequests, err] }
                      : { pastRequests: [err] },
                );
              });
          }}
        >
          Click to send an API request to JSONPlaceHolder (/albums) using fetch.
        </button>
        {pastSection}
        <br />
      </div>
    );
  }
}
