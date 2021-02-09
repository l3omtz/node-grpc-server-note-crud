import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader';
const PROTO_PATH = '../notes.proto';
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
const client = new notes_proto.NotesService('localhost:50051', grpc.credentials.createInsecure());
export default client;
