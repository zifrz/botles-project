{ pkgs, ... }: {
  channel = "stable-24.05"; # Or "unstable"

  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.nodemon
    pkgs.postgresql_15
    # pkgs.docker
    pkgs.openssl
    # pkgs.docker-compose
  ];

  env = {
    DATABASE_URL = "";
    # KAFKA_BOOTSTRAP_SERVERS = "";
  };

  services.docker.enable = true;

  idx = {
    extensions = [
      "Prisma.prisma"
      "ms-azuretools.vscode-docker"
      "rangav.vscode-thunder-client"
    ];

    workspace = {
      onCreate = {
        npm-install = "npm install --no-audit --prefer-offline";
        # docker-compose-create = ''
        #   echo 'version: "3.8"
        #   services:
        #     db:
        #       image: postgres:15
        #       environment:
        #         POSTGRES_USER: user
        #         POSTGRES_PASSWORD: password
        #         POSTGRES_DB: mydb
        #       ports:
        #         - "5432:5432"
        #     kafka:
        #       image: apache/kafka:3.7.1
        #       ports:
        #         - "9092:9092"' > docker-compose.yml
        # '';
        # docker-compose-up = ''
        #   if docker compose ps > /dev/null 2>&1; then
        #     echo "Docker containers are already running."
        #   else
        #     echo "Starting Docker containers..."
        #     docker compose up -d
        #     if [ $? -eq 0 ]; then
        #       echo "Docker containers started successfully."
        #     else
        #       echo "Error starting Docker containers."
        #     fi
        #   fi
        # '';
        default.openFiles = [ "README.md" ];
      };
      onStart = {
        setup-instructions = ''
          echo "1. Set DATABASE_URL and env variables."
          echo "2. Run 'npx prisma generate' if needed."
          echo "3. Run 'docker compose up -d' if not already running."
          echo "4. Refer to README.md for project setup."
        '';
      };
    };
  };
}