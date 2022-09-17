import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true); 
SQLite.enablePromise(true);

const database_name = "tarefas.db"; 
const database_version = "1.0"; 
const database_displayname = "Minhas Tarefas";
const database_size = 100000;
                              
export default class Database{

    Conectar(){  
        let db;
        return new Promise((resolve) => {    
            console.log("Checando a integridade do plugin ...");           
            SQLite.echoTest().then(() => {        
                console.log("Integridade Ok ...");        
                console.log("Abrindo Banco de Dados ...");        
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                        db = DB;            
                        console.log("Banco de dados Aberto");            
                        db.executeSql('SELECT 1 FROM Tarefa LIMIT 1').then(() => {
                            console.log("O banco de dados está pronto ... Executando Consulta SQL ...");
                        }).catch((error) =>{
                            console.log("Erro Recebido: ", error);
                            console.log("O Banco de dados não está pronto ... Criando Dados");
                            db.transaction((tx) => {
                                tx.executeSql('CREATE TABLE IF NOT EXISTS Tarefa (id INTEGER PRIMARY KEY AUTOINCREMENT, Descricao VARCHAR(150), DataDia VARCHAR(10), DataMes VARCHAR(10), DataAno VARCHAR(10), Prioridade VARCHAR(10), Concluido VARCHAR(10))');
                            }).then(() => {
                                console.log("Tabela criada com Sucesso");                
                            }).catch(error => {                    
                                console.log(error);                
                            });            
                        });            
                    resolve(db);          
                }).catch(error => {           
                    console.log(error);          
                });      
            }).catch(error => {        
                console.log("echoTest Falhou - plugin não funcional");      
            });    
        }); 
    };

    Desconectar(db) {  
        if (db) {    
            console.log("Fechando Banco de Dados");    
            db.close().then(status => {        
                console.log("Banco de dados Desconectado!!");      
            }).catch(error => {        
                this.errorCB(error);      
            });  
        } else {    
            console.log("A conexão com o banco não está aberta");  
        } 
    };
         

    Listar() {  
        return new Promise((resolve) => {    
            const listaTarefas = [];    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para listar os dados da tabela   
                    tx.executeSql('SELECT * FROM Tarefa', []).then(([tx,results]) => {          
                    console.log("Consulta completa");          
                    var len = results.rows.length;          
                    for (let i = 0; i < len; i++) {            
                        let row = results.rows.item(i);            
                        const { id, Descricao, DataDia, DataMes, DataAno, Prioridade, Concluido } = row;
                        listaTarefas.push({id, Descricao, DataDia, DataMes, DataAno, Prioridade, Concluido});
                    }
                    resolve(listaTarefas);
                });
            }).then((result) => {
                this.Desconectar(db);
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    });
    }
              

    Inserir(tarefa) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {     
                    //Query SQL para inserir um novo produto   
                    tx.executeSql('INSERT INTO Tarefa(Descricao, DataDia, DataMes, DataAno, Prioridade, Concluido) VALUES (?, ?, ?, ?, ?, ?)', [tarefa.Descricao, tarefa.DataDia, tarefa.DataMes, tarefa.DataAno, tarefa.Prioridade, tarefa.Concluido]).then(([tx, results]) => { 
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

    Concluir(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {
                    //Query SQL para atualizar um dado no banco        
                    tx.executeSql("UPDATE Tarefa SET Concluido = 'Encerrado' WHERE id = ?", [id]).then(([tx, results]) => {          
                    resolve(results);        
                });      
            }).then((result) => {        
                  this.Desconectar(db);      
                }).catch((err) => {        
                  console.log(err);      
                });    
            }).catch((err) => {     
                console.log(err);    
            });  
        });  
    }

    Deletar(id) {  
        return new Promise((resolve) => {    
            this.Conectar().then((db) => {      
                db.transaction((tx) => {    
                    //Query SQL para deletar um item da base de dados    
                    tx.executeSql('DELETE FROM Tarefa WHERE id = ?', [id]).then(([tx, results]) => {          
                        console.log(results);          
                        resolve(results);        
                    });      
                }).then((result) => {        
                    this.Desconectar(db);      
                }).catch((err) => {        
                    console.log(err);      
                });    
            }).catch((err) => {      
                console.log(err);    
            });  
        });  
    }

}