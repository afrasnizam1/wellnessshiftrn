import { Platform, Share } from 'react-native';
import { format } from 'date-fns';
import type { WellnessReportSnapshot } from '../types';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderReportHtml(snapshot: WellnessReportSnapshot): string {
  const generated = format(new Date(snapshot.generatedAt), 'd MMM yyyy, HH:mm');
  const year = new Date(snapshot.generatedAt).getFullYear();

  const categoryRows = snapshot.categoryScores
    .map(
      (c) => `
      <tr>
        <td>${escapeHtml(c.label)}</td>
        <td align="right">${c.score.toFixed(1)}/10</td>
        <td>
          <div style="background:#e8e8e8;border-radius:4px;height:8px;">
            <div style="background:#2d8659;width:${Math.min(100, c.score * 10)}%;height:8px;border-radius:4px;"></div>
          </div>
        </td>
      </tr>`
    )
    .join('');

  const historyRows = snapshot.scoreHistory
    .slice(-14)
    .map(
      (s) => `
      <tr>
        <td>${escapeHtml(format(new Date(s.date), 'd MMM yyyy'))}</td>
        <td align="right">${s.overall.toFixed(1)}</td>
      </tr>`
    )
    .join('');

  const insightItems = snapshot.insightLines
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('');

  const activityBlock = snapshot.activityToday
    ? `<p><strong>Today's activity:</strong> ${snapshot.activityToday.steps.toLocaleString()} steps · ${snapshot.activityToday.calories} kcal · ${snapshot.activityToday.exerciseMinutes} min exercise</p>`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, Helvetica, Arial, sans-serif; color: #1a1a1a; padding: 32px; line-height: 1.5; }
    h1 { color: #2d8659; margin-bottom: 4px; font-size: 28px; }
    h2 { color: #333; font-size: 16px; margin-top: 28px; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
    .meta { color: #666; font-size: 13px; margin-bottom: 24px; }
    .score-hero { font-size: 36px; font-weight: 700; color: #2d8659; margin: 12px 0; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    td, th { padding: 8px 4px; border-bottom: 1px solid #eee; }
    th { text-align: left; color: #666; font-weight: 600; }
    ul { padding-left: 20px; }
    li { margin-bottom: 8px; font-size: 13px; }
    .disclaimer { margin-top: 32px; font-size: 11px; color: #888; font-style: italic; }
  </style>
</head>
<body>
  <h1>${escapeHtml(snapshot.reportTitle)}</h1>
  <div class="meta">${escapeHtml(snapshot.userName)} · ${year} · Generated ${generated}</div>

  <div class="score-hero">${snapshot.overallScore != null ? `${snapshot.overallScore.toFixed(1)}/10` : '—'}</div>
  <p>Overall wellness score</p>

  <h2>Category breakdown</h2>
  <table>
    <thead><tr><th>Category</th><th>Score</th><th></th></tr></thead>
    <tbody>${categoryRows}</tbody>
  </table>

  <h2>Strengths</h2>
  <ul>${snapshot.strengths.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>

  <h2>Areas for improvement</h2>
  <ul>${snapshot.areasForImprovement.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>

  ${snapshot.scoreHistory.length > 0 ? `
  <h2>Recent score history</h2>
  <table>
    <thead><tr><th>Date</th><th>Overall</th></tr></thead>
    <tbody>${historyRows}</tbody>
  </table>` : ''}

  <h2>Insights</h2>
  <ul>${insightItems}</ul>

  ${activityBlock}
  ${snapshot.checkInStreak > 0 ? `<p><strong>Check-in streak:</strong> ${snapshot.checkInStreak} days</p>` : ''}
  ${snapshot.dailyPlanCompletionRate != null ? `<p><strong>Plan completion (14d):</strong> ${snapshot.dailyPlanCompletionRate}%</p>` : ''}

  <p class="disclaimer">${escapeHtml(snapshot.disclaimer)}</p>
</body>
</html>`;
}

export async function exportWellnessReport(snapshot: WellnessReportSnapshot): Promise<void> {
  const html = renderReportHtml(snapshot);
  const fileName = `WellnessShift-Report-${format(new Date(), 'yyyy-MM-dd')}`;

  try {
    const RNPrint = require('react-native-print').default;
    const { uri } = await RNPrint.printToFile({ html, baseUrl: '' });

    try {
      const ShareLib = require('react-native-share').default;
      await ShareLib.open({
        url: Platform.OS === 'android' ? uri : uri,
        type: 'application/pdf',
        title: snapshot.reportTitle,
        subject: snapshot.reportTitle,
        failOnCancel: false,
      });
      return;
    } catch {
      await Share.share({
        url: uri,
        title: snapshot.reportTitle,
      });
      return;
    }
  } catch {
    // Fallback: share plain-text summary if PDF native module unavailable
    const text = [
      snapshot.reportTitle,
      `${snapshot.userName} · ${format(new Date(snapshot.generatedAt), 'd MMM yyyy')}`,
      '',
      `Overall score: ${snapshot.overallScore?.toFixed(1) ?? '—'}/10`,
      '',
      'Categories:',
      ...snapshot.categoryScores.map((c) => `  ${c.label}: ${c.score.toFixed(1)}/10`),
      '',
      'Insights:',
      ...snapshot.insightLines.map((l) => `  • ${l}`),
      '',
      snapshot.disclaimer,
    ].join('\n');

    await Share.share({
      message: text,
      title: fileName,
    });
  }
}
