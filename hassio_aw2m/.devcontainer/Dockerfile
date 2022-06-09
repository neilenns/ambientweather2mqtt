FROM mcr.microsoft.com/vscode/devcontainers/base:debian

ENV \
    DEBIAN_FRONTEND=noninteractive \
    DEVCONTAINER=1

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install tools
RUN \
    apt-get update \
    && apt-get install -y --no-install-recommends \
        dbus \
        network-manager \
        libpulse0 \
        xz-utils

COPY ./common/rootfs /
COPY ./common/rootfs_supervisor /
COPY ./common/install /tmp/common/install

# Install common
RUN \
    bash devcontainer_init \
    && common_install_packages \
        docker \
        shellcheck \
        cas \
        os-agent

COPY ./addons/rootfs /
