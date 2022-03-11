{ pkgs ? import <nixpkgs> {} }:

let

    yarn = pkgs.yarn.override { nodejs = pkgs.nodejs-16_x; };

in pkgs.mkShell {
    buildInputs = [ yarn pkgs.nodejs-16_x ];
}
