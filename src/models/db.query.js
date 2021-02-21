const user=require('./user.model.js');

let CREATE_USER=`CREATE TABLE ${user.table_name} (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            ${user.first_name} text, 
            ${user.last_name} text, 
            ${user.email} text UNIQUE, 
            ${user.event_date} text, 
            CONSTRAINT email_unique UNIQUE (${user.email}))`,
    INSERT_USER=`INSERT INTO ${user.table_name} (${user.first_name}, ${user.last_name}, ${user.email}, ${user.event_date}) VALUES (?,?,?,?)`,
    SELECT_ALL='select * from ',
    DELETE_USER=`DELETE FROM ${user.table_name} WHERE id = ?`,
    UPDATE_USER=`UPDATE ${user.table_name} set 
                ${user.first_name} = COALESCE(?,${user.first_name}),
                ${user.last_name} = COALESCE(?,${user.last_name}),
                ${user.email} = COALESCE(?,${user.email}), 
                ${user.event_date} = COALESCE(?,${user.event_date}) 
                WHERE id = ?`

function createTable(tableName, columns, constraint) {
    let query = `CREATE TABLE ${tableName} (`;
    for(let column in columns) {
        query += `${column},`
    }
    query+=`${constraint});`
    return query;
}

function selectAll(tablename){
    return SELECT_ALL+`${tablename};`
}

function selectOne(tablename, selectparam='id'){
    return `select * from ${tablename} where ${selectparam} = ?`
}


module.exports={
    CREATE_USER,
    INSERT_USER,
    createTable,
    selectAll,
    selectOne,
    UPDATE_USER,
    DELETE_USER
}
