# Deploy Roleplay Function to Supabase

## Prerequisites

1. Supabase CLI installed (already confirmed)
2. Access token for Supabase
3. API keys already set in Supabase secrets (confirmed by user)

## Deployment Steps

### Option 1: Using Supabase CLI with Access Token

1. Get your Supabase access token from: https://app.supabase.com/account/tokens

2. Set the access token:
   ```bash
   export SUPABASE_ACCESS_TOKEN=your-access-token-here
   ```

3. Deploy the function:
   ```bash
   supabase functions deploy roleplay-response \
     --project-ref pvstwthufbertinmojuk \
     --no-verify-jwt
   ```

### Option 2: Using Supabase Dashboard

1. Go to: https://app.supabase.com/project/pvstwthufbertinmojuk/functions

2. Click "Deploy a new function"

3. Name: `roleplay-response`

4. Copy the content from `supabase/functions/roleplay-response/index.ts`

5. Save and deploy

### Option 3: Direct Deployment Command

If you're already logged in to Supabase CLI:

```bash
# Link the project first
supabase link --project-ref pvstwthufbertinmojuk

# Deploy the function
supabase functions deploy roleplay-response --no-verify-jwt
```

## Testing the Deployment

After deployment, test with:

```bash
./test-roleplay-api.sh
```

Or manually:

```bash
curl -X POST https://pvstwthufbertinmojuk.supabase.co/functions/v1/roleplay-response \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c3R3dGh1ZmJlcnRpbm1vanVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTI2NDQsImV4cCI6MjA2MjY2ODY0NH0.PG7BJeWuYe-piU_JatbBfauK-I3d9sVh-2fJypAZHS8" \
  -d '{"transcript": "Hello officer"}'
```

## Expected Response

```json
{
  "success": true,
  "replyText": "Good afternoon. License, registration, and insurance please.",
  "ttsAudioUrl": "data:audio/mpeg;base64,..."
}
```

## Troubleshooting

If you get a 404 error:
- The function hasn't been deployed yet
- Use one of the deployment options above

If you get a 500 error about missing API keys:
- Ensure OPENAI_API_KEY and ELEVENLABS_API_KEY are set in Supabase secrets
- Go to: https://app.supabase.com/project/pvstwthufbertinmojuk/settings/vault 