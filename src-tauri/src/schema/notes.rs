use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Note {
    pub title: String,
    pub content: String,
}
