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
    int id;
    string name;
    string email;
    string phone;
    string country;
    @sql:Column { name: "document_number" }
    string documentNumber;
    string? attachment;
    string profile;
    boolean active;
    @sql:Column { name: "created_date" }
    string dateCreated;
|};

final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);

isolated function addCitizen(Citizen citizen) returns int|error {

    sql:ExecutionResult result = check dbClient->execute(`
        INSERT INTO citizen (name, email, phone, 
                             country, document_number,
                             profile, attachment)
        VALUES (${citizen.name}, ${citizen.email}, ${citizen.phone},  
                ${citizen.country}, ${citizen.documentNumber}, 
                ${citizen.profile}, ${citizen.attachment})
        `);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is int {
        return lastInsertId;
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

isolated function updateCitizen(Citizen citizen) returns int|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE citizen SET
            name = ${citizen.name}, 
            email = ${citizen.email},
            phone = ${citizen.phone},
            country = ${citizen.country},
            document_number = ${citizen.documentNumber} 
        WHERE id = ${citizen.id}
    `);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is int {
        return lastInsertId;
    } else {
        return error("Error update record.");
    }
}

isolated function disableCitizen(int id) returns int|error {
    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE FROM citizen SET active = false WHERE id = ${id}
    `);

    int? affectedRowCount = result.affectedRowCount;
    
    if affectedRowCount is int {
        return affectedRowCount;
    } else {
        return error("Error update record.");
    }
}

isolated function removeCitizen(int id) returns int|error {
    sql:ExecutionResult result = check dbClient->execute(`
        DELETE FROM citizen WHERE id = ${id}
    `);
    
    int? affectedRowCount = result.affectedRowCount;

    if affectedRowCount is int {
        return affectedRowCount;
    } else {
        return error("Error remove record.");
    }
}

isolated function getFilterCitizen(int? id, string? name, string? profile, string? country, 
                                string? documentNumber, boolean? active) returns Citizen[]|error {
       
        string adminProfile = "ADMIN";

        sql:ParameterizedQuery query = `SELECT * FROM citizen WHERE profile <> ${adminProfile} `;

        if (id != null) {
            sql:ParameterizedQuery filter = ` AND id = ${id}`;
            query = sql:queryConcat(query,filter);
        }

        if (name != null) {
            string nameLike = "%" + name + "%";
            sql:ParameterizedQuery filter = ` AND name like ${nameLike}`;
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

        stream<Citizen, sql:Error?> resultStream = dbClient->query(query);
        
        return from Citizen citizen in resultStream select citizen;
}




