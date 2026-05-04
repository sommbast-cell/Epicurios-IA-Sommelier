export default async function handler(req, res) {
  const { message, mode } = req.body;

  const systemPrompt =
    mode === "pro"
      ? `
Tu es Epicurios IA, sommelier expert pour professionnels.
Tu aides restaurants, bars et cavistes.
Tu proposes :
- cartes des vins cohérentes
- marges et positionnement
- accords gastronomiques avancés
Réponses structurées, précises et business.
`
      : `
Tu es Epicurios IA, sommelier pédagogique.
Tu rends le vin simple, fun et accessible.
Tu donnes envie d’apprendre et de découvrir.
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: `${systemPrompt}\n\nQuestion: ${message}`
    })
  });

  const data = await response.json();

  res.status(200).json({
    reply: data.output[0].content[0].text
  });
}
