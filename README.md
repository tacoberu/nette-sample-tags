Nette Sample Tags
=================

Sample application in Nette and MaterializeCSS

## Instalace MySQL

$ podman run -d \
  --name sportisimo-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=sportisimo \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=kleslo \
  -v $(pwd)/var/mysql_data:/var/lib/mysql \
  mysql:5.7

code in app/persistence
