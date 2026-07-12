require("dotenv").config();

const analyzeComplaint = require("./utils/aiAnalyzer");

async function test() {

    const result = await analyzeComplaint(
        "Water pipe is leaking in room 203 and the bathroom is flooded."
    );

    console.log(result);

}

test();