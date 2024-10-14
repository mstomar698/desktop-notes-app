mod schema;
use schema::notes::Note;

use kuzu::{Connection, Database, Value};
use tauri::{Manager, State};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn add_note(title: String, content: String, db: State<Database>) -> Result<String, String> {
    let conn = Connection::new(&db).expect("Failed to create connection");
    let query = "CREATE (:Note {title: $title, content: $content})";
    
    let mut stmt = conn.prepare(query).expect("Failed to prepare statement");

    let params = vec![
        ("title", Value::String(title)),
        ("content", Value::String(content)),
    ];

    conn.execute(&mut stmt, params).expect("Failed to execute query");

    Ok("Note added successfully".to_string())
}

#[tauri::command]
fn get_notes(db: State<Database>) -> Result<Vec<Note>, String> {
    let conn = Connection::new(&db).expect("Failed to create connection");

    let query = "MATCH (n:Note) RETURN n.title, n.content";
    let mut result = conn.query(query).expect("Failed to execute query");

    let mut notes: Vec<Note> = Vec::new();

    while let Some(row) = result.next() {
        let title: String = row.get(0).map_or_else(|| "".to_string(), |v| v.to_string());
        let content: String = row.get(1).map_or_else(|| "".to_string(), |v| v.to_string());

        notes.push(Note { title, content });
    }

    Ok(notes)
}

pub fn run(db: Database) {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, add_note, get_notes,])
        .setup(|app| {
            app.manage(db);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
