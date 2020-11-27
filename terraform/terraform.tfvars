project_id = "ec-project-294719"
zone = "us-east1-d"
credentials_file = "../credentials/account.json"
kube = {
  machine_type = "n1-standard-4"
  machines     = 1
}
secret_data = {
  JWT_SECRET_KEY = "JWT_SECRET_KEY"
  DB_NAME       = "e-commerce-nodejs"
}