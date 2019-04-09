var exec = require('child_process').exec;

var preinstallCommands = [
	'(npm ls -g bower@"1.3.4" || npm i -g bower@"1.3.4")',
	'(npm ls -g karma-cli@"0.0.4" || npm i -g karma-cli@"0.0.4")'
];

preinstallCommands = preinstallCommands.join(' && ');

exec(preinstallCommands, function(error, stdout, stderr){
	if(error !== null) {
		console.log('Execution Error:', error);
	}
	console.log('Standard Output:', stdout);
	console.log('Standard Error:', stderr);
});