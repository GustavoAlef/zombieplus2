>1 - Baixar as imagens:*

>2 - Criar a rede Docker
docker network create --driver bridge skynet

>img banco de dados
docker pull postgres*
>Subir o Banco de Dados
docker run --name pgdb --network=skynet -e "POSTGRES_PASSWORD=qaninja" -p 5432:5432 -v var/lib/postgresql/data -d postgres

>img adm do banco
docker pull dpage/pgadmin4*
>Subir o Administrador do Banco de Dados (PgAdmin)
docker run --name pgadmin --network=skynet -p 15432:80 -e "PGADMIN_DEFAULT_EMAIL=root@qaninja.io" -e "PGADMIN_DEFAULT_PASSWORD=qaninja" -d dpage/pgadmin4

>img api
​docker pull papitoio/zombie-api*
>Subir a API 
docker run --name zombie-api --network=skynet -e "DATABASE=pgdb" -p 3000:3000 -d papitoio/zombie-api

>img aplicação
​docker pull papitoio/zombie-web*
>Subir a Aplicação Web
docker run --name zombie-web --network=skynet -e "VUE_APP_API=http://zombie-api:3000" -p 5000:5000 -d papitoio/zombie-web

>fazer hosteamento
sudo vim /etc/hosts
127.0.0.1   pgadmin
127.0.0.1   pgdb
127.0.0.1   zombie-api
127.0.0.1   zombie-web
127.0.0.1   jenkins

>Quando você reiniciar o seu computador, certifique-se que o Docker esteja online e suba containers​ novamente:
docker start pgdb
docker start pgadmin
​docker start zombie-api
​docker start zombie-web
docker start jenkins

>Se alguma coisa der errado...
docker network rm skynet - remove a rede
docker rm -f ​pgdb
docker rm -f ​pgadmin
docker rm -f ​zombie-api
docker rm -f ​zombie-web

>entrando e desbloqueando o container do jenkins
*lembrar de renomear o container se precisar
sudo docker exec -it jenkins bash
-pegar o endereço mostrado no navegador, colar usando o cat. entao obtem-se um hash, copiar e colar la no navegador.

>iniciando container do jenkins
docker run \
  -u root \
  --rm \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean