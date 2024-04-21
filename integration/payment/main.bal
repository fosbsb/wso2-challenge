import ballerina/http;
import ballerina/uuid;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable string hrEndpoint = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int    PORT = ?;
configurable string DATABASE = ?;

type Payment record {|
    string id;
    float value;
    @sql:Column { name: "type" }
    string paymentType;
    @sql:Column { name: "citizen_id" }
    int citizenId;
    @sql:Column { name: "provider_id" }
    int providerId;
    string? status;
    string? uuid;
    @sql:Column { name: "created_date" }
    string? dateCreated;
    @sql:Column { name: "payment_date" }
    string? paymentDate;
    @sql:Column { name: "authorization_number" }
    string? authorizationNumber;
|};

type PaymentStatus record {|
    string paymentId;
    string status;
|};

final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);

isolated function addPayment(Payment payment) returns string|error {

    string uuid = uuid:createType1AsString();

    sql:ExecutionResult result = check dbClient->execute(`
        INSERT INTO payment (uuid, value, type, 
                             citizen_id, provider_id)
        VALUES (${uuid},${payment.value}, ${payment.paymentType}, 
                ${payment.citizenId}, ${payment.providerId})
        `);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is string {
        return lastInsertId;
    } else {
        return error("Error inserting record.");
    }

}

isolated function getPayment(string id) returns Payment|http:NotFound|error {
    
    Payment|sql:Error result = dbClient->queryRow(`SELECT * FROM payment where id = ${id}`);

    if result is sql:NoRowsError {
        return http:NOT_FOUND;
    } else {
        return result;
    }

}

isolated function getPaymentByUUID(string uuid) returns Payment|http:NotFound|error {
    
    Payment|sql:Error result = dbClient->queryRow(`SELECT * FROM payment where uuid = ${uuid}`);

    if result is sql:NoRowsError {
        return http:NOT_FOUND;
    } else {
        return result;
    }

}

isolated function getAllPayments() returns Payment[]|error {
    
    Payment[] payments = [];
    
    stream<Payment, error?> resultStream = dbClient->query(
        `SELECT * FROM payment order by created_date`
    );
    
    check from Payment payment in resultStream
        do {
            payments.push(payment);
        };
    check resultStream.close();
    
    return payments;
}

isolated function executePayment(Payment payment) returns int|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE payment SET
            status = ${payment.status}, 
            authorization_number = ${payment.authorizationNumber},
            payment_date = CURRENT_TIMESTAMP()
        WHERE id = ${payment.id}
    `);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Error update record.");
    }
}

isolated function alterStatusPayment(PaymentStatus payment) returns int|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE payment SET
            status = ${payment.status} 
        WHERE id = ${payment.paymentId}
    `);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Error update record.");
    }
}
