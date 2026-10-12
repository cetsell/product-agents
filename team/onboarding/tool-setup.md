# Tool Setup

How to set up the tools your team uses. Update this file with your actual workspace URLs and access contacts.

## Required for Everyone

### Linear (or your issue tracker)
- **What**: Project management — issues, sprints, roadmap
- **Access**: Request invite from team lead
- **URL**: <!-- add Linear workspace URL -->

### Slack
- **What**: Team communication
- **Access**: Request invite from team lead

### Google Workspace
- **What**: Docs, Sheets, Drive, Calendar
- **Access**: Request from team lead

### Notion
- **What**: Wiki, reference docs
- **Access**: Request invite from team lead
- **URL**: <!-- add Notion URL -->

## For Engineering

### GitHub
- **Org**: <!-- add GitHub org name -->
- **Access**: Request from Engineering Lead

### Development Environment
- See the main dev repo README for local setup instructions

## For Data/Analytics

### BigQuery
- **Project**: <!-- add dataset names — see `product/analytics/bigquery-reference.md` -->
- **Access**: Request from Analytics owner
- **Reference**: `product/analytics/bigquery-reference.md`

### Analytics Tool (Mixpanel / Amplitude / etc.)
- **Access**: Request from Analytics owner
- **URL**: <!-- add URL -->

## For AI-Assisted Workflows

### Claude Code
- **What**: AI coding assistant with access to team context
- **Install**: `npm install -g @anthropic-ai/claude-code`
- **Setup**: Clone `product-agents` repo, open in Claude Code — `CLAUDE.md` files provide context automatically
- **Skills**: Type `/skill-name` (e.g., `/data-analyst`, `/strategy`) for specialized PM tools
