
const form = document.getElementById('text-to-speech-form');
const submitButton = document.getElementById('submit-button');
var dylan_response

form.addEventListener("submit", function(event) {
	event.preventDefault(); // prevent the form from being submitted

	// get the text input value
	const textInput = document.getElementById("text-input").value;
	
	fetch('https://api.openai.com/v1/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer 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'
		},

		body: JSON.stringify({
			'model': 'text-davinci-003',
			'prompt': 'The following is a conversation with someone named Dylan. Dylan is nice, but a little snarky. Dylan likes to make jokes. Dylan has a girlfriend named Julia, who is from Austria. He lives with his roommate, Mark, who loves chess and programming. Dylan attends Rice Unviversity and lives in Houston, Texas. Dylan has a brother, Parker, who studies natural language processing. Dylan has a sister, Sami, who works in video production. This is what I say to Dylan:' + textInput,
			'temperature': 0.9,
			'max_tokens': 150,
			'top_p': 1,
			'frequency_penalty': 0,
			'presence_penalty': 0.6,
			'stop': [
				' Human:',
				' AI:'
			]
		})
	})
	.then(function(u){ return u.json();}
		  ).then(
			function(json){
			  dylan_response = json['choices']['0']['text'];
			}
		  )
	
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