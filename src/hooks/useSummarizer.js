import { useState, useRef } from "react";
import summarizeMain from "../services/summarize";

const useSummarizer = (tier) => {
    const [charlength, setCharlength] = useState(0);
    const [loading, setLoading] = useState(false);
    const date = new Date().toLocaleDateString("en-US");
    const inputRef = useRef(null);
    const outputRef = useRef(null);

    const updateLength = (e) => {
        setCharlength(e.target.value.length);
    };

    const summarizedResult = async () => {
        const text = inputRef.current.value;

        if (text.length > 1) {
            const finalResult = await summarizeMain(text, setLoading);
            outputRef.current.value = finalResult.data;
        }
    };

    const updateDailyUsage = () => {
        const usage = JSON.parse(localStorage.getItem("usageSummary"));
        usage[date]++;
        localStorage.setItem("usageSummary", JSON.stringify(usage));
    };

    const createDailyUsage = () => {
        const usageObject = {
            [date]: 0,
        };
        localStorage.setItem(`usageSummary`, JSON.stringify(usageObject));
    };

    const summarize = () => {
        const usage = JSON.parse(localStorage.getItem("usageSummary"));
        if (usage) {
            if (Object.keys(usage)[0] === date) {
                if (usage[date] < tier.maxParaphrases) {
                    summarizedResult();
                    updateDailyUsage();
                } else {
                    alert(
                        "თქვენ დღიური ლიმიტი ამოგეწურათ. ამჟამინდელი ყოველდღიური ლიმიტია - " +
                        tier.maxParaphrases
                    );
                }
            } else {
                createDailyUsage();
                summarizedResult();
            }
        } else {
            createDailyUsage();
            summarizedResult();
        }
    };

    return { charlength, loading, inputRef, outputRef, updateLength, summarize };
};

export default useSummarizer;
