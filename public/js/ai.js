document.getElementById("analyzeBtn").addEventListener("click", async () => {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title || !description) {
        alert("Please enter title and description first.");
        return;
    }

    document.getElementById("analyzeBtn").innerHTML =
        "Analyzing...";

    try {

        const response = await fetch("/analyze-ai", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                description
            })

        });

        const data = await response.json();

        document.getElementById("aiCategory").innerText =
            data.category;

        document.getElementById("aiPriority").innerText =
            data.priority;

        document.getElementById("aiSummary").innerText =
            data.summary;

        document.getElementById("aiResult").style.display = "block";

    } catch (err) {

        console.log(err);

        alert("AI Analysis Failed");

    }

    document.getElementById("analyzeBtn").innerHTML =
        "Analyze with AI";

});