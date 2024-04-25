import ballerina/http;

service /factory on new http:Listener(8080) {
    
    isolated resource function get .() returns Factory[]|error? {
        return getAllFactory();
    }

    isolated resource function get [int id]() returns Factory|http:NotFound|error? {
        return getFactoryById(id);
    }

    isolated resource function get authorization/[string authorizationCode]() returns Factory|http:NotFound|error? {
        return getFactory(authorizationCode);
    }

    isolated resource function post .(@http:Payload Factory factory) returns Factory|http:NotFound|error? {
        return addFactory(factory);
    }
}