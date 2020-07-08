let mysql = require('mysql');


class ApplyMySql {
    constructor() {
        
    }

    async init(connectionInfo) {
        this.connectionInfo = connectionInfo;
    }

    async dbop(sql, sqlParam) {
        var connection = null;

        connection = mysql.createConnection(this.connectionInfo);  

        
        return await this.dbOp1(sql, sqlParam, connection);
    }

    
    async beginTrans() {
        var connection = null;

        connection = mysql.createConnection(this.connectionInfo);  

        return await this.beginTrans1(connection);
    }

    dbOp1(sql, sqlParam, connection) { 
        var promise = new Promise((resolve, reject) => {
            connection.query(sql, sqlParam, (err, result) => {
                if (err) {
                    tools.error('[dbOp1 error] - ' + err.message);
                    //connection.destroy();
                    reject(err);
                } else {
                    //connection.destroy();
                    resolve(result);
                }


                connection.destroy();
                
            });
        });

        return promise;
    }


    beginTrans1(connection) {
        var promise = new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    tools.error('[beginTrans1 error] - ' + err.message);
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });

        return promise;
    }

    commit(connection) {
        var promise = new Promise((resolve, reject) => {
            connection.commit((err) => {
                if (err) {
                    tools.error('[beginTrans error] - ' + err.message);
                    reject(err);
                } else {
                    resolve(connection);
                }

                connection.destroy();

            });
        });

        return promise;
    }

    rollback(connection) {
        var promise = new Promise((resolve, reject) => {
            connection.rollback((err) => {
                if (err) {
                    tools.error('[beginTrans error] - ' + err.message);
                    reject(err);
                } else {
                    resolve(connection);
                }


                connection.destroy();

            });
        });

        return promise;
    }

    dbOpInTrans(sql, sqlParam, connection) {
        var promise = new Promise((resolve, reject) => {
            connection.query(sql, sqlParam, (err, result) => {
                if (err) {
                    tools.error('[dbOpInTrans error] - ' + err.message);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        return promise;
    }


}

module.exports = ApplyMySql;

