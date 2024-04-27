import ballerina/lang.runtime;
import ballerina/task;
import ballerina/io;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int    PORT = ?;
configurable string DATABASE = ?;
configurable decimal SECONDES = ?;
configurable decimal TIME = ?;


final mysql:Client dbClient = check new(
    host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);

isolated function cancelPayments() returns int|error {

    sql:ExecutionResult result = check dbClient->execute(`
        UPDATE payment SET 
            status = 'CANCELLED' 
        WHERE status = 'WAITING'
        AND payment_date is null 
        AND created_date <= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    `);
    
    int? affectedRowCount = result.affectedRowCount;
    
    if affectedRowCount is int {
        check dbClient.close();
        return affectedRowCount;
    } else {
        check dbClient.close();
        return error("Error update record.");
    }
    
}

class Job {

    *task:Job;
    int i = 1;

    public function execute() {
        self.i += 1;
        io:println("Update rows: ", cancelPayments());       
    }

    isolated function init(int i) {
        self.i = i;
    }
}

public function main() returns error? {

    task:JobId id = check task:scheduleJobRecurByFrequency(new Job(0), SECONDES);

    //24 horas
    runtime:sleep(TIME);

    io:println("Job " + id.toString() + " completed");
    check task:unscheduleJob(id);
}