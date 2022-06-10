const Client = require('node-rest-client').Client;

const client = new Client();


exports.sendEmail = (requestId, subject, content, emailIds, requester) => {
    const reqBody = { 
        subject: subject,
        content: content,
        recepientEmails: emailIds,
        requester: requester,
        requestId: requestId
    }
    const headers = {
        "Content-Type": "application/json"
    }
    const args = {
        data: reqBody,
        headers: headers
    }
    client.post("http://127.0.0.1:8080/notifications", args, (data, res) => {
        console.log("Request sent");
        console.log(data);
    })
}