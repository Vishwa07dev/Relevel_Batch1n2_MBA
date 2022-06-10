/**
 * Logic to make a POST call to the Notification Service
 */
const Client = require("node-rest-client").Client;

const client  = new Client(); 

exports.client = client;

exports.sendEmail = (subject, emailId, paymentId, content, requestor) => {

    /**
     *! POST call
     *! 
     *!      - URI: 127.0.0.1:4001/notifyService/api/v1/notifications
     *!      - HTTP Verb: POST
     *!      - Request Body
     *!      - Headers
     */

    //? Request body
    const reqBody = {
        subject: subject,
        recipientEmail: emailId,
        paymentId: paymentId,
        content: content,
        requestor: requestor
    }
    
    const headers = {
        "Content-Type": "application/json"
    }

    const args = {
        data: reqBody,
        headers: headers
    }

   client.post("http://127.0.0.1:4001/notifServ/api/v1/notifications", args, (data, response) => {
        console.log("Email sent");
        console.log(data);
    }); 

}


