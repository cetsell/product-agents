# Field-by-Field, Mobile, and Post-Submit Checklist

Load when auditing individual fields, the mobile form, or what happens after submit.

## Field-by-Field Optimization

### Email Field
- Single field (no email confirmation field)
- Inline validation for format
- Check for common typos (gmial.com → gmail.com)
- Clear error messages

### Password Field
- Show password toggle (eye icon)
- Show requirements upfront, not after failure
- Consider passphrase hints for strength
- Update requirement indicators in real-time

**Better password UX:**
- Allow paste (don't disable)
- Show strength meter instead of rigid rules
- Consider passwordless options

### Name Field
- Single "Full name" field vs. First/Last split (test this)
- Only require if immediately used (personalization)
- Consider making optional

### Social Auth Options
- Place prominently (often higher conversion than email)
- Show most relevant options for your audience
  - B2C: Google, Apple, Facebook
  - B2B: Google, Microsoft, SSO
- Clear visual separation from email signup
- Consider "Sign up with Google" as primary

### Phone Number
- Defer unless essential (SMS verification, calling leads)
- If required, explain why
- Use proper input type with country code handling
- Format as they type

### Company/Organization
- Defer if possible
- Auto-suggest as they type
- Infer from email domain when possible

### Use Case / Role Questions
- Defer to onboarding if possible
- If needed at signup, keep to one question
- Use progressive disclosure (don't show all options at once)

---

## Mobile Signup Optimization

- Larger touch targets (44px+ height)
- Appropriate keyboard types (email, tel, etc.)
- Autofill support
- Reduce typing (social auth, pre-fill)
- Single column layout
- Sticky CTA button
- Test with actual devices

---

## Post-Submit Experience

### Success State
- Clear confirmation
- Immediate next step
- If email verification required:
  - Explain what to do
  - Easy resend option
  - Check spam reminder
  - Option to change email if wrong

### Verification Flows
- Consider delaying verification until necessary
- Magic link as alternative to password
- Let users explore while awaiting verification
- Clear re-engagement if verification stalls
