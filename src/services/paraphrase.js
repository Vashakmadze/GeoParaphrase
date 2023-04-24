const paraphraseMain = async (message) => {
    const url = "https://gadawre-server.vercel.app/paraphrase";

    const apiRequestBody = {
        "text": message
    }

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
        return response;
    }).catch(error => {
        // console.log("There was an error with the translation request: ", error)
        return error;
    });

    return response;
} 

export default paraphraseMain;