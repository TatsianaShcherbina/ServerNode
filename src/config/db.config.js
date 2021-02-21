const DBSOURCE = 'db.sqlite',
    table_user='user',
    columns_user=[
        'id INTEGER PRIMARY KEY AUTOINCREMENT',
        'first_name text',
        'last_name text',
        'email text UNIQUE',
        'event_date text'],
    constraint_user='CONSTRAINT email_unique UNIQUE (email)'


module.exports={
    source:DBSOURCE,
    table_user,
    columns_user,
    constraint_user
}
