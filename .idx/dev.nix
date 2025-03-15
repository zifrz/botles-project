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
    # DATABASE_URL = "";
    # KAFKA_BOOTSTRAP_SERVERS = "";
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
        # npm-install = "npm install --no-audit --prefer-offline";
        default.openFiles = [ "README.md" ];
      };
      onStart = {
        setup-instructions = ''
          echo "1. Run 'npx prisma generate' if needed."
          echo "2. Check if docker is running: sudo systemctl status docker"
          echo "3. Run 'docker compose up -d' if not already running."
          echo "4. Refer to README.md for project setup."
        '';
      };
    };
  };
}