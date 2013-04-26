CommandSource = require 'leonidas/command_source'
CommandOrganizer = require 'leonidas/command_organizer'
CommandProcessor = require 'leonidas/command_processor'
CommandStabilizer = require 'leonidas/command_stabilizer'

describe "CommandStabilizer", ->
	stabilizer = null
	source = null
	organizer = null

	beforeEach ->
		source = buildSource()
		organizer = new CommandOrganizer()
		organizer.addCommands [ buildCommand(1), buildCommand(2, "pop-char"), buildCommand(3, "pop-char"), buildCommand(4) ], false
		processor = new CommandProcessor([ new IncrementHandler(source.activeState), new PopCharHandler(source.activeState)])
		stabilizer = new CommandStabilizer(source, organizer, processor)

	describe "#stabilize", ->

		it "will update the locked state to the state at the given timestamp", ->
			stabilizer.stabilize 2
			expect(source.lockedState).toEqual { integer: 2, string: "tes" }

		it "will deactivate the stable commands in the command organizer", ->
			stabilizer.stabilize 2
			expect(organizer.activeCommands()).toEqual [ buildCommand(3, "pop-char"), buildCommand(4) ]

		it "will process the remaining active commands to leave the active state entirely current", ->
			stabilizer.stabilize 2
			expect(source.activeState).toEqual { integer: 3, string: "te" }