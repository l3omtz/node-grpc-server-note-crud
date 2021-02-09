import client from './client.js';

client.list({}, (error, response) => {
    if (!error) {
        console.log('successfully fetch List notes')
        console.log(response)
    } else {
        console.error(error)
    }
});