CommandSource = require 'leonidas/command_source'

describe "CommandSource", ->
	source = null

	beforeEach ->
		source = new CommandSource("1234", { test: "test" })

	describe "#revertState", ->

		it "will revert the active state to the locked state", ->
			source.activeState = { test: "different" }
			source.revertState()
			expect(source.activeState).toEqual { test: "test" }

	describe "#lockState", ->

		it "will lock the state to the active state", ->
			source.activeState = { test: "different" }
			source.lockState()
			expect(source.lockedState).toEqual { test: "different" }