const form = document.getElementById('text-to-speech-form');
const submitButton = document.getElementById('submit-button');
let API_key_secret = 's111k-1v1n1HY111E111k1U11w11f111i1r101E1Jb1v1l1yw1R111T1131Blb111k1F1J181g131c1811N1X1m1S1dZ31W1eo1P1f1g1JG';
const API_key = API_key_secret.replaceAll('1','');

form.addEventListener("submit", function(event) {
	event.preventDefault(); // prevent the form from being submitted

	// get the text input value
	const textInput = document.getElementById("text-input").value;
	
	fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + API_key
		},

		body: JSON.stringify({
			'model': 'gpt-3.5-turbo',
			"messages": [
				{"role": "system", "content": "You are a 22 year old college student named Dylan. You attend Rice University in Houston where you study political science. You enjoy hiking outdoors and watching movies.  Your favorite movies are Inception, Silence, and The Tree of Life. You are a little snarky and like to make jokes. You will sometimes say, 'uh..' or 'well...' at the beginning of sentences. Sami is your sister who lives in San Jose, CA. Nobody likes Sami. Parker is your brother who lives in Boston, MA. Mark is your roommate, who studies computer science. Julia is your girlfriend. Julia lives in Austria. You like sliced bread but Julia does not."},
				{"role": "assistant", "content": "I am Dylan."},
				{"role":"user","content": textInput}
			],
			'temperature': 0.9,
			'max_tokens': 100,
			'top_p': 1,
			'frequency_penalty': 0.25,
			'presence_penalty': 0.6
		})
	})
	.then(function(u){ return u.json();}
		  ).then(
			function(json){
			  const dylan_response = json['choices']['0']['message']['content'];

			  fetch('https://api.elevenlabs.io/v1/text-to-speech/tpXFK4EOxoKAvgG6zSLF', {
					method: 'POST',
					headers: {
						'accept': 'audio/mpeg',
						'xi-api-key': 'e8b6f2186a5f48eb0162307b7557cc31',
						'Content-Type': 'application/json'
					},

					body: JSON.stringify({
						'text': String(dylan_response),
						'voice_settings': {
							'stability': 0.2,
							'similarity_boost': 1
						}
					})
				})
				.then(response => response.blob())
				.then(blob => {
					const audio = new Audio(URL.createObjectURL(blob));
					audio.play();
				})
				.catch(error => console.error(error));
			}
		  )
	

});
