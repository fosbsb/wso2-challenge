import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable string hrEndpoint = ?;
configurable string host = ?;
configurable int port = ?;
configurable string user = ?;
configurable string password = ?;
configurable string database = ?;

type Cidadao record {|
    int id;
    string nome;
    string email;
    string telefone;
    string pais;
    @sql:Column { name: "numero_documento" }
    string numero_documento;
    string? anexo;
    string perfil;
    boolean ativo;
|};

final mysql:Client db = check new (host, user, password, database, port);

service / on new http:Listener(8080) {
    private final mysql:Client db;

    function init() returns error? {
        self.db = check new (host, user, password, database, port);
    }

    resource function get cidadao() returns Cidadao[]|error {
       
        stream<Cidadao, sql:Error?> resultStream = self.db->query(`SELECT * FROM cidadao`);
        return from Cidadao cidadao in resultStream select cidadao;
    }

    resource function get cidadao/[int id]() returns Cidadao|http:NotFound|error {
       
        Cidadao|sql:Error result = self.db->queryRow(`SELECT * FROM cidadao where id = ${id}`);

        if result is sql:NoRowsError {
            return http:NOT_FOUND;
        } else {
            return result;
        }
    }

    resource function get filter(int? id, string? nome, string? perfil, string? pais, string? numeroDocumento, boolean? ativo) returns Cidadao[]|error {
       
        string perfilAdmin = "ADMIN";

        sql:ParameterizedQuery query = `SELECT * FROM cidadao WHERE perfil <> ${perfilAdmin} `;

        if (id != null) {
            sql:ParameterizedQuery filter = ` AND id = ${id}`;
            query = sql:queryConcat(query,filter);
        }

        if (nome != null) {
            string nomeLike = "%" + nome + "%";
            sql:ParameterizedQuery filter = ` AND nome like ${nomeLike}`;
            query = sql:queryConcat(query,filter);
        }

        if (perfil != null) {
            sql:ParameterizedQuery filter = ` AND perfil = ${perfil}`;
            query = sql:queryConcat(query,filter);
        }

        if (pais != null) {
            sql:ParameterizedQuery filter = ` AND pais = ${pais}`;
            query = sql:queryConcat(query,filter);
        }

        if (numeroDocumento != null) {
            sql:ParameterizedQuery filter = ` AND numero_documento = ${numeroDocumento}`;
            query = sql:queryConcat(query,filter);
        }

        if (ativo != null) {
            sql:ParameterizedQuery filter = ` AND ativo = ${ativo}`;
            query = sql:queryConcat(query,filter);
        }

        stream<Cidadao, sql:Error?> resultStream = self.db->query(query);
        return from Cidadao cidadao in resultStream select cidadao;
    }

}





