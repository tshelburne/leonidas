Command = require "command_manager/command"
CommandOrganizer = require "command_manager/command_organizer"
CommandProcessor = require "command_manager/command_processor"
CommandStabilizer = require "command_manager/command_stabilizer"
CommandSynchronizer = require "command_manager/command_synchronizer"

class CommandManager

	constructor: (@commandOrganizer, @commandProcessor, @commandStabilizer, @commandSynchronizer)->
		@pushFrequency = 1
		@pullFrequency = 5

	@default: (commandSource, handlers, syncBaseUrl)->
		commandOrganizer = new CommandOrganizer()
		commandProcessor = new CommandProcessor(handlers)
		commandStabilizer = new CommandStabilizer(commandSource, commandOrganizer, commandProcessor)
		commandSynchronizer = new CommandSynchronizer(syncBaseUrl, commandOrganizer, commandStabilizer)

		new @(commandOrganizer, commandProcessor, commandStabilizer, commandSynchronizer)

	startSync: ->
		@pushInterval = setInterval(@commandSynchronizer.push, @pushFrequency)
		@pullInterval = setInterval(@commandSynchronizer.pull, @pullFrequency)

	stopSync: ->
		clearInterval @pushInterval
		clearInterval @pullInterval

	addCommand: (name, data)->
		command = new Command(name, data)
		@commandOrganizer.addCommand command
		@commandProcessor.processCommand command

return CommandManager