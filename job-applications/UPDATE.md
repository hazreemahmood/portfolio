# Application dashboard updates

The scheduled task reads Gmail through the connected Gmail plugin, updates `data.json`, runs `node job-applications/build.mjs`, then commits and pushes only dashboard files to `main`. The existing GitHub Actions pipeline deploys the site. No Gmail credentials belong in this repository.

Schedule: check at the start of each hour on this Mac; complete at most one successful Gmail review per Asia/Kuala_Lumpur calendar day. After fetching safely, skip Gmail and rebuilding when `checkedOn` is today and that update is already pushed and deployed. If publication is pending, finish it instead of repeating the Gmail review. Failed reviews may retry on the next hourly check. The local machine must be awake, online, with the app running and the Gmail plugin connected.

## Data rules

- Count distinct company/role applications with submission evidence from `periodStart` onward. Deduplicate multiple receipts and platform notifications for the same application. Different roles at one company count separately.
- Preserve stable application IDs. Use Malaysia-local dates. `checkedOn` is the date of the last successfully completed Gmail review, not the date of a failed attempt.
- Read actual messages, not just search snippets. Separate automated acknowledgement from subsequent response. Job advertisements, general candidate registrations, candidate-experience surveys, and unrelated emails are excluded.
- `silent`: receipt only. `likely`: explicit employer no-response deadline has passed, without a separate rejection. `progress`: screening/assessment/interview or additional step, no final decision. `rejected`: explicit rejection. `portal`: employer-message notification, with the actual content unavailable. `offer`: explicit offer. `withdrawn`: explicit applicant withdrawal.
- `hadNextStep` records whether the application ever reached screening, assessment, interview, or an additional requested form. It stays true after a later rejection.
- `note` is a concise factual summary. `appliedOn` requires submission evidence. Do not infer rejection from silence alone, or assign an ambiguous email to a similarly named role. Report unresolved matches in the scheduled task's result.
- Preserve the existing 31 applications and counts unless new evidence justifies a change. EverestEngineering and AirAsia Software Engineer I have older submission dates and are outside the starting submission-period group. PERSOL's August general form does not establish progress for September's Team Lead application.
- Store only the concise application metadata and Gmail source links needed for this dashboard. Never commit raw emails, attachments, OAuth tokens, passwords, or credentials. These dashboard files are deployed to the user's portfolio.

## Each run

1. Check repository status. Fetch `origin/main` and fast-forward only when clean. Never discard local edits, force push, or stage unrelated files.
2. Read `data.json`. Search incoming Gmail from seven days before `checkedOn` through today, covering applications, receipts, interviews, screening, assessments, status updates, offers, rejections, and employer messages. Page through all results. Exclude ads and newsletters after interpretation, rather than treating Gmail category labels as definitive. Check pending employers when needed. Read messages and thread context before updating a role.
3. Match later responses to existing roles; add new roles only with submission evidence within the reporting period. Keep counts at the application level. Refresh up to three actionable `followUps` with Gmail links. If Gmail cannot be read, preserve the previous data and report the failure; never publish an empty or falsely fresh dashboard.
4. Update `checkedOn` only after the review completes. Run `node job-applications/build.mjs` and `node --check job-applications/app.js`. Review the generated diff and ensure charts, filters, and counts agree.
5. Stage only intended files inside `job-applications/`, commit with a descriptive message, and push `main` to `origin/main`. Skip an empty commit. On divergence or unrelated changes, stop the push and report what needs attention.
6. Check the resulting GitHub Actions run and verify its deployment result. Do not claim deployment success from push success alone. If credentials or pipeline access are unavailable, report the precise pending step.

## Manual build

Run from the repository root:

```sh
node job-applications/build.mjs
node --check job-applications/app.js
```

Edit `template.html` for layout, `app.js` for filters/export, and `data.json` for application evidence. `index.html` is generated and includes the dataset so it also works from disk.
