# Update the VARIANT arg in devcontainer.json to pick a Node.js version: 14, 12, 10
ARG VARIANT=12
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update \
  && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends chromium tmux

ENV CHROME_BIN=/usr/bin/chromium
ENV BROWSER="Chrome_Without_Sandbox"

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN sudo -u node bash -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
RUN sudo -u node npm install -g @angular/cli \
  yarn \
  prettier
