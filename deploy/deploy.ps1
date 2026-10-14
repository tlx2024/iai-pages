# Usage: powershell -File deploy/deploy.ps1   (run from the iai-pages repo root)
# Builds the site, uploads dist + nginx config to studio-126, restarts the container.
$ErrorActionPreference = 'Stop'
$remote = 'studio-126'
Push-Location site
npm run build
Pop-Location
tar -czf deploy/iai-pages-dist.tgz -C site/dist .
scp deploy/iai-pages-dist.tgz deploy/nginx.conf deploy/docker-compose.yml "${remote}:iai-pages/"
ssh $remote 'cd ~/iai-pages && rm -rf www/* && tar -xzf iai-pages-dist.tgz -C www && rm iai-pages-dist.tgz && docker compose up -d && docker compose restart && df -h / | tail -1'
Remove-Item deploy/iai-pages-dist.tgz
Write-Host 'Done: http://192.168.0.126:8088/iai-pages/'
