# Billing and Win-Back Emails

Lifecycle email types that protect and recover revenue: annual switch, failed payment recovery (dunning), cancellation survey, renewal reminders, expired trials, and cancelled customers. For the cancel flow, save offers, and retry logic behind these emails, use `/churn-prevention`.

## Billing Emails

### Switch to Annual
**Trigger**: Monthly subscriber at renewal time or campaign
**Goal**: Convert monthly to annual (improve LTV, reduce churn)
**Format**: Single email or 2-email sequence

**Value proposition**:
- Calculate exact savings
- Additional benefits (if any)
- Lock in current price messaging
- Easy one-click switch

**Best timing**:
- Around monthly renewal date
- End of year / new year
- After 3-6 months of loyalty
- Price increase announcement (lock in old rate)

---

### Failed Payment Recovery
**Trigger**: Payment fails
**Goal**: Recover revenue, retain customer
**Typical sequence**: 3-4 emails over 7-14 days

**Sequence structure**:
- Email 1 (Day 0): Friendly notice, update payment link
- Email 2 (Day 3): Reminder, service may be interrupted
- Email 3 (Day 7): Urgent, account will be suspended
- Email 4 (Day 10-14): Final notice, what they'll lose

**Copy approach**:
- Assume it's an accident (card expired, etc.)
- Clear, direct, no guilt
- Single CTA to update payment
- Explain what happens if not resolved

**Key metrics**: Recovery rate, time to recovery

---

### Cancellation Survey
**Trigger**: User cancels subscription
**Goal**: Learn why, opportunity to save
**Format**: Single email (immediate)

**Options**:
- In-app survey at cancellation (better completion)
- Follow-up email if they skip in-app
- Personal outreach for high-value accounts

**Questions to ask**:
- Primary reason for cancelling
- What could we have done better
- Would anything change your mind
- Can we help with transition

**Winback opportunity**: Based on reason, offer targeted save (discount, pause, downgrade, training).

---

### Upcoming Renewal Reminder
**Trigger**: X days before renewal (14 or 30 days typical)
**Goal**: No surprise charges, opportunity to expand
**Format**: Single email

**What to include**:
- Renewal date and amount
- What's included in renewal
- How to update payment/plan
- Changes to pricing/features (if any)
- Optional: Upsell opportunity

**Required for**: Annual subscriptions, high-value contracts

---

## Win-Back Emails

### Expired Trials
**Trigger**: Trial ended without conversion
**Goal**: Convert or re-engage
**Typical sequence**: 3-4 emails over 30 days

**Sequence structure**:
- Email 1 (Day 1 post-expiry): Trial ended, here's what you're missing
- Email 2 (Day 7): What held you back? (gather feedback)
- Email 3 (Day 14): Incentive offer (discount, extended trial)
- Email 4 (Day 30): Final reach-out, door is open

**Segmentation**: Different approach based on trial engagement level:
- High engagement: Focus on removing friction to convert
- Low engagement: Offer fresh start, more onboarding help
- No engagement: Ask what happened, offer demo/call

---

### Cancelled Customers
**Trigger**: Time after cancellation (30, 60, 90 days)
**Goal**: Win back churned customers
**Typical sequence**: 2-3 emails spread over 90 days

**Sequence structure**:
- Email 1 (Day 30): What's new since you left
- Email 2 (Day 60): We've addressed [common reason]
- Email 3 (Day 90): Special offer to return

**Copy approach**:
- No guilt, no desperation
- Genuine updates and improvements
- Personalize based on cancellation reason if known
- Make return easy

**Key point**: They're more likely to return if their reason was addressed.
