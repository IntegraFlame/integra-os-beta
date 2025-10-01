# Integra Web Interface - Terraform Outputs
# Output values for the deployed infrastructure

output "website_url" {
  description = "The primary URL of the Integra web interface"
  value       = var.enable_ssl ? "https://${var.domain_name}" : "http://${var.domain_name}"
}

output "www_website_url" {
  description = "The www URL of the Integra web interface"
  value       = var.enable_ssl ? "https://www.${var.domain_name}" : "http://www.${var.domain_name}"
}

output "load_balancer_ip" {
  description = "The external IP address of the load balancer"
  value       = google_compute_global_address.integra_ip.address
}

output "bucket_name" {
  description = "The name of the Cloud Storage bucket hosting the website"
  value       = google_storage_bucket.integra_website.name
}

output "bucket_url" {
  description = "The URL of the Cloud Storage bucket"
  value       = google_storage_bucket.integra_website.url
}

output "dns_zone_name" {
  description = "The name of the DNS managed zone"
  value       = google_dns_managed_zone.integra_zone.name
}

output "dns_zone_name_servers" {
  description = "The name servers for the DNS zone (configure these with your domain registrar)"
  value       = google_dns_managed_zone.integra_zone.name_servers
}

output "ssl_certificate_name" {
  description = "The name of the managed SSL certificate"
  value       = var.enable_ssl ? google_compute_managed_ssl_certificate.integra_ssl_cert[0].name : "SSL not enabled"
}

output "ssl_certificate_status" {
  description = "The status of the SSL certificate"
  value       = var.enable_ssl ? google_compute_managed_ssl_certificate.integra_ssl_cert[0].managed[0].status : "SSL not enabled"
}

output "cdn_enabled" {
  description = "Whether Cloud CDN is enabled"
  value       = var.enable_cdn
}

output "deployment_commands" {
  description = "Commands to deploy the website to the bucket"
  value = {
    build_command = "cd ../.. && npm run build"
    sync_command  = "gsutil -m rsync -r -d dist/ gs://${google_storage_bucket.integra_website.name}/"
    cache_command = "gsutil -m setmeta -h 'Cache-Control:public, max-age=3600' gs://${google_storage_bucket.integra_website.name}/**"
  }
}

output "dns_configuration_instructions" {
  description = "Instructions for configuring DNS with your domain registrar"
  value = {
    message = "Configure the following name servers with your domain registrar:"
    name_servers = google_dns_managed_zone.integra_zone.name_servers
    verification_command = "dig NS ${var.domain_name}"
  }
}

output "monitoring_urls" {
  description = "URLs for monitoring the deployment"
  value = {
    google_cloud_console = "https://console.cloud.google.com/storage/browser/${google_storage_bucket.integra_website.name}"
    load_balancer_console = "https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list"
    dns_console = "https://console.cloud.google.com/net-services/dns/zones/${google_dns_managed_zone.integra_zone.name}/rrsets/list"
  }
}

output "project_info" {
  description = "Project and resource information"
  value = {
    project_id = var.project_id
    region = var.region
    zone = var.zone
    environment = var.environment
  }
}

output "security_headers_command" {
  description = "Command to set security headers on the bucket"
  value = "gsutil -m setmeta -h 'X-Frame-Options:DENY' -h 'X-Content-Type-Options:nosniff' -h 'X-XSS-Protection:1; mode=block' gs://${google_storage_bucket.integra_website.name}/**"
}

output "backup_command" {
  description = "Command to create a backup of the current deployment"
  value = "gsutil -m cp -r gs://${google_storage_bucket.integra_website.name} gs://${google_storage_bucket.integra_website.name}-backup-$(date +%Y%m%d-%H%M%S)"
}
