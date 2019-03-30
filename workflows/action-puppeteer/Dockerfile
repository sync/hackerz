FROM node:8

LABEL repository="https://github.com/sync/hackerz"
LABEL homepage="http://github.com/sync"
LABEL maintainer="sync@github.com>"

LABEL com.github.actions.name="GitHub Action for puppeteer"
LABEL com.github.actions.description="Wraps the npm CLI to enable common npm commands with extra stuff added for puppeteer."
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="brown"

# https://github.com/GoogleChrome/puppeteer/blob/9de34499ef06386451c01b2662369c224502ebe7/docs/troubleshooting.md#running-puppeteer-in-docker
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get -y install procps \
    && apt-get -y install util-linux \
    && apt-get -y install curl \
    && apt-get -y install build-essential \
    && apt-get -y install git \
    && apt-get install -y google-chrome-unstable \
      --no-install-recommends

RUN npm install -g yarn
RUN npm install -g --unsafe-perm esy

# It's a good idea to use dumb-init to help prevent zombie chrome processes.
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["dumb-init", "--", "/entrypoint.sh"]
CMD ["help"]
