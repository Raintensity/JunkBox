FROM node:current-slim
RUN apt update \
	&& apt install -y git openssh-client --no-install-recommends \
	&& rm -rf /var/lib/apt/lists/* \
	&& apt purge -y --auto-remove

WORKDIR /home/node
COPY entrypoint.sh /home/node
ENTRYPOINT ["/bin/sh", "entrypoint.sh"]
CMD ["node"]
