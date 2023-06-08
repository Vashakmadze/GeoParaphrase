const paraphraseMain = async (message, setLoading) => {
    const url = "http://localhost:8000/paraphrase";

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
            // console.log("response from google: ", response)
            setLoading(false);
            return response;
        }).catch(error => {
            // console.log("There was an error with the translation request: ", error)
            setLoading(false);
            return error;
        });

    return response;
}

export default paraphraseMain;