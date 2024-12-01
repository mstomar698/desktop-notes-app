use std::path::Path;

fn main() {
    let kuzu_lib_path = Path::new("kuzu/libkuzu.dylib");

    if kuzu_lib_path.exists() {
        println!("cargo:rerun-if-changed={}", kuzu_lib_path.display());

        println!("cargo:rustc-link-lib=dylib=kuzu");

        println!(
            "cargo:rustc-link-search=native={}",
            kuzu_lib_path.parent().unwrap().display()
        );
    } else {
        panic!("KuzuDB library not found at {:?}", kuzu_lib_path);
    }
}
