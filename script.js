const makeChatGPTCall = async(text,node) =>{
    try{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", 'Bearer ${APIkEY}');

        //set request payload
        const raw=JSON.stringify({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 2048,
            temperature: 0,
            top_p: 1.,
            n: 1,
            stream: false,
            logprobs: null,
        });                                                                                                           

        //set request options
        const requestOptions={
            method: "POST",
            headers: myHeaders,
            body:raw,
            redirect: "follow",
        };


        //make the API call
        let response= await fetch("https://api.openai.com/v1/completions",requestOptions);
        response= await response.json();
        const {choices}= response;

        //remove the space from the response text
        node.textContent= text;
    }
    catch(e){
        console.error("Error while calling openai API", e);
    }
};