# Purpose
This project serves as a very simple example of how to quickly get started developing functionality for PingIdentity orchestration platform

# Layout

# Ground rules
## Coding style
Coding style is enforced by actions to ensure we have consistent code so as to provide cohesive ongoing maintenance, support and quality control.
## Improvement / support
Open issues against this project or better, submit pull request with suggested modifications to improve the experience.

# Checklist
- [ ] Edit manifest.json
- [ ] Create index.json
    * Ensure function for each capability
        ```
        sdk.methods.handle_capability_<capabilityName> = async ({properties}) => {
        ```

# Building Connector Docker Image (for local testing)
Builds a docker image in your local docker repository.  Requires the following:
* Local Running SingularKey Dev environment
* ~/.npmrc   (Contact: Slack Channel #sk-dev)
* ~/projects/skdev/dev-setup
```
./build.sh
```

# Updating the Mongo DB with manifest changes
```
./update-manifest.sh
```

# Running/Debugging Connector
* Option 1 - Debugging in VSCode

  Open in VSCode and Run Debugging.  It should register with redis and allow you to debug with breakpoints.

* Option 2 - Running Docker-compose
  ```
  docker-compose up
  ```
