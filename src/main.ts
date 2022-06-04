// ------------- Figuring out the data structures to use ---------------
// DS after adding "foo", "bar" and "baz"
const t1 = [ "foo" ]
const t2 = ["foo", "bar"]
const t3 = ["foo", "bar", "baz"]
// DS after deleting "baz"
const t4 = [ "foo", "bar" ]
// DS after editing "bar" to "abc"
const t5 = [ "foo", "abc" ]
// DS after undoing "abc" (data to return: [ "foo", "bar" ])
const t6 = [
   t1,
   t2, // return this
   t3,
   t4, 
   t5,
]

const t7 = [
  [ "foo" ],
  [ "foo", "bar" ],
  [ "foo", "bar", "baz" ],
  [ "foo", "bar" ],
  [ "foo", "abc" ],
]
// ------------- End of figuring out the data structures to use ---------------

type Version = string[]

class Editor {
  version: Version = []
  history: Version[] = []
  historyCursor: number | undefined = undefined

  /**
   * @param stringToAdd is the string you want to add to the version.
   */
  add = (stringToAdd: string): void => {
    // Take the previous version and add to it, then push the result to the history.
    // concat method returns a new array.
    const newVersion = this.version.concat(stringToAdd)
    this.version = newVersion
    this.history.push(newVersion)
  }

  /**
   * @param modification is the string which will replace the last string which got added to the version.
   * @throws if there is nothing to edit (version array is empty).
  */
  edit = (modification: string): void => { 
    if (this.version.length === 0) throw new Error("Nothing to edit. Version is empty.")
    const lastIndex = this.version.length - 1
    // Make a shallow copy of the version array. Since we are dealing with primitives (strings) inside the array we don't need to make a deep
    // copy and can use shallow copy instead.
    // Then replace the last element with the modification and push the result to the history. 
    const versionCopy = [...this.version]
    // Update version with the latest version.
    versionCopy.splice(lastIndex, 1, modification)
    this.version = versionCopy
    this.history.push(this.version)
  }

  /**
   * @throws if there is nothing to delete (version array is empty).
   */
  delete = (): void => { 
    if(this.version.length === 0) throw new Error("Nothing to delete. Version is empty.")
    // Access the last element in the version array and remove it.
    const lastIndex = this.version.length - 1
    // Make a shallow copy of the current version. Then remove the last element of the deep copy.
    // Update current version with the modified version and push the result to the history.
    const versionCopy = [...this.version]
    versionCopy.splice(lastIndex, 1)
    this.version = versionCopy
    this.history.push(this.version)
  }

  /**
   * 
   * @returns the previous version in the history.
   * @throws if the history is empty or if undoRedoIndex is less than 0 (out of bounds).
   */
  // When I call undo, make a new instance of the Editor class. The default 
  undo = (): string => {
    if (this.history.length === 0) throw new Error("Nothing to undo. History is empty.")
    if (this.historyCursor === undefined) this.historyCursor = this.history.length - 1
    this.historyCursor--

    if (this.historyCursor === -1) {
      this.historyCursor++
      throw new Error("Nothing to undo. The previous version you saw is the first version in history.")
    }
    return this.history[ this.historyCursor ].join("")

  }
   /**
    * 
    * @returns the next version in the history.
    * @throws if the history is empty or if undoRedoIndex is the same as than the length of the history (out of bounds).
    */
  redo = (): string => {
    if (this.history.length === 0) throw new Error("Nothing to redo. History is empty.")
    if (this.historyCursor === undefined) this.historyCursor = this.history.length - 1
    this.historyCursor++ 

    if (this.historyCursor === this.history.length) {
      // Decrement the undoRedoIndex to make sure if redo gets called again, this if statement will
      // execute and the error message below will be thrown again.
      this.historyCursor--
      throw new Error("Nothing to redo. You are seeing the last version.")
    }
    return this.history[this.historyCursor].join("")
  }

  dump = (): string => {
    // Get the last element of the history array and join it as a string.
    const lastIndex = this.history.length - 1
    return this.history[lastIndex].join("")
  }

}

export { Editor }

// # Part 1: Write a simple text editor that supports add, delete, and edit with undo functionality.
// class Editor:
//     def __init__(self) -> None:
//         pass
        
//     def add(self, s: str) -> None:
//         """
//         Appends s to current text. 
//         Examples:
//             - Current text is 'foo'. if add('bar') is called, then dump() should return 'foobar'
//         """
//         pass


//     def edit(self, s: str) -> None:
//         """
//         Edits the last 's' that was added and replaces it with the given 's'.
//         Examples:
//             - Current text is 'foobar' after add('foo') and add('bar'). if edit('xyz') is called, 
//             then dump() should return 'fooxyz'
//         """
//         pass

//     def delete(self) -> None:
//         """
//         Deletes the last 's' that was added or edited.
//         Examples:
//             - Current text is 'foobar' after add('foo') and add('bar'). if delete() is called, 
//             then dump() should return 'foo'
//         """
//         pass


//     def undo(self) -> None:
//         """
//         undoes the last action. 
//         For example, if the last action was a deletion, then it will remove the deletion.
//         If the last action was an edit, then it restores the previous state for the last added string.
//         If the last action as an add, then it removes the last string added.
//         Examples:
//             - Current text is 'foobar' after add('foo') and add('bar'). if undo() is called, 
//             then dump() should return 'foo'
//             - Current text is 'bar' after add('foo') and edit('bar'). if undo() is called, 
//             then dump() should return 'foo'
//             - Current text is 'foo' after add('foo'), add('bar'), delete(). if undo() is called, 
//             then dump() should return 'foobar'
//         """
//         pass

//     def dump(self) -> str:
//         """
//         dump renders the full text based on the previous actions.
//         """
//         pass