const summarizeMain = async (message, setLoading) => {
    const url = "https://apilukavasha.com.ge/summarize";

    const apiRequestBody = {
        "text": message
    }
    setLoading(true);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody)
    })
        .then(res => res.json())
        .then((response) => {
            setLoading(false);
            return response;
        }).catch(error => {
            setLoading(false);
            return error;
        });

    return response;
}

export default summarizeMain;