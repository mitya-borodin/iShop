export KUBECONFIG=$(pwd)/.kube/config && \
mkdir -p .kube && \
echo ${cluster_ca_certificate} | base64 -D > .kube/ca.crt && \
echo ${client_certificate} | base64 -D > .kube/client.crt && \
echo ${client_key} | base64 -D > .kube/client.key && \
kubectl config set-cluster default \
    --server=https://${endpoint} \
    --certificate-authority=.kube/ca.crt \
    --embed-certs && \
kubectl config set-credentials default \
    --certificate-authority=.kube/ca.crt \
    --client-key=.kube/client.key \
    --client-certificate=.kube/client.crt \
    --embed-certs && \
kubectl config set-context default --cluster=default --user=default && \
kubectl config use-context default && \
echo '#!/bin/sh' > kubectl && \
echo 'KUBECONFIG=.kube/config kubectl "$@"' >> kubectl && \
chmod a+x ./kubectl && \
echo '#!/bin/sh' > helm && \
echo 'KUBECONFIG=.kube/config helm "$@"' >> helm && \
chmod a+x ./helm
