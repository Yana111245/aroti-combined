#!/bin/bash
# Batch update layout structure for remaining files

echo "Starting batch layout update..."

# Files that need PageWrapper updates
FILES=(
  "src/pages/booking/BookingHistory.tsx"
  "src/pages/profile/MessageThread.tsx"
  "src/pages/profile/SubscriptionPlans.tsx"
  "src/pages/profile/BillingPayment.tsx"
  "src/pages/profile/AstrologyDetail.tsx"
  "src/pages/profile/PrivacyData.tsx"
  "src/pages/profile/SpecialistMessages.tsx"
  "src/pages/profile/SettingsHome.tsx"
  "src/pages/profile/EditIdentity.tsx"
  "src/pages/profile/SavedLibrary.tsx"
  "src/pages/profile/SessionHistory.tsx"
  "src/pages/profile/NumerologyDetail.tsx"
)

echo "Files to update: ${#FILES[@]}"
echo "Note: This script provides a template. Manual review and updates are needed for each file."

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Checking $file..."
    # Check if already has PageWrapper
    if grep -q "PageWrapper" "$file"; then
      echo "  ✓ Already has PageWrapper"
    else
      echo "  ⚠ Needs PageWrapper"
    fi
  else
    echo "  ✗ File not found: $file"
  fi
done

echo "Done."

