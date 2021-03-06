import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader';
const PROTO_PATH = '../notes.proto';
import { list, insert, deleteNote, get, update } from './handlers.js';

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


const main = () => {
    // Instantiate grpc server
    const server = new grpc.Server();

    // Invoke addService method and pass NoteService service as first param
    // and function handler that will be invoked when the client calls the List method as the second param
    server.addService(notes_proto.NotesService.service, { list, insert, deleteNote, get, update });

    // Bind it our localhost with port 50051 and pass server credential insecure 
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC is serving....');
        // Invoke the start method of the server to start out gRPC server.  
        server.start();
    });
}

main();