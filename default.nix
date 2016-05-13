with import <nixpkgs> {};

stdenv.mkDerivation rec {
  name = "start.ffhh";

  buildInputs = [
    jekyll
  ];
}
