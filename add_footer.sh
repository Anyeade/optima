#!/bin/bash

# List of pages that need footer
pages=(
  "src/app/auth/page.tsx"
  "src/app/blog/page.tsx"
  "src/app/careers/page.tsx"
  "src/app/contact/page.tsx"
  "src/app/dashboard/page.tsx"
  "src/app/privacy/page.tsx"
  "src/app/status/page.tsx"
  "src/app/support/page.tsx"
)

for page in "${pages[@]}"; do
  echo "Adding footer to $page"
  
  # Add Footer import after Navigation import
  sed -i "/import.*Navigation/a import { Footer } from '@/components/Footer'" "$page"
  
  # Add Footer component before closing div and }
  sed -i '/^    <\/div>$/i\      <Footer />\n' "$page"
done

echo "Footer added to all pages!"
