# Google Cloud DNS Configuration for integra-os.com

# GitHub Pages Custom Domain Setup

## Quick Reference DNS Records

### A Records (Required for Apex Domain)

```
Name: @
Type: A
TTL: 3600
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

### AAAA Records (IPv6 Support - Recommended)

```
Name: @
Type: AAAA
TTL: 3600
Values:
  2606:50c0:8000::153
  2606:50c0:8001::153
  2606:50c0:8002::153
  2606:50c0:8003::153
```

### CNAME Record (www subdomain)

```
Name: www
Type: CNAME
TTL: 3600
Value: YOUR_USERNAME.github.io
```

## Google Cloud Console Commands

### Using gcloud CLI

```bash
# Set your project
gcloud config set project YOUR_PROJECT_ID

# Add A records
gcloud dns record-sets create integra-os.com. --zone=YOUR_ZONE_NAME --type=A --ttl=3600 --rrdatas=185.199.108.153,185.199.109.153,185.199.110.153,185.199.111.153

# Add AAAA records
gcloud dns record-sets create integra-os.com. --zone=YOUR_ZONE_NAME --type=AAAA --ttl=3600 --rrdatas=2606:50c0:8000::153,2606:50c0:8001::153,2606:50c0:8002::153,2606:50c0:8003::153

# Add CNAME for www
gcloud dns record-sets create www.integra-os.com. --zone=YOUR_ZONE_NAME --type=CNAME --ttl=3600 --rrdatas=YOUR_USERNAME.github.io.
```

## Verification Commands

### Check A Records

```powershell
nslookup integra-os.com 8.8.8.8
# Should return GitHub Pages IPs
```

### Check CNAME

```powershell
nslookup www.integra-os.com 8.8.8.8
# Should point to YOUR_USERNAME.github.io
```

### Check Domain Verification TXT

```powershell
nslookup -type=TXT _github-pages-challenge-YOUR_USERNAME.integra-os.com 8.8.8.8
# Should return GitHub verification code
```

## Troubleshooting

### Common Issues

1. **DNS not propagating**: Wait 24-48 hours
2. **HTTPS not working**: Ensure all DNS records are correct
3. **Domain verification failing**: Check TXT record format
4. **Site not loading**: Verify GitHub Pages is enabled

### DNS Propagation Check

- Use <https://dnschecker.org/>
- Check from multiple global locations
- Verify both A and CNAME records

## Security Notes

- Domain verification prevents takeover attacks
- HTTPS certificate auto-issues via Let's Encrypt
- Keep DNS records minimal (remove unused records)
- Monitor certificate renewal (auto-handles by GitHub)
