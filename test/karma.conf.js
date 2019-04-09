/**
 * Karma configuration
 * SEE: http://karma-runner.github.io/0.12/config/configuration-file.html
 */
module.exports = function(config) {
	config.set({

		basePath : '../',

		files : [
		    'ping/**',
			'bower_components/jquery/dist/jquery.js',
			'bower_components/underscore/underscore.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-touch/angular-touch.js',
			'bower_components/angular-cookies/angular-cookies.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'bower_components/angular-translate/angular-translate.js',
			'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
			'bower_components/restangular/dist/restangular.js',
			'bower_components/datatables/media/js/jquery.dataTables.js',
			'bower_components/angular-animate/angular-animate.js',
			'bower_components/ui-select-master/dist/select.js',	
			'bower_components/select2/select2.min.js',	
			'bower_components/angular-ui-select2/src/select2.js',
			'bower_components/angular-cookies/angular-cookies.js',
			'bower_components/ngStorage/ngStorage.min.js',
			'test/lib/test-helpers.js',
			'webCore/**/componentsModule.js',
			'webCore/**/servicesModule.js',
			'webCore/**/*.js',
			'application/**/componentsModule.js',
			'application/**/modelsModule.js',
			'application/**/servicesModule.js',
            'application/**/homeModule.js',
			'application/**/*.js'
		],
		
        exclude : [
			'../**/*.spec.e2e.js',
			'../**/*.page.e2e.js',
			'webCore/assets/**/*.js'
		],
        
		autoWatch : true,
		
		frameworks : [ 'jasmine' ],

		browsers : [ 'Chrome' ],

		plugins : [ 
			'karma-jasmine',
			'karma-chrome-launcher', 
			'karma-firefox-launcher',
			'karma-ie-launcher',
			'karma-htmlfile-reporter',
			'karma-coverage'
        ],
		
		logLevel: 'config.LOG_INFO',
        
        reporters: ['progress', 'html', 'coverage'],
        
        preprocessors: {
        	'application/**/!(*spec).js': ['coverage']
     //   	'webCore/**/!(*spec).js': ['coverage']
        },

		htmlReporter: {
			outputFile: 'test_out/unit.html'
		},
		
		coverageReporter: {
			reporters: [
			    {type: 'html', dir: 'test_out/coverage/', file: 'coverage.html'}
			]
		}

	});
};
