document.addEventListener('deviceready', onDeviceReady, false);

let db;

function inserir(){
    let userName = document.getElementById(txtLogin).value;
    let userPass = document.getElementById(txtPassword).value;

    db.transaction(
        function(tx){
            console.log(tx);
            tx.executeSql("INSERT INTO VALUES (?,?)",[userName,userPass]);
        },
        function(err){
           console.log(err.message);
       },
       function(){
           alert("Tabela criada com sucesso");
       }
    );

}

function listar(){
    db.transaction(
        function(tx){
            let sql = "SELECT login,pass FROM usuarios";
            tx.executeSql('SELECT login AS uLogin,pass AS uPass FROM usuarios',sql,[],function(tx,rs){
                alert(JSON.stringify(rs));
                console.log("===========");
                console.log(JSON.stringify(rs));
                console.log(rs.rows.lengh);

                let i = 0;
                for(i = 0; i < rs.rows.length; i++){
                    alert("item "+i);
                    let recordItem = rs.rows.item(i);
                    alert(JSON.stringify(recordItem));
                } 
            });
        },
        function(err){
            alert(err.message)
        },
        function(){

        });
    
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //conferir se temos o objeto SQLitePlugin
    console.log(window.sqlitePlugin);
    // Adicionar função pro evento click do btn inserir
    document.getElementById("btnInserir").addEventListener("click",inserir);

      // Adicionar função pro evento click do btn listar
    document.getElementById("btnListar").addEventListener("click",listar);

    //criar e abrir banco
    let dadosDoNossoBanco = {
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system'
    };
    db = window.sqlitePlugin.openDatabase(dadosDoNossoBanco);

    //criar a tabela com duas colunas user e senha
     db.transaction(
         function(tx){
             console.log(tx);
             tx.executeSql('CREATE TABLE IF NOT EXISTS usuarios (login, pass)')
         },
         function(err){
            console.log(err.message);
        },
        function(){
            alert("Tabela criada com sucesso");
        }
     );
