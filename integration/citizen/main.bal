import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable string hrEndpoint = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int    PORT = ?;
configurable string DATABASE = ?;

type Citizen record {|
    readonly int? id;
    string name;
    string email;
    string phone;
    string country;
    @sql:Column { name: "document_number" }
    string documentNumber;
    string profile;
    boolean active;
    string? cep;
    string? address;
    @sql:Column { name: "created_date" }
    string? dateCreated;
|};

type Payment record {|
    readonly int id;
    float amount;
    @sql:Column { name: "payment_type" }
    string paymentType;
    @sql:Column { name: "citizen_id" }
    int citizenId;
    @sql:Column { name: "provider_id" }
    int providerId;
    string? status;
    @sql:Column { name: "uuid_code" }
    string? uuidCode;
    @sql:Column { name: "created_date" }
    string? dateCreated?;
    @sql:Column { name: "payment_date" }
    string? paymentDate?;
    @sql:Column { name: "authorization_number" }
    string? authorizationNumber;
    @sql:Column { name: "send_notification_date" }
    string? notificationDate?;
|};

type PaymentStatus record {|
    int paymentId;
    string status;
|};

type PaymentExecute record {| 
    int id;
    string authorizationNumber;
    string status;
|};

type Message record {|
    string typeMessage;
    string status;
|};

final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);

isolated function addCitizen(Citizen citizen) returns Citizen|http:NotFound|error {

    sql:ExecutionResult result = check dbClient->execute(`
        INSERT INTO citizen (name, email, phone, 
                             country, document_number,
                             profile, cep, address)
        VALUES (${citizen.name}, ${citizen.email}, ${citizen.phone},  
                ${citizen.country}, ${citizen.documentNumber}, 
                ${citizen.profile}, ${citizen.cep}, ${citizen.address})
        `);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is int {
        return getCitizen(lastInsertId);
    } else {
        return error("Error inserting record.");
    }

}

isolated function getCitizen(int id) returns Citizen|http:NotFound|error {
    
    Citizen|sql:Error result = dbClient->queryRow(`SELECT * FROM citizen where id = ${id}`);

    if result is sql:NoRowsError {
        return http:NOT_FOUND;
    } else {
        return result;
    }

}

isolated function getAllCitizens() returns Citizen[]|error {
    
    Citizen[] citizens = [];
    
    stream<Citizen, error?> resultStream = dbClient->query(
        `SELECT * FROM citizen order by name`
    );
    
    check from Citizen citizen in resultStream
        do {
            citizens.push(citizen);
        };
    check resultStream.close();
    
    return citizens;
}

isolated function updateCitizen(Citizen citizen) returns Citizen|http:NotFound|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE citizen SET
            name = ${citizen.name}, 
            email = ${citizen.email},
            phone = ${citizen.phone},
            country = ${citizen.country},
            document_number = ${citizen.documentNumber},
            cep = ${citizen.cep},
            address = ${citizen.address} 
        WHERE id = ${citizen.id}
    `);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is int {
         return getCitizen(lastInsertId);
    } else {
        return error("Error update record.");
    }

}

isolated function alterStatusCitizen(int id, boolean status) returns Citizen|http:NotFound|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE citizen SET active = ${status} WHERE id = ${id}
    `);

    int? affectedRowCount = result.affectedRowCount;
    
    if affectedRowCount is int {
        return getCitizen(id);
    } else {
        return error("Error update record.");
    }
}

isolated function removeCitizen(int id) returns Message|error {
    sql:ExecutionResult result = check dbClient->execute(`
        DELETE FROM citizen WHERE id = ${id}
    `);
    
    int? affectedRowCount = result.affectedRowCount;

    Message message;

    if affectedRowCount is int {
        if (affectedRowCount > 0) {
            message = { 
                typeMessage: "success",
                status: "record removed successfully."
            };
        } else {
            message = {
                typeMessage: "info",
                status: "not record removed."
            };
        }

        return message;
    } else {
        return error("Error remove record.");
    }
}

isolated function getFilterCitizen(int? id, string? name, string? email, string? profile, string? country, 
                                   string? documentNumber, string? address, boolean? active, boolean all) returns Citizen[]|error {
    sql:ParameterizedQuery query;                       

    if (all) {
        query = `SELECT * FROM citizen WHERE id > 0 `;
    } else {
        query = `SELECT * FROM citizen WHERE profile <> 'ADMIN' `;
    }

    if (id != null) {
        sql:ParameterizedQuery filter = ` AND id = ${id}`;
        query = sql:queryConcat(query,filter);
    }

    if (name != null) {
        string nameLike = "%" + name + "%";
        sql:ParameterizedQuery filter = ` AND name like ${nameLike}`;
        query = sql:queryConcat(query,filter);
    }

    if (email != null) {
        sql:ParameterizedQuery filter = ` AND email = ${email}`;
        query = sql:queryConcat(query,filter);
    }

    if (profile != null) {
        sql:ParameterizedQuery filter = ` AND profile = ${profile}`;
        query = sql:queryConcat(query,filter);
    }

    if (country != null) {
        sql:ParameterizedQuery filter = ` AND country = ${country}`;
        query = sql:queryConcat(query,filter);
    }

    if (documentNumber != null) {
        sql:ParameterizedQuery filter = ` AND document_number = ${documentNumber}`;
        query = sql:queryConcat(query,filter);
    }

    if (active != null) {
        sql:ParameterizedQuery filter = ` AND active = ${active}`;
        query = sql:queryConcat(query,filter);
    }

    if (address != null) {
        string nameAddress = "%" + address + "%";
        sql:ParameterizedQuery filter = ` AND address like ${nameAddress}`;
        query = sql:queryConcat(query,filter);
    }

    stream<Citizen, sql:Error?> resultStream = dbClient->query(query);
    
    return from Citizen citizen in resultStream select citizen;

}

isolated function addPayment(Payment payment) returns Payment|http:NotFound|error {

    sql:ExecutionResult result = check dbClient->execute(`
        INSERT INTO payment (uuid_code, created_date, amount, 
                            payment_type, citizen_id, provider_id) 
                      VALUES(UUID(), CURRENT_TIMESTAMP, ${payment.amount}, 
                            ${payment.paymentType},${payment.citizenId}, ${payment.providerId})
        `);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is int {
        return getPayment(lastInsertId);
    } else {
        return error("Error inserting record.");
    }

}

isolated function getPayment(int id) returns Payment|http:NotFound|error {
    
    Payment|sql:Error result = dbClient->queryRow(`SELECT * FROM payment where id = ${id}`);

    if result is sql:NoRowsError {
        return http:NOT_FOUND;
    } else {
        return result;
    }

}


isolated function getPaymentByUUID(string uuid) returns Payment|http:NotFound|error {
    
    Payment|sql:Error result = dbClient->queryRow(`SELECT * FROM payment where uuid_code = ${uuid}`);

    if result is sql:NoRowsError {
        return http:NOT_FOUND;
    } else {
        return result;
    }

}

isolated function getAllPaymentsByCitizen(int id) returns Payment[]|error {
    
    Payment[] payments = [];
    
    stream<Payment, error?> resultStream = dbClient->query(
        `SELECT * FROM payment where citizen_id = ${id} order by created_date`
    );
    
    check from Payment payment in resultStream
        do {
            payments.push(payment);
        };
    check resultStream.close();
    
    return payments;
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

isolated function executePayment(PaymentExecute payment) returns Payment|http:NotFound|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE payment SET
            status = ${payment.status}, 
            authorization_number = ${payment.authorizationNumber},
            payment_date = CURRENT_TIMESTAMP() 
        WHERE id = ${payment.id}
    `);
    
    int? affectedRowCount = result.affectedRowCount;
    
    if affectedRowCount is int {
        return getPayment(payment.id);
    } else {
        return error("Error update record.");
    }
}

isolated function alterStatusPayment(PaymentStatus payment) returns Payment|http:NotFound|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE payment SET
            status = ${payment.status} 
        WHERE id = ${payment.paymentId}
    `);

    int? affectedRowCount = result.affectedRowCount;
    
    if affectedRowCount is int {
        return getPayment(payment.paymentId);
    } else {
        return error("Error update record.");
    }
}