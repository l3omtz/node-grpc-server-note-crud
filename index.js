const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const uuidv1 = require('uuid')
const PROTO_PATH = './notes.proto';
const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1'},
    { id: '2', title: 'Note 2', content: 'Content 2'}
]
// Load notes proto with options
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

/**
 * @param {*} call 
 * Request from client
 * @param {*} callback
 * function we will invoke to return the response to the client
 */
const list = (call, callback) => {
    callback(null, { notes });
}

const insert = (call, callback) => {
    let note = call.request;
    note.id = uuidv1.v1()
    notes.push(note)
    callback(null, note)
}

const deleteNote = (call, callback) => {
    let existingNoteIndex = notes.findIndex((n) => n.id == call.request.id);
    if (existingNoteIndex != -1) {
        notes.splice(existingNoteIndex, 1)
        callback(null, {})
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    }
}

const main = () => {
    // Instantiate grpc server
    const server = new grpc.Server();

    // Invoke addService method and pass NoteService service as first param
    // and function handler that will be invoked when the client calls the List method as the second param
    server.addService(notes_proto.NotesService.service, { list, insert, deleteNote });

    // Bind it our localhost with port 50051 and pass server credential insecure 
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC is serving....');
        // Invoke the start method of the server to start out gRPC server.  
        server.start();
    });
}

main();