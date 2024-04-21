import ballerina/http;

service /payments on new http:Listener(8080) {
    
    isolated resource function post .(@http:Payload Payment payment) returns string|error? {
        return addPayment(payment);
    }

    isolated resource function put .(@http:Payload Payment payment) returns int|error? {
        return executePayment(payment);
    }

    isolated resource function get [string id]() returns Payment|http:NotFound|error? {
        return getPayment(id);
    }

    isolated resource function get .() returns Payment[]|error? {
        return getAllPayments();
    }

    isolated resource function post updateStatus(@http:Payload PaymentStatus paymentStatus) returns int|error? { 
        return alterStatusPayment(paymentStatus);
    }

}