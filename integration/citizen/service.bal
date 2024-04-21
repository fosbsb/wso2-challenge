import ballerina/http;

service /citizens on new http:Listener(8080) {
    
    isolated resource function post .(@http:Payload Citizen citizen) returns int|error? {
        return addCitizen(citizen);
    }

    isolated resource function put .(@http:Payload Citizen citizen) returns int|error? {
        return updateCitizen(citizen);
    }

    isolated resource function delete [int id]() returns int|error? {
        return removeCitizen(id);       
    }

    isolated resource function get [int id]() returns Citizen|http:NotFound|error? {
        return getCitizen(id);
    }

    isolated resource function get .() returns Citizen[]|error? {
        return getAllCitizens();
    }

    isolated resource function get search(int? id, string? name, string? profile, 
                                           string? country, string? documentNumber, boolean? active) returns Citizen[]|error? {
        return getFilterCitizen(id, name, profile, country, documentNumber, active);
    }

}