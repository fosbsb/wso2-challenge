import ballerina/sql;
import ballerinax/java.jdbc;
import ballerina/http;

configurable string hrEndpoint = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int    PORT = ?;
configurable string DATABASE = ?;

type Factory record {|
    readonly int? id;
    @sql:Column { name: "operation_data" }
    string operationData;
    float amount;
    @sql:Column { name: "authorization_code" }
    string authorizationCode;
    @sql:Column { name: "card_number" }
    string cardNumber;
    @sql:Column { name: "card_band" }
    string cardBand;
    @sql:Column { name: "card_validate" }
    string cardValidate;
    string state;

|};

final string jdbcUrl = "jdbc:postgresql://"+HOST+":"+PORT.toString()+"/"+DATABASE+"?user="+USER+"&password="+PASSWORD;
final jdbc:Client jdbcClient = check new(jdbcUrl);

isolated function getAllFactory() returns Factory[]|error {
    
    Factory[] factorys = [];
    
    stream<Factory, error?> resultStream = jdbcClient->query(
        `SELECT * FROM factory order by 1 desc`
    );
    
    check from Factory factory in resultStream
        do {
            factorys.push(factory);
        };
    check resultStream.close();
    
    return factorys;
}

isolated function getFactory(string authorizationCode) returns Factory|http:NotFound|error {
    
    Factory|sql:Error result = jdbcClient->queryRow(`SELECT * FROM factory where authorization_code = ${authorizationCode}`);

    if result is sql:NoRowsError {
        return http:NOT_FOUND;
    } else {
        return result;
    }
}

isolated function getFactoryById(int id) returns Factory|http:NotFound|error {
    
    Factory|sql:Error result = jdbcClient->queryRow(`SELECT * FROM factory where id = ${id}`);

    if result is sql:NoRowsError {
        return http:NOT_FOUND;
    } else {
        return result;
    }
}

isolated function addFactory(Factory factory) returns Factory|http:NotFound|error {

    sql:ExecutionResult result = check jdbcClient->execute(`
        INSERT INTO factory 
    	(operation_data, amount, authorization_code, 
         card_number, card_band, card_validate, state) 
    	VALUES(CURRENT_TIMESTAMP, ${factory.amount},uuid_generate_v1(), 
         ${factory.cardNumber}, ${factory.cardBand}, ${factory.cardValidate}, 'APPROVED')`);
    
    int|string? lastInsertId = result.lastInsertId;
    
    if lastInsertId is int {
        return getFactoryById(lastInsertId);
    } else {
        return error("Error inserting record.");
    }

}
