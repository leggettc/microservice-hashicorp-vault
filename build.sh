

# Build Docker Image locally

docker build \
	--build-arg NPM_TOKEN="$(cat ~/.npmrc)" \
	--tag microservice-hashicorp-vault:latest \
	--progress plain .

echo "Next Step: docker-compose up"
