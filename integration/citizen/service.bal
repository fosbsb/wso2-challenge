import ballerina/http;

service /immigrant on new http:Listener(8080) {
    
    isolated resource function get citizen/[int id]() returns Citizen|http:NotFound|error? {
        return getCitizen(id);
    }

    isolated resource function get citizen() returns Citizen[]|error? {
        return getAllCitizens();
    }

    isolated resource function get citizen/search(int? id, string? name, string? email, string? profile, 
                                           string? country, string? documentNumber, 
                                           string? address, boolean? active) returns Citizen[]|error? {
        return getFilterCitizen(id, name, email, profile, country, documentNumber, address, active);
    }

    isolated resource function post citizen(@http:Payload Citizen citizen) returns Citizen|http:NotFound|error? {
        return addCitizen(citizen);
    }

    isolated resource function put citizen(@http:Payload Citizen citizen) returns Citizen|http:NotFound|error? {
        return updateCitizen(citizen);
    }
    
    isolated resource function put citizen/disable(int id) returns Citizen|http:NotFound|error? {
        return alterStatusCitizen(id, false);
    }

    isolated resource function put citizen/enable(int id) returns Citizen|http:NotFound|error? {
        return alterStatusCitizen(id, true);
    }

    isolated resource function delete citizen/[int id]() returns Message|error? {
        return removeCitizen(id);       
    }
    //Resources Payments
    isolated resource function post payment(@http:Payload Payment payment) returns Payment|http:NotFound|error? {
        return addPayment(payment);
    }

    isolated resource function put payment(@http:Payload PaymentExecute payment) returns Payment|http:NotFound|error {
        return executePayment(payment);
    }

    isolated resource function put payment/status(@http:Payload PaymentStatus paymentStatus) returns Payment|http:NotFound|error { 
        return alterStatusPayment(paymentStatus);
    }

    isolated resource function get payment/[int id]() returns Payment|http:NotFound|error? {
        return getPayment(id);
    }

    isolated resource function get payment/uuid/[string uuid]() returns Payment|http:NotFound|error? {
        return getPaymentByUUID(uuid);
    }

    isolated resource function get payment() returns Payment[]|error? {
        return getAllPayments();
    }

    isolated resource function get payment/citizen/[int id]() returns Payment[]|error? {
        return getAllPaymentsByCitizen(id);
    }

}