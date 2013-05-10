class Stabilizer

	constructor: (@client, @organizer, @processor)->

	stabilize: (stableTimestamp)->
		stableCommands = (command for command in @organizer.activeCommands() when command.timestamp <= stableTimestamp)
		@client.revertState()
		@processor.processCommands(stableCommands)
		@client.lockState()
		@organizer.lockCommands(stableCommands)
		@processor.processCommands(@organizer.activeCommands())

return Stabilizer