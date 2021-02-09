const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './notes.proto';
let newNote = {
    title: "New Note",
    content: "New Note content"
}

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const notes_proto = grpc.loadPackageDefinition(packageDefinition).notes;

function main() {
    var client = new notes_proto.NotesService('localhost:50051', grpc.credentials.createInsecure());

    client.list({}, (error, response) => {
        if (!error) {
            console.log('successfully fetch List notes')
            console.log(response)
        } else {
            console.error(error)
        }
    });

    client.insert(newNote, (error, response) => {
        if (!error) {
            console.log('New Note created successfully', response)
         } else {
            console.error(error)
         }
    });

    client.deleteNote({ id: '1' }, (error, response) => {
        if (!error) {
            console.log('Note Has been successfully deleted: ', response)
        } else {
            console.error(error)
        }
    })

}

main();