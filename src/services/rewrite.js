
const rewrite = async (message) => {
    const url = "https://api.openai.com/v1/chat/completions";

    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are going to paraphrase"},
            {"role": "user", "content": message},
        ]    
    }

    const response = await fetch(url, { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + process.env.VITE_OPENAI_API_KEY
        //   "Authorization": "Bearer " + import.meta.env.VITE_OPENAI_API_KEY
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

export default rewrite;