import { useState, useRef } from "react";
import paraphraseMain from "../services/paraphrase";

const useParaphraser = (tier) => {
    const [charlength, setCharlength] = useState(0);
    const [loading, setLoading] = useState(false);
    const date = new Date().toLocaleDateString("en-US");
    const inputRef = useRef(null);
    const outputRef = useRef(null);

    const updateLength = (e) => {
        setCharlength(e.target.value.length);
    };

    const paraphrasedResult = async () => {
        const text = inputRef.current.value;

        if (text.length > 1) {
            const finalResult = await paraphraseMain(text, setLoading);
            outputRef.current.value = finalResult.data;
        }
    };

    const updateDailyUsage = () => {
        const usage = JSON.parse(localStorage.getItem("usage"));
        usage[date]++;
        localStorage.setItem("usage", JSON.stringify(usage));
    };

    const createDailyUsage = () => {
        const usageObject = {
            [date]: 0,
        };
        localStorage.setItem(`usage`, JSON.stringify(usageObject));
    };

    const paraphrase = () => {
        const usage = JSON.parse(localStorage.getItem("usage"));
        if (usage) {
            if (Object.keys(usage)[0] === date) {
                if (usage[date] < tier.maxParaphrases) {
                    paraphrasedResult();
                    updateDailyUsage();
                } else {
                    alert(
                        "თქვენ დღიური ლიმიტი ამოგეწურათ. ამჟამინდელი ყოველდღიური ლიმიტია - " +
                        tier.maxParaphrases
                    );
                }
            } else {
                createDailyUsage();
                paraphrasedResult();
            }
        } else {
            createDailyUsage();
            paraphrasedResult();
        }
    };

    return { charlength, loading, inputRef, outputRef, updateLength, paraphrase };
};

export default useParaphraser;
