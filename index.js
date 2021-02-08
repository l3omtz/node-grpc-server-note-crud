const grpc = require('grpc');
// Use grpc load method
const notesProto = grpc.load('notes.proto');
// Instantiate grpc server
const server = new grpc.Server();

// Bind it our localhost with port 50051 and pass server credential insecure 
server.bind('127.0.0.1:50051',
grpc.ServerCredentials.createInsecure());

console.log('Server running at http://127.0.0.1:50051');

// Invoke the start method of the server to start out gRPC server.  
server.start();
