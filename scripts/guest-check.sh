#!/usr/bin/env bash
# Checks what an anonymous visitor is allowed to do with the guestbook API.
#
# It gets temporary guest credentials from the Cognito identity pool (exactly
# what a visitor's browser does), signs GraphQL requests with them, and tries
# to read, update and delete paws. Update and delete target an id that does not
# exist, so nothing in the table changes whatever the result.
#
# Needs: amplify_outputs.json (written by the backend deploy), the AWS CLI,
# node, and curl 7.75 or newer (for --aws-sigv4).
# Run from the project root:  bash scripts/guest-check.sh
set -euo pipefail

POOL=$(node -p "require('./amplify_outputs.json').auth.identity_pool_id")
REGION=$(node -p "require('./amplify_outputs.json').data.aws_region")
API=$(node -p "require('./amplify_outputs.json').data.url")

echo "Identity pool: $POOL"
echo "Getting guest credentials, with no AWS login, like a visitor..."
# tr strips the carriage return the AWS CLI adds on Windows; it would break the signature.
ID=$(aws cognito-identity get-id --identity-pool-id "$POOL" --region "$REGION" --no-sign-request \
  --query IdentityId --output text | tr -d '\r')
read -r AK SK ST < <(aws cognito-identity get-credentials-for-identity --identity-id "$ID" --region "$REGION" \
  --no-sign-request --query "Credentials.[AccessKeyId,SecretKey,SessionToken]" --output text | tr -d '\r')
echo "Got temporary credentials for a guest identity."
echo

ask() {
  curl -s -m 20 --aws-sigv4 "aws:amz:$REGION:appsync" --user "$AK:$SK" \
    -H "x-amz-security-token: $ST" -H "content-type: application/json" -d "$1" "$API"
  echo
}

echo "1) Read the paws (allowed):"
ask '{"query":"query { listPawPrints(limit: 5) { items { message costume } } }"}'
echo
echo "2) Update a paw (should be refused):"
ask '{"query":"mutation { updatePawPrint(input: {id: \"guest-check-no-such-paw\", message: \"edited\"}) { id } }"}'
echo
echo "3) Delete a paw (should be refused):"
ask '{"query":"mutation { deletePawPrint(input: {id: \"guest-check-no-such-paw\"}) { id } }"}'
