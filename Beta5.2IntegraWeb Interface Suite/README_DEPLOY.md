# Integra Web — Beta Deployment (Cloud Run + Google Cloud DNS + GitHub)

This guide wires your GitHub repo to Cloud Run for CI/CD and maps a custom domain in Google Cloud DNS.

## 1) Prerequisites

- Google Cloud project (e.g., `my-gcp-project`)
- Domain you control (e.g., `yourdomain.com`)
- GitHub repository with this code
- Admin access to set GitHub secrets and Google IAM

## 2) Enable Google Cloud APIs

```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
```

## 3) Create an Artifact Registry (one-time)

```bash
gcloud artifacts repositories create web-app \
  --repository-format=docker \
  --location=us-central1 \
  --description="Container images for Integra web"
```

## 4) Configure GitHub → Google Cloud (Workload Identity Federation)

Recommended (no long-lived keys):

1. Create a Workload Identity Pool and Provider.
   - Follow: https://github.com/google-github-actions/auth#setup
2. Create a service account with deployment permissions (e.g., `cloud-run-deployer@my-gcp-project.iam.gserviceaccount.com`).
   - Roles (minimum):
     - `roles/run.admin`
     - `roles/iam.serviceAccountUser`
     - `roles/artifactregistry.admin` (or `writer` if repo already exists)
3. Bind the GitHub OIDC provider to the service account for your repo.

Set these GitHub secrets:
- `GCP_PROJECT_ID`: `my-gcp-project`
- `GCP_WORKLOAD_IDENTITY_PROVIDER`: The full resource name of your WIF provider
- `GCP_SERVICE_ACCOUNT`: The deployer service account email

Alternative (not recommended): Use a service account JSON key secret named `GCP_SA_KEY` and authenticate with `google-github-actions/auth@v2` via `credentials_json`. See official docs.

## 5) Push to main → CI/CD

The workflow `.github/workflows/deploy-cloud-run.yml`:
- Builds the Docker image from `Dockerfile`
- Pushes to Artifact Registry
- Deploys to Cloud Run as service `integra-web-beta` in `us-central1`

After the first run, fetch the service URL:

```bash
gcloud run services describe integra-web-beta \
  --region us-central1 \
  --format 'value(status.url)'
```

## 6) Custom domain with Google Cloud Run + Google Cloud DNS

Use a subdomain (recommended), e.g., `app.yourdomain.com`.

1) Verify domain ownership (one-time):

```bash
gcloud domains verify yourdomain.com
```

Follow instructions to add the verification TXT record in your DNS. If you use Google Cloud DNS for your domain, create a TXT record there. If the domain is hosted elsewhere, add the TXT there.

2) Create domain mapping:

```bash
gcloud beta run domain-mappings create \
  --service integra-web-beta \
  --region us-central1 \
  --domain app.yourdomain.com
```

This command will output the exact DNS records to add (usually a `CNAME` to `ghs.googlehosted.com` and possibly TXT records). Add them to your DNS zone:
- If using Google Cloud DNS:
  - Go to Cloud DNS → your managed zone → “Add record set”
  - Add the `CNAME` and `TXT` entries returned by the mapping command
- Wait for DNS propagation (can take 10–30 minutes)
- Cloud Run will automatically provision an SSL certificate after DNS resolves

3) Test:
- Visit `https://app.yourdomain.com`

## 7) Using Google Cloud DNS for your domain

If your domain registrar is external, point your domain to the Google Cloud DNS nameservers:
- Create a managed zone in Cloud DNS for `yourdomain.com`
- Copy its NS records
- At your registrar, update the domain’s NS to the Google Cloud DNS nameservers
- Then add the domain mapping records to the managed zone

Note: If you must use an apex domain (`yourdomain.com`), prefer a load balancer + Cloud CDN + backend bucket, or use a subdomain for Cloud Run (recommended).

## 8) Local tweaks

- Build output folder:
  - The Dockerfile copies `/app/dist` into Nginx. If your build puts files elsewhere, change:
    ```
    COPY --from=build /app/dist /usr/share/nginx/html
    ```
- SPA routing:
  - `nginx.conf` falls back to `index.html` for client routes.

## 9) Rollbacks and scaling

- Roll back to a previous image:
  ```bash
  gcloud run revisions list --service integra-web-beta --region us-central1
  gcloud run services update-traffic integra-web-beta \
    --to-revisions REVISION_NAME=100 --region us-central1
  ```
- Adjust autoscaling:
  ```bash
  gcloud run services update integra-web-beta \
    --max-instances 5 --region us-central1
  ```

## 10) Troubleshooting

- 404 on SPA routes:
  - Ensure `nginx.conf` includes `try_files $uri $uri/ /index.html;`
- 502 or not serving on Cloud Run:
  - Confirm Nginx is listening on port 8080, not 80.
- SSL pending:
  - Wait for DNS to propagate and cert provisioning. Check mapping:
    ```bash
    gcloud run domain-mappings describe --domain app.yourdomain.com --region us-central1
    ```

## 11) Optional: Manual domain mapping via Console

- Cloud Run → Domain mappings → Add mapping → Choose service and domain
- It will show DNS records to add. Add these to Cloud DNS or your DNS provider.

---

Happy shipping! Once wired, pushes to `main` auto-deploy to your beta URL.