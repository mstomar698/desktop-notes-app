use std::env;
use std::path::Path;
use std::process::Command;

fn main() {
    let llvm_path = "/usr/local/opt/llvm";
    let gcc_path = "/usr/local/opt/gcc";

    println!("cargo:rustc-link-search=native={}/lib", llvm_path);
    println!("cargo:rustc-link-search=native={}/lib", gcc_path);
    
    println!("cargo:rustc-link-lib=dylib=stdc++");
    println!("cargo:rustc-link-lib=dylib=c++");
    
    println!("cargo:warning=LLVM Path: {}", llvm_path);
    println!("cargo:warning=GCC Path: {}", gcc_path);
}