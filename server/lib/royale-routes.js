exports.findById = function(req, res) {
    res.send({
    	video: {
    		id: 1,
    		name: 'test',
    		duration: 113000,
    		url: 'http://ec2-174-129-109-6.compute-1.amazonaws.com/videos/blob_full.mp4',
    		autoStart: false
    	},
    	contentFrames: [ {
    		id: 1,
    		startTime: 3000,
    		contentHtml: 'blah blah hooray'
    	},
    	{
    		id: 2,
    		startTime: 5000,
    		contentHtml: 'blah blah hooray'
    	},
    	{
    		id: 3,
    		startTime: 10000,
    		contentHtml: 'blah blah hooray'
    	}
    	],
    	comments: [ {
    		id: 1,
    		startTime: 3000,
    		commentText: 'blah blah hooray',
    		userId: 12345,
    		userFullName: 'John Smith'
    	},
    	{
    		id: 2,
    		startTime: 5000,
    		commentText: 'blah blah hooray',
    		userId: 1234,
    		userFullName: 'Jane Smith'
    	},
    	{
    		id: 3,
    		startTime: 10000,
    		commentText: 'blah blah hooray',
    		userId: 1234,
    		userFullName: 'Jane Smith'
    	}
    	],
    	notes: [
    	{
    		id: 1,
    		startTime: 3000,
    		noteText: 'blah blah hooray',
    		userId: 12345
    	},
    	{
    		id: 2,
    		startTime: 5000,
    		noteText: 'blah blah hooray',
    		userId: 1234
    	},
    	{
    		id: 3,
    		startTime: 10000,
    		noteText: 'blah blah hooray',
    		userId: 1234
    	}],

    	});
};

