#!/bin/bash
# Download script for extracted URLs
# Generated: 2025-08-08T10:49:19.447Z

set -e

# Create directories
mkdir -p sources/pdfs
mkdir -p sources/articles
mkdir -p sources/academic
mkdir -p sources/official

# Download function with error handling
download_file() {
  local url="$1"
  local output="$2"
  local type="$3"
  
  echo "Downloading: $url"
  if curl -L -o "$output" "$url" --fail --silent --show-error; then
    echo "  ✓ Success: $output"
  else
    echo "  ✗ Failed: $url" >> sources/download-errors.log
  fi
}

echo "Starting downloads..."
echo "Errors will be logged to sources/download-errors.log"
echo "" > sources/download-errors.log

download_file "https://crsreports.congress.gov/product/pdf/IF/IF12398" "sources/pdfs/pdf_1.pdf" "pdf"
download_file "https://highseasalliance.org/wp-content/uploads/2025/04/PrepCom-Deep-Dive-CIHM-April-2025-1.pdf" "sources/pdfs/pdf_2.pdf" "pdf"
download_file "https://iucn.org/sites/default/files/2024-01/iucn-bbnj-treaty-policy-brief.pdf" "sources/pdfs/pdf_3.pdf" "pdf"
download_file "https://www.isa.org.jm/wp-content/uploads/2024/06/The_contribution_of_ISA_to_the_BBNJ_objectives.pdf" "sources/pdfs/pdf_4.pdf" "pdf"
download_file "https://www.isa.org.jm/wp-content/uploads/2024/06/The\_contribution\_of\_ISA\_to\_the\_BBNJ\_objectives.pdf" "sources/pdfs/pdf_5.pdf" "pdf"
download_file "https://www.pewtrusts.org/-/media/assets/2023/06/inside-the-new-high-seas-treaty.pdf" "sources/pdfs/pdf_6.pdf" "pdf"
