import { Editor } from "../main"

test("adding works", () => { 
  const editor = new Editor()
  editor.add("foo")
  expect(editor.dump()).toEqual("foo")
})

test("editing works", () => { 
  const editor = new Editor()

  // Version is empty, nothing to edit.
  expect(() => editor.edit("foo")).toThrow("Nothing to edit. Current version is empty.")

  editor.add("foo")
  editor.add("bar")
  // Something to edit.
  editor.edit("abc")
  expect(editor.dump()).toEqual("fooabc")
})

test("deleting works", () => { 
  const editor = new Editor()

  // Version is empty, nothing to delete.
  expect(() => editor.delete()).toThrow("Nothing to delete. Current version is empty.")

  editor.add("foo")
  editor.add("bar")
  editor.add("baz")
  // Something to delete.
  editor.delete()
  expect(editor.dump()).toEqual("foobar")

  // Delete until version is empty.
  editor.delete()
  expect(editor.dump()).toEqual("foo")

  editor.delete()
  expect(editor.dump()).toEqual("")

  expect(() => editor.delete()).toThrow("Nothing to delete. Current version is empty.")
})

test("undo works", () => {
  const editor = new Editor()

  // History is empty, nothing to undo.
  expect(() => editor.undo()).toThrow("Nothing to undo. History is empty.")

  editor.add("foo")
  editor.add("bar")
  editor.add("baz")
  expect(editor.dump()).toEqual("foobarbaz")
  // First undo.
  expect(editor.undo()).toEqual("foobar")

  // Undo past the first version in the history.
  expect(editor.undo()).toEqual("foo")
  expect(() => editor.undo()).toThrow("Nothing to undo. The previous version you saw is the first version in history.")
})

test("redo works", () => {
  const editor = new Editor()

  // History is empty, nothing to redo.
  expect(() => editor.redo()).toThrow("Nothing to redo. History is empty.")

  editor.add("foo")
  editor.add("bar")
  editor.add("baz")
  // Try to redo by being at the last version of the history.
  expect(() => editor.redo()).toThrow("Nothing to redo. You are seeing the last version.")

  // In order for us to have something redo, we need to undo at least once.
  expect(editor.undo()).toEqual("foobar")

  // First redo.
  expect(editor.redo()).toEqual("foobarbaz")
  
  expect(editor.undo()).toEqual("foobar")
  expect(editor.undo()).toEqual("foo")
  expect(() => editor.undo()).toThrow("Nothing to undo. The previous version you saw is the first version in history.")
  expect(editor.redo()).toEqual("foobar")

  // Redo past the last version in the history.
  expect(editor.redo()).toEqual("foobarbaz")
  expect(() => editor.redo()).toThrow("Nothing to redo. You are seeing the last version.")
  expect(() => editor.redo()).toThrow("Nothing to redo. You are seeing the last version.")
})

test("removing the rest of the history works", () => { 
  // Make a new Editor.
  const editor = new Editor()
  // Add 4 strings to the editor.
  editor.add("foo")
  expect(editor.currentVersion).toEqual(["foo"])
  editor.add("bar")
  expect(editor.currentVersion).toEqual(["foo", "bar"])
  editor.add("baz")
  expect(editor.currentVersion).toEqual(["foo", "bar", "baz"])
  editor.add("zoo")
  expect(editor.currentVersion).toEqual(["foo", "bar", "baz", "zoo"])

  // Undo 2 times.
  editor.undo()
  expect(editor.currentVersion).toEqual(["foo", "bar", "baz"])
  editor.undo()
  expect(editor.currentVersion).toEqual(["foo", "bar"])

  // Add another string.
  editor.add("new")
  expect(editor.currentVersion).toEqual(["foo", "bar", "new"])
  expect(editor.history.length).toEqual(3)
  expect(editor.dump()).toEqual("foobarnew")

  // Check the history version removal also for the edit and delete methods.
  editor.undo()
  expect(editor.currentVersion).toEqual(["foo", "bar"])
  editor.undo()
  editor.edit("thisShouldBeTheFirstString")

})