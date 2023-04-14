const getCodeButton = document.getElementById("getCode");
const resultElement = document.getElementById("result");
const authURLElement = document.getElementById("authURL");

const getAuthURL =
  "https://ekxzyis4x6.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url";

getCodeButton.onclick = () => {
  fetch(getAuthURL)
    .then((response) => response.json())
    .then((data) => {
      const result = JSON.stringify(data);
      const { authUrl } = JSON.parse(result);
      resultElement.innerText = result;
      authURLElement.href = authUrl;
    })
    .catch((err) => console.log(err));
};

const codeInput = document.getElementById("code");
const getTokenButton = document.getElementById("getToken");
const accessTokenElement = document.getElementById("accessToken");
const getTokenBaseEndpoint =
  "https://ekxzyis4x6.execute-api.eu-central-1.amazonaws.com/dev/api/token/";

getTokenButton.onclick = () => {
  let code = codeInput.value;

  // if auth code not URI encoded, encode it
  if (decodeURIComponent(code) === code) {
    code = encodeURIComponent(codeInput.value);
  }
  const getTokenEndpoint = getTokenBaseEndpoint + code;

  fetch(getTokenEndpoint)
    .then((response) => response.json())
    .then((data) => (accessTokenElement.innerText = JSON.stringify(data)))
    .catch((err) => console.log(err));
};

const getEventsButton = document.getElementById("getEvents");
const eventsElement = document.getElementById("events");

const getEventsBaseEndpoint =
  "https://ekxzyis4x6.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/";

getEventsButton.onclick = () => {
  const { access_token } = JSON.parse(accessTokenElement.innerText);
  const getEventsEndpoint = getEventsBaseEndpoint + access_token;
  console.log(access_token);
  console.log(getEventsEndpoint);
  fetch(getEventsEndpoint)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      eventsElement.innerText = JSON.stringify(data, null, 2);
    })
    .catch((err) => console.error(err));
};
