# connect-api

This connect-api sends a message on my personal email.<br />
API public URL -> https://aharadkou-connect-api.netlify.app<br />
Documentation:
* **PATH:**
   /
* **Method:**
  `POST`
  
* **Headers:**

   * **token:** required <br /><br />
  token is base64url encoded shortened link from QR-code that you've used to enter this page.<br />
  **Important note** - shortened link should be encoded without protocol, for example: `token = base64url('shortened.url/123')`
* **Request body:**

  *  `{ "message" : "0J_RgNC40LLQtW4" }`  **required**<br/><br />
  **Important note** - message should be base64url encoded.<br />
  **Please include your contact information(telegram, etc.) in the message, that's only way I can reach you.**

* **Success Response:**
  * **Code:** 200 <br />
  Message has been sent successfully
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
  `token` is invalid or doesn't provided. If you face this error check that token is properly encoded using base64url([rfc4648 standard](https://datatracker.ietf.org/doc/html/rfc4648))<br />
  * **Code:** 400 BAD REQUEST <br />
  Http method is wrong or `message` is missing<br />



