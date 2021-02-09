import client from './client.js';

client.deleteNote({ id: '1' }, (error, response) => {
    if (!error) {
        console.log('Note Has been successfully deleted')
    } else {
        console.error(error)
    }
})