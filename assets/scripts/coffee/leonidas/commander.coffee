Command = require "leonidas/commands/command"
Organizer = require "leonidas/commands/organizer"
Processor = require "leonidas/commands/processor"
Synchronizer = require "leonidas/commands/synchronizer"

class Commander

	constructor: (@client, @organizer, @processor, @synchronizer)->

	@create: (client, handlers, syncUrl)->
		organizer = new Organizer()
		processor = new Processor(handlers)
		synchronizer = new Synchronizer(syncUrl, client, organizer, processor)

		new @(client, organizer, processor, synchronizer)

	startSync: (pushFrequency=1000, pullFrequency=5000)->
		@pushInterval = setInterval(@synchronizer.push, pushFrequency)
		@pullInterval = setInterval(@synchronizer.pull, pullFrequency)

	stopSync: ->
		clearInterval @pushInterval
		clearInterval @pullInterval

	forceSync: ->
		@synchronizer.push()
		@synchronizer.pull()

	issueCommand: (name, data)->
		command = new Command(name, data, @client.id)
		@organizer.local.addCommand command
		@processor.runCommand command

	isOnline: -> @synchronizer.isOnline()

return Commander