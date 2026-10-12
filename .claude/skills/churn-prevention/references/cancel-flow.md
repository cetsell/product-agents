# Cancel Flow Detail

Structure, exit survey design, save offer types, and UI patterns for a voluntary-churn cancel flow. The offer-to-reason mapping (the decision rule) lives in SKILL.md; this file is the build detail behind it. Post-cancel win-back emails are drafted with `/email-sequence`.

## The Cancel Flow Structure

Every cancel flow follows this sequence:

```
Trigger → Survey → Dynamic Offer → Confirmation → Post-Cancel
```

**Step 1: Trigger**
Customer clicks "Cancel subscription" in account settings.

**Step 2: Exit Survey**
Ask why they're cancelling. This determines which save offer to show.

**Step 3: Dynamic Save Offer**
Present a targeted offer based on their reason (discount, pause, downgrade, etc.)

**Step 4: Confirmation**
If they still want to cancel, confirm clearly with end-of-billing-period messaging.

**Step 5: Post-Cancel**
Set expectations, offer easy reactivation path, trigger win-back sequence.

## Exit Survey Design

The exit survey is the foundation. Good reason categories:

| Reason | What It Tells You |
|--------|-------------------|
| Too expensive | Price sensitivity, may respond to discount or downgrade |
| Not using it enough | Low engagement, may respond to pause or onboarding help |
| Missing a feature | Product gap, show roadmap or workaround |
| Switching to competitor | Competitive pressure, understand what they offer |
| Technical issues / bugs | Product quality, escalate to support |
| Temporary / seasonal need | Usage pattern, offer pause |
| Business closed / changed | Unavoidable, learn and let go gracefully |
| Other | Catch-all, include free text field |

**Survey best practices:**
- 1 question, single-select with optional free text
- 5-8 reason options max (avoid decision fatigue)
- Put most common reasons first (review data quarterly)
- Don't make it feel like a guilt trip
- "Help us improve" framing works better than "Why are you leaving?"

## Save Offer Types

**Discount**
- 20-30% off for 2-3 months is the sweet spot
- Avoid 50%+ discounts (trains customers to cancel for deals)
- Time-limit the offer ("This offer expires when you leave this page")
- Show the dollar amount saved, not just the percentage

**Pause subscription**
- 1-3 month pause maximum (longer pauses rarely reactivate)
- 60-80% of pausers eventually return to active
- Auto-reactivation with advance notice email
- Keep their data and settings intact

**Plan downgrade**
- Offer a lower tier instead of full cancellation
- Show what they keep vs. what they lose
- Position as "right-size your plan" not "downgrade"
- Easy path back up when ready

**Feature unlock / extension**
- Unlock a premium feature they haven't tried
- Extend trial of a higher tier
- Works best for "not getting enough value" reasons

**Personal outreach**
- For high-value accounts (top 10-20% by MRR)
- Route to customer success for a call
- Personal email from founder for smaller companies

## Cancel Flow UI Patterns

```
┌─────────────────────────────────────┐
│  We're sorry to see you go          │
│                                     │
│  What's the main reason you're      │
│  cancelling?                        │
│                                     │
│  ○ Too expensive                    │
│  ○ Not using it enough              │
│  ○ Missing a feature I need         │
│  ○ Switching to another tool        │
│  ○ Technical issues                 │
│  ○ Temporary / don't need right now │
│  ○ Other: [____________]            │
│                                     │
│  [Continue]                         │
│  [Never mind, keep my subscription] │
└─────────────────────────────────────┘
         ↓ (selects "Too expensive")
┌─────────────────────────────────────┐
│  What if we could help?             │
│                                     │
│  We'd love to keep you. Here's a    │
│  special offer:                     │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  25% off for the next 3 months│  │
│  │  Save $XX/month               │  │
│  │                               │  │
│  │  [Accept Offer]               │  │
│  └───────────────────────────────┘  │
│                                     │
│  Or switch to [Basic Plan] at       │
│  $X/month →                         │
│                                     │
│  [No thanks, continue cancelling]   │
└─────────────────────────────────────┘
```

**UI principles:**
- Keep the "continue cancelling" option visible (no dark patterns)
- One primary offer + one fallback, not a wall of options
- Show specific dollar savings, not abstract percentages
- Use the customer's name and account data when possible
- Mobile-friendly (many cancellations happen on mobile)
