const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function analyzeComplaint(description) {

    const prompt = `
You are an AI hostel complaint analyzer.

Analyze the complaint below and return ONLY valid JSON.

Complaint:
${description}

Return exactly this format:

{
  "category": "",
  "priority": "",
  "summary": ""
}

Rules:
- Category must be one of:
Network, Electrical, Plumbing, Food, Cleaning, Security, Other

- Priority must be one of:
Low, Medium, High, Critical

- Summary should be 1–2 sentences.
`;

    try {

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.2
        });

        const text = completion.choices[0].message.content;

        return JSON.parse(text);

    } catch (err) {

        console.log(err);

        return {
            category: "Other",
            priority: "Medium",
            summary: description
        };

    }

}

module.exports = analyzeComplaint;