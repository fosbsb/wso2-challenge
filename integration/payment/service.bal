import ballerina/http;

service /payments on new http:Listener(8080) {
    
    isolated resource function post .(@http:Payload Payment payment) returns Payment|http:NotFound|error? {
        return addPayment(payment);
    }

    isolated resource function put .(@http:Payload PaymentExecute payment) returns Payment|http:NotFound|error {
        return executePayment(payment);
    }

    isolated resource function get [int id]() returns Payment|http:NotFound|error? {
        return getPayment(id);
    }

    isolated resource function get uuid/[string uuid]() returns Payment|http:NotFound|error? {
        return getPaymentByUUID(uuid);
    }

    isolated resource function get .() returns Payment[]|error? {
        return getAllPayments();
    }

    isolated resource function post updateStatus(@http:Payload PaymentStatus paymentStatus) returns Payment|http:NotFound|error { 
        return alterStatusPayment(paymentStatus);
    }

}