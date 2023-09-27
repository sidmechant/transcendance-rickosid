# Utilisation de l'image officielle Node.js comme base
FROM node:latest

# Installation des packages nécessaires
RUN apt-get update && apt-get install -y \
    zsh \
    git \
    curl \
    wget \
    vim \
    xsel \
    xclip \
    tmux \
    httpie \
    sudo 

WORKDIR /data

# Configuration de Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
RUN apt-get install -y nodejs npm

# Création des répertoires de volume
VOLUME ["/mnt/nfs/homes/sredjini/container/data", "/data"]

CMD ["zsh"]