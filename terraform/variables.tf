# Integra Web Interface - Terraform Variables
# Configuration variables for Google Cloud DNS and hosting setup

variable "project_id" {
  description = "The Google Cloud Project ID where resources will be created"
  type        = string
  validation {
    condition     = length(var.project_id) > 0
    error_message = "Project ID must not be empty."
  }
}

variable "region" {
  description = "The Google Cloud region for resource deployment"
  type        = string
  default     = "us-central1"
  validation {
    condition = contains([
      "us-central1", "us-east1", "us-west1", "us-west2",
      "europe-west1", "europe-west2", "europe-west3",
      "asia-east1", "asia-southeast1", "asia-northeast1"
    ], var.region)
    error_message = "Region must be a valid Google Cloud region."
  }
}

variable "zone" {
  description = "The Google Cloud zone for resource deployment"
  type        = string
  default     = "us-central1-a"
}

variable "domain_name" {
  description = "The fully qualified domain name for the Integra interface (e.g., integra.yourdomain.com)"
  type        = string
  validation {
    condition     = can(regex("^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\\.[a-zA-Z]{2,}$", var.domain_name))
    error_message = "Domain name must be a valid FQDN."
  }
}

variable "dns_zone_name" {
  description = "The name of the DNS managed zone (must be unique within the project)"
  type        = string
  default     = "integra-zone"
  validation {
    condition     = can(regex("^[a-z][a-z0-9-]*[a-z0-9]$", var.dns_zone_name))
    error_message = "DNS zone name must start with a letter, contain only lowercase letters, numbers, and hyphens, and end with a letter or number."
  }
}

variable "environment" {
  description = "The deployment environment (dev, staging, production)"
  type        = string
  default     = "production"
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be one of: dev, staging, production."
  }
}

variable "enable_cdn" {
  description = "Enable Cloud CDN for the backend bucket"
  type        = bool
  default     = true
}

variable "enable_ssl" {
  description = "Enable SSL/TLS with managed certificates"
  type        = bool
  default     = true
}

variable "bucket_location" {
  description = "The location for the Cloud Storage bucket (can be region or multi-region)"
  type        = string
  default     = "US"
  validation {
    condition = contains([
      "US", "EU", "ASIA",
      "us-central1", "us-east1", "us-west1", "us-west2",
      "europe-west1", "europe-west2", "europe-west3",
      "asia-east1", "asia-southeast1", "asia-northeast1"
    ], var.bucket_location)
    error_message = "Bucket location must be a valid Google Cloud Storage location."
  }
}

variable "dns_ttl" {
  description = "TTL (Time To Live) for DNS records in seconds"
  type        = number
  default     = 300
  validation {
    condition     = var.dns_ttl >= 60 && var.dns_ttl <= 86400
    error_message = "DNS TTL must be between 60 and 86400 seconds."
  }
}

variable "cors_max_age" {
  description = "Maximum age for CORS preflight requests in seconds"
  type        = number
  default     = 3600
}

variable "force_destroy_bucket" {
  description = "Allow Terraform to destroy the bucket even if it contains objects"
  type        = bool
  default     = false
}

variable "labels" {
  description = "Labels to apply to all resources"
  type        = map(string)
  default = {
    application = "integra-web-interface"
    managed_by  = "terraform"
    team        = "integra-development"
  }
}

variable "allowed_cors_origins" {
  description = "List of allowed CORS origins"
  type        = list(string)
  default     = ["*"]
}

variable "allowed_cors_methods" {
  description = "List of allowed CORS methods"
  type        = list(string)
  default     = ["GET", "HEAD", "PUT", "POST", "DELETE"]
}

variable "backup_retention_days" {
  description = "Number of days to retain backups"
  type        = number
  default     = 30
  validation {
    condition     = var.backup_retention_days >= 1 && var.backup_retention_days <= 365
    error_message = "Backup retention days must be between 1 and 365."
  }
}
