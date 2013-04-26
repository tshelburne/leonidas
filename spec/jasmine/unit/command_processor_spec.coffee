CommandSource = require 'leonidas/command_source'
CommandProcessor = require 'leonidas/command_processor'

describe "CommandProcessor", ->
	processor = null
	source = null

	beforeEach ->
		source = new CommandSource("1234", { integer: 1, string: "test" })
		processor = new CommandProcessor([ new IncrementHandler(source.activeState), new PopCharHandler(source.activeState)])

	describe "#processCommand", ->

		it "will run a command", ->
			processor.processCommand mocks.command1
			expect(source.activeState).toEqual { integer: 2, string: "test" }

	describe "#processCommands", ->

		it "will run multiple commands", ->
			processor.processCommands [ mocks.command1, mocks.command2 ]
			expect(source.activeState).toEqual { integer: 2, string: "tes" }