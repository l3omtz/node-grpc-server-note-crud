import client from './client.js';

client.get({id: 2}, (error, response) => {
    if (!error) {
        console.log('successfully fetch notes')
        console.log(response)
    } else {
        console.error(error)
    }
});