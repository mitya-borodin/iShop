docker build -t borodindmitriy/e-commerce-front:latest -t borodindmitriy/e-commerce-front$SHA ./packages/frontend
docker build -t borodindmitriy/e-commerce-back:latest -t borodindmitriy/e-commerce-back:$SHA ./packages/backend

docker push borodindmitriy/e-commerce-front:latest
docker push borodindmitriy/e-commerce-back:latest

docker push borodindmitriy/e-commerce-front:$SHA
docker push borodindmitriy/e-commerce-back:$SHA

kubectl apply -f k8s

kubectl set image deployement/client-deployment client=borodindmitriy/e-commerce-front:$SHA
kubectl set image deployement/server-deployment server=borodindmitriy/e-commerce-back:$SHA