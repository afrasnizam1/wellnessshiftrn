import { HEALTH_CONDITIONS, type HealthCondition, type ConditionContent } from './healthConditions';
import { CONDITION_CONTENT } from './conditionContent';

function buildConditionContent(condition: HealthCondition): ConditionContent {
  return {
    overview: `${condition.description} It affects approximately ${condition.prevalence} of the population. ${condition.lifestyleImpact}`,
    symptoms: condition.keySymptoms.map((name, i) => ({
      name,
      description: `A common symptom of ${condition.name.toLowerCase()} — discuss severity and duration with your healthcare provider.`,
      severity: (i === 0 ? 'moderate' : 'mild') as 'mild' | 'moderate' | 'severe',
    })),
    causes: condition.riskFactors.map((factor) => ({
      type: 'Risk factor',
      description: factor,
    })),
    diagnosis: [
      { test: 'Clinical assessment', description: `Your GP or specialist will evaluate symptoms, history, and examination findings relevant to ${condition.name}.` },
      { test: 'Investigations', description: 'Blood tests, imaging, or referrals may be needed depending on presentation — follow your clinician\'s guidance.' },
    ],
    treatment: condition.managementStrategies.map((strategy) => ({
      category: 'lifestyle' as const,
      name: strategy,
      description: `An evidence-supported approach for managing ${condition.name.toLowerCase()} — often combined with medical treatment.`,
      effectiveness: 'Moderate to High',
    })),
    lifestyle: [
      {
        area: 'Daily management',
        recommendations: condition.managementStrategies,
        benefits: condition.lifestyleImpact,
      },
      {
        area: 'Prevention',
        recommendations: condition.riskFactors.slice(0, 3).map((r) => `Address: ${r}`),
        benefits: 'Reducing modifiable risk factors improves long-term outcomes.',
      },
    ],
    complications: condition.relatedConditions.map((related) => ({
      name: related.replace(/-/g, ' '),
      description: `May co-occur with or be influenced by ${condition.name.toLowerCase()}.`,
      prevention: 'Regular monitoring, adherence to treatment, and lifestyle support reduce complication risk.',
    })),
    resources: [
      { type: 'article' as const, title: `${condition.name} — NHS guidance`, description: 'Trusted UK health information and when to seek help.' },
      { type: 'exercise' as const, title: 'Fitness Hub modules', description: 'Explore related education and movement modules in the app.' },
      { type: 'support' as const, title: 'AI Health Coach', description: 'Ask personalised questions about your wellness plan.' },
    ],
  };
}

export function resolveConditionContent(conditionId: string): ConditionContent {
  if (CONDITION_CONTENT[conditionId]) {
    return CONDITION_CONTENT[conditionId];
  }
  const condition = HEALTH_CONDITIONS.find((c) => c.id === conditionId);
  if (condition) {
    return buildConditionContent(condition);
  }
  return {
    overview: 'Condition information is being updated.',
    symptoms: [],
    causes: [],
    diagnosis: [],
    treatment: [],
    lifestyle: [],
    complications: [],
    resources: [],
  };
}
