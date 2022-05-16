#!/bin/bash

### connect to the k8s cluster first
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=akwshdkawbnd

kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=sk_test_51HvAvaJaplbYiMJImsbp3ZWvgk3eWySf35WuNgwUhVKs39jj4BY0sdb7d23XdylLtqqspQEdkwED40cqvGDHXLeo00lXR7Q5Au

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/do/deploy.yaml