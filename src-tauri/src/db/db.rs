use kuzu::{Connection, Database, Error, SystemConfig};

pub fn initialize_db() -> Result<Database, Error> {
    let db_path = "notes.db";
    let config = SystemConfig::default();
    let db = Database::new(db_path, config)?;

    println!("Database initialized at path: {}", db_path);

    {
        let conn = Connection::new(&db)?;

        let create_table_query = "CREATE NODE TABLE Note (title STRING, content STRING, PRIMARY KEY (title))";

        match conn.query(create_table_query) {
            Ok(_) => println!("'Note' table created successfully."),
            Err(err) => {
                if err.to_string().contains("already exists") {
                    println!("'Note' table already exists.");
                } else {
                    return Err(err); 
                }
            }
        }
    }

    Ok(db)
}
