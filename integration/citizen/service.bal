import ballerina/http;

service /citizens on new http:Listener(8080) {
    
    isolated resource function post .(@http:Payload Citizen citizen) returns Citizen|http:NotFound|error? {
        return addCitizen(citizen);
    }

    isolated resource function put .(@http:Payload Citizen citizen) returns Citizen|http:NotFound|error? {
        return updateCitizen(citizen);
    }

    isolated resource function delete [int id]() returns Message|error? {
        return removeCitizen(id);       
    }

    isolated resource function get [int id]() returns Citizen|http:NotFound|error? {
        return getCitizen(id);
    }

    isolated resource function get .() returns Citizen[]|error? {
        return getAllCitizens();
    }

    isolated resource function get search(int? id, string? name, string? profile, 
                                           string? country, string? documentNumber, 
                                           string? address, boolean? active) returns Citizen[]|error? {
        return getFilterCitizen(id, name, profile, country, documentNumber, address, active);
    }

    isolated resource function put disable(int id) returns Citizen|http:NotFound|error? {
        return alterStatusCitizen(id, false);
    }

    isolated resource function put enable(int id) returns Citizen|http:NotFound|error? {
        return alterStatusCitizen(id, true);
    }

}