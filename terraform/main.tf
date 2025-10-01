# Integra Web Interface - Google Cloud DNS Configuration
# This Terraform configuration sets up DNS for the Integra web interface deployment

terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

# Configure the Google Cloud Provider
provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

# Variables
variable "project_id" {
  description = "The Google Cloud Project ID"
  type        = string
}

variable "region" {
  description = "The Google Cloud region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "The Google Cloud zone"
  type        = string
  default     = "us-central1-a"
}

variable "domain_name" {
  description = "The domain name for the Integra interface"
  type        = string
  default     = "integra.example.com"
}

variable "dns_zone_name" {
  description = "The name of the DNS zone"
  type        = string
  default     = "integra-zone"
}

# Create a DNS managed zone
resource "google_dns_managed_zone" "integra_zone" {
  name        = var.dns_zone_name
  dns_name    = "${var.domain_name}."
  description = "DNS zone for Integra O/S web interface"

  dnssec_config {
    state = "on"
  }

  labels = {
    environment = "production"
    application = "integra-web-interface"
    managed_by  = "terraform"
  }
}

# Create a Cloud Storage bucket for static website hosting
resource "google_storage_bucket" "integra_website" {
  name          = "${var.project_id}-integra-website"
  location      = var.region
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }

  labels = {
    environment = "production"
    application = "integra-web-interface"
    managed_by  = "terraform"
  }
}

# Make the bucket publicly readable
resource "google_storage_bucket_iam_member" "integra_website_public" {
  bucket = google_storage_bucket.integra_website.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Create a global load balancer for the website
resource "google_compute_global_address" "integra_ip" {
  name = "integra-website-ip"
}

# Create a backend bucket for the load balancer
resource "google_compute_backend_bucket" "integra_backend" {
  name        = "integra-website-backend"
  bucket_name = google_storage_bucket.integra_website.name
  enable_cdn  = true
}

# Create a URL map for the load balancer
resource "google_compute_url_map" "integra_url_map" {
  name            = "integra-website-url-map"
  default_service = google_compute_backend_bucket.integra_backend.id

  host_rule {
    hosts        = [var.domain_name]
    path_matcher = "allpaths"
  }

  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_bucket.integra_backend.id
  }
}

# Create an HTTP proxy for the load balancer
resource "google_compute_target_http_proxy" "integra_http_proxy" {
  name    = "integra-website-http-proxy"
  url_map = google_compute_url_map.integra_url_map.id
}

# Create a global forwarding rule for HTTP traffic
resource "google_compute_global_forwarding_rule" "integra_http_forwarding_rule" {
  name       = "integra-website-http-forwarding-rule"
  target     = google_compute_target_http_proxy.integra_http_proxy.id
  port_range = "80"
  ip_address = google_compute_global_address.integra_ip.address
}

# Create SSL certificate (managed by Google)
resource "google_compute_managed_ssl_certificate" "integra_ssl_cert" {
  name = "integra-website-ssl-cert"

  managed {
    domains = [var.domain_name]
  }
}

# Create HTTPS proxy for the load balancer
resource "google_compute_target_https_proxy" "integra_https_proxy" {
  name             = "integra-website-https-proxy"
  url_map          = google_compute_url_map.integra_url_map.id
  ssl_certificates = [google_compute_managed_ssl_certificate.integra_ssl_cert.id]
}

# Create a global forwarding rule for HTTPS traffic
resource "google_compute_global_forwarding_rule" "integra_https_forwarding_rule" {
  name       = "integra-website-https-forwarding-rule"
  target     = google_compute_target_https_proxy.integra_https_proxy.id
  port_range = "443"
  ip_address = google_compute_global_address.integra_ip.address
}

# Create DNS A record pointing to the load balancer IP
resource "google_dns_record_set" "integra_a_record" {
  name         = var.domain_name
  managed_zone = google_dns_managed_zone.integra_zone.name
  type         = "A"
  ttl          = 300
  rrdatas      = [google_compute_global_address.integra_ip.address]
}

# Create DNS AAAA record for IPv6 (optional)
resource "google_dns_record_set" "integra_aaaa_record" {
  name         = var.domain_name
  managed_zone = google_dns_managed_zone.integra_zone.name
  type         = "AAAA"
  ttl          = 300
  rrdatas      = [google_compute_global_address.integra_ip.address]
}

# Create CNAME record for www subdomain
resource "google_dns_record_set" "integra_www_cname" {
  name         = "www.${var.domain_name}"
  managed_zone = google_dns_managed_zone.integra_zone.name
  type         = "CNAME"
  ttl          = 300
  rrdatas      = [var.domain_name]
}

# Outputs
output "website_url" {
  description = "The URL of the Integra website"
  value       = "https://${var.domain_name}"
}

output "load_balancer_ip" {
  description = "The IP address of the load balancer"
  value       = google_compute_global_address.integra_ip.address
}

output "bucket_name" {
  description = "The name of the Cloud Storage bucket"
  value       = google_storage_bucket.integra_website.name
}

output "dns_zone_name_servers" {
  description = "The name servers for the DNS zone"
  value       = google_dns_managed_zone.integra_zone.name_servers
}

output "ssl_certificate_status" {
  description = "The status of the SSL certificate"
  value       = google_compute_managed_ssl_certificate.integra_ssl_cert.managed[0].status
}
