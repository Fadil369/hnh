# Docker Registry Configuration

## Primary Registry — Docker Hub

- **Login**: already authenticated at `~/.docker/config.json`
- **Username**: `github611`
- **Org**: `brainsait` (member with push access)
- **Token**: env var `DOCKER_TOKEN` / vault key `docker_hub`
- **Intersystems registry**: `containers.intersystems.com` — also authenticated

## Brainsait Docker Hub Repos

| Image | Visibility | Last Updated |
|-------|-----------|--------------|
| `brainsait/test-image` | public | 2025-05-15 |
| `brainsait/az` | public | 2025-01-05 |
| `brainsait/dhi-alpine-base` | private | 2025-12-04 |

## Build & Push Pattern

```bash
# Build
docker build -t brainsait/<image>:<tag> .

# Push
docker push brainsait/<image>:<tag>

# Pull private
echo "$DOCKER_TOKEN" | docker login -u github611 --password-stdin
docker pull brainsait/dhi-alpine-base
```

## Credentials

```bash
# Re-login if needed (token from env):
echo "$DOCKER_TOKEN" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Or from vault:
CREDS=$(curl -s https://penguin-secrets.brainsait-fadil.workers.dev/secret/docker_hub \
  -H "Authorization: Bearer $SECRETS_TOKEN")
```
