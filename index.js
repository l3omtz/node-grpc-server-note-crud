const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './notes.proto';

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
    // Bind it our localhost with port 50051 and pass server credential insecure 
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('gRPC is serving....');
        // Invoke the start method of the server to start out gRPC server.  
        server.start();
    });
}
main();