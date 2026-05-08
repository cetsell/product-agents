# Campaign/Initiative Weekly Review

*Skill Type: Initiative-specific PM workflow*
*Cadence: Weekly (recommended Thursday or Friday)*
*Time: 30 minutes*

---

## Core Workflow

### 1. Query Linear for Initiative Issues (10 min)

**Objective:** Get current state of all projects under the initiative

**Actions:**
- Query all issues for each project in scope
- Filter by status: Done (last 7 days), In Progress, Blocked
- Group by team (Product, GTM, Engineering, etc.)
- Identify issues with approaching due dates (next 7 days)

**Output:** Raw data on velocity, blockers, team activity

### 2. Analyze Cross-Functional Progress (10 min)

**Objective:** Assess progress against launch readiness

**Critical Path Analysis:** *(customize for your initiative)*
- **[Deliverable 1]** - Is it on track for [target date]?
- **[Deliverable 2]** - Are dependencies resolved?
- **[Deliverable 3]** - Any blockers or risks?

**Cross-Team Dependencies:**
- [Team A] → [Team B] ([handoff description])
- [Team B] → [Team C] ([handoff description])

**Identify:**
- ✅ On-track items (green)
- ⚠️ At-risk items (yellow - approaching due date or blocked)
- 🚨 Blocked items (red - hard blocker, escalation needed)

### 3. Generate Weekly Initiative Dashboard (10 min)

**Objective:** Create versioned dashboard showing week-over-week progress

**Dashboard Sections:**
1. **Launch Countdown** - Days to launch, overall readiness %
2. **This Week's Velocity** - Issues completed by project/team
3. **Critical Path Status** - Make-or-break items and their status
4. **Cross-Functional Dependencies** - What's blocking what
5. **Risk Register** - Active risks and mitigation status
6. **Next Week Preview** - What needs to happen next week

**File Location:** `pm-workflows/initiatives/[initiative-name]/dashboards/week-XX-YYYY-MM-DD.md`

---

## Managing Up: Cross-Functional Accountability Signals

**What Leadership Needs to See:**

1. ✅ **Transparency** - No surprises, all blockers visible early
2. ✅ **Velocity** - Teams shipping consistently toward launch date
3. ✅ **Coordination** - Dependencies mapped and managed
4. ✅ **Escalation** - Critical blockers flagged immediately
5. ✅ **Confidence** - Data-driven view of launch readiness

**Cross-Functional Accountability Questions:**

**If leadership asks "Are we on track?"**
→ "Overall readiness: X%. Critical path: [items]. Blockers: [list]. Mitigation: [actions]. Confidence: [High/Medium/Low] based on velocity and dependencies."

**If engineering lead asks "What's blocking us?"**
→ "Engineering blocked by: [list]. Blocking others: [list]. This week's critical handoffs: [describe them]."

**If GTM lead asks "What do you need from GTM?"**
→ "GTM critical path: [items]. Blocking: [dependencies]. This week must-haves: [specific deliverables with dates]."

**If cross-functional conflict arises:**
→ "Here's the data: [velocity, dependencies, critical path]. Based on ICE scoring and launch deadline, priority is: [recommendation]. Trade-off: [what we gain vs lose]."

---

## Linear Queries Reference

### Query 1: Initiative Issues (Last 7 Days Completed)
```
mcp__linear__list_issues
- project: "[Your initiative project name]"
- state: "Done"
- updatedAt: "-P7D"
- limit: 100
```

### Query 2: Initiative Issues (In Progress)
```
mcp__linear__list_issues
- project: "[Your initiative project name]"
- state: "In Progress"
- limit: 100
```

---

## Critical Path Checklist

*Customize this for your initiative. These are the make-or-break items.*

### Technical Readiness
- [ ] [Technical requirement 1] - CRITICAL
- [ ] [Technical requirement 2]
- [ ] [Technical requirement 3]

### GTM Readiness
- [ ] [GTM requirement 1]
- [ ] [GTM requirement 2]

### Cross-Functional
- [ ] [Handoff 1: Team A → Team B]
- [ ] [Handoff 2: Team B → Team C]

---

## Risk Categories

### 🚨 P0: Launch Blocker (Escalate Immediately)
- Would prevent launch entirely
- No workaround exists
- Requires leadership intervention

### ⚠️ P1: Launch Quality Risk (Escalate This Week)
- Would degrade launch quality significantly
- Workaround exists but suboptimal
- Requires cross-functional coordination

### 🟡 P2: Post-Launch Risk (Monitor)
- Affects post-launch operations
- Can be addressed after launch
- Team-level resolution

---

## Dashboard Template

```markdown
# [Initiative Name] - Week X Dashboard
*Week of [Mon] – [Fri], [Year]*

## 🚀 Launch Countdown
- **Days to Launch:** XX days ([launch date])
- **Overall Readiness:** XX% (based on critical path completion)
- **Confidence Level:** [High/Medium/Low]

## 📊 This Week's Velocity
| Project | Done | In Progress | Blocked |
|---------|------|-------------|---------|
| [Project 1] | X | X | X |
| [Project 2] | X | X | X |
| **TOTAL** | **XX** | **XX** | **XX** |

## 🎯 Critical Path Status
1. [Item] - Status: [✅/⚠️/🚨] - Owner: [Name] - Due: [Date]
2. [Item] - Status: [✅/⚠️/🚨] - Owner: [Name] - Due: [Date]

## 🔗 Cross-Functional Dependencies
**This Week's Critical Handoffs:**
- [Team A] → [Team B]: [handoff item]

**What's Blocking What:**
- [Team A waiting on Team B for X]

## 🚨 Risk Register
| Risk | Impact | Status | Owner | Mitigation |
|------|--------|--------|-------|------------|
| [Risk] | [P0/P1/P2] | [Active/Mitigated] | [Name] | [Action] |

## 🔮 Next Week Must-Haves
- [ ] [Deliverable] - Owner: [Name] - Due: [Date]

## 📈 Trends (Week-over-Week)
- Velocity: [↑/↓/→] XX issues vs XX last week
- Blockers: [↑/↓/→] X active vs X last week
```

---

## Usage Notes

**When to Run:**
- **Thursday:** After Bet Sync, before week ends (good for planning next week)
- **Friday:** End-of-week snapshot (good for stakeholder updates)

**Who Should Review:**
- PM team generates
- Leadership reviews for executive view
- Engineering and GTM leads review for cross-functional coordination

**How Often:**
- **Weekly minimum** for dashboard versioning
- **As needed** when blockers surface or critical decisions needed

---

*This skill provides cross-functional accountability for major initiatives, ensuring launch dates stay on track with transparency and early escalation of risks.*
