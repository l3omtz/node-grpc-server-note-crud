import client from './client.js';
import prompt from 'prompt';

prompt.start();
prompt.get(['noteId'], function (err, result) {
    if (err) console.log('bad input')

    client.get({id:  result.noteId}, (error, response) => {
        !error ? console.log(response) : console.error(error)
    });

});
