
const translate = async (fromLang, toLang, text) => {

    // const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    const API_KEY = process.env.VITE_GOOGLE_API_KEY;
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
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

export default translate
