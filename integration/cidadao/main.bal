import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable string host = "104.251.217.31";
configurable int port = 3306;
configurable string user = "root";
configurable string password = "pl4n0n0v3";
configurable string database = "farmaceutico";

type Perfil record {|
    int id;
    string descricao;
|};

final mysql:Client db = check new (host, user, password, database, port);

service / on new http:Listener(8080) {
    private final mysql:Client db;

    function init() returns error? {
        self.db = check new (host, user, password, database, port);
    }

    resource function get perfis() returns Perfil[]|error {
       
        stream<Perfil, sql:Error?> perfilStream = self.db->query(`SELECT * FROM perfil`);
        return from Perfil perfil in perfilStream select perfil;
    }

    resource function get perfil/[int id]() returns Perfil|http:NotFound|error {
       
        Perfil|sql:Error result = self.db->queryRow(`SELECT * FROM perfil where id = ${id}`);

        if result is sql:NoRowsError {
            return http:NOT_FOUND;
        } else {
            return result;
        }
    }


}





