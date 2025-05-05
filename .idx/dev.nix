{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.nodemon
    pkgs.postgresql_15
    pkgs.docker
    pkgs.openssl
    pkgs.docker-compose
    pkgs.htop
  ];

  env = {
    
  };

  services.docker.enable = true;

  idx = {
    extensions = [
      "Prisma.prisma"
      "ms-azuretools.vscode-docker"
      "EchoAPI.echoapi-for-vscode"
    ];

    workspace = {
      onCreate = {
        default.openFiles = [ "README.md" ];
      };
      onStart = {
        setup-instructions = ''
          echo "📖 See README.md for details & .env setup"
        '';
      };
    };
  };
}