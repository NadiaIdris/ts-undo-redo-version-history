// ------------- Figuring out the data structures to use ---------------

import _ = require("lodash")

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
  // [ "foo", "bar", "baz", "zoo" ],
  [ "foo", "bar" ],
  [ "foo", "abc" ],
]
// ------------- End of figuring out the data structures to use ---------------

type Version = string[]

class Editor {
  currentVersion: Version = []
  currentVersionIndex: number = 0
  history: Version[] = []

  private setVersionAndAddToHistory = (version: Version): void => {
    this.currentVersion = version
    // If there are any versions after the currentVersionIndex position, then remove them.
    if (this.history.length > this.currentVersionIndex! + 1) { 
      // Make a defensive deep copy of the history array. Remove the versions after the currentVersionIndex
      // position. Update the this.history with the new historyCopy reference.
      const historyCopy = _.cloneDeep(this.history)
      historyCopy.splice(this.currentVersionIndex! + 1)
      this.history = historyCopy
    }
    this.history.push(version)
    this.currentVersionIndex = this.getLastIndex()
  }

  /**
   * @param stringToAdd is the string you want to add to the version.
   */
  add = (stringToAdd: string): void => {
    const newVersion = [ ...this.currentVersion, stringToAdd ]
    this.setVersionAndAddToHistory(newVersion)
  }

  /**
   * @param modification is the string which will replace the last string which got added to the version.
   * @throws if there is nothing to edit (version array is empty).
  */
  edit = (modification: string): void => { 
    if (this.currentVersion.length === 0) throw new Error("Nothing to edit. Current version is empty.")
    // Make a shallow copy of the currentVersion array. Since we are dealing with primitives
    // (strings) inside the array we don't need to make a deep copy and can use shallow copy
    // instead. Then replace the last element with the modification and push the result to the history. 
    const versionShallowCopy = [...this.currentVersion]
    // Update version with the latest version.
    versionShallowCopy.pop()
    versionShallowCopy.push(modification)
    this.setVersionAndAddToHistory(versionShallowCopy)
  }

  /**
   * @throws if there is nothing to delete (version array is empty).
   */
  delete = (): void => { 
    if(this.currentVersion.length === 0) throw new Error("Nothing to delete. Current version is empty.")
    // Make a shallow copy of the current version. Then remove its last element.
    // Update current version with the modified version and push the result to the history.
    const versionShallowCopy = [...this.currentVersion]
    versionShallowCopy.pop()
    this.setVersionAndAddToHistory(versionShallowCopy)
    // Update currentVersionIndex to the last index in the history.
  }

  /**
   * 
   * @returns the previous version in the history.
   * @throws if the history is empty or if currentVersionIndex is less than 0 (out of bounds).
   */
  undo = (): string => {
    if (this.historyIsEmpty()) throw new Error("Nothing to undo. History is empty.")
    this.currentVersionIndex--

    // If currentVersionIndex is out of bounds, then thow an error.
    if (this.currentVersionIndex < 0) {
      // Reset the currentVersionIndex.
      this.currentVersionIndex++
      throw new Error("Nothing to undo. The previous version you saw is the first version in history.")
    }
    this.currentVersion = this.history[this.currentVersionIndex]
    return this.dump()
  }

   /**
    * 
    * @returns the next version in the history.
    * @throws if the history is empty or if undoRedoIndex is the same as than the length of the history (out of bounds).
    */
  redo = (): string => {
    if (this.historyIsEmpty()) throw new Error("Nothing to redo. History is empty.")
    this.currentVersionIndex++ 

    // If the currentVersionIndex is out of bounds, then throw an error.
    if (this.currentVersionIndex > this.getLastIndex()) {
      // Reset the currentVersionIndex.
      this.currentVersionIndex--
      throw new Error("Nothing to redo. You are seeing the last version.")
    }
    this.currentVersion = this.history[this.currentVersionIndex]
    return this.dump()
  }

  dump = (): string => {
    // The reason we have to return currentVersion instead of the last element of the history array
    // is that if we do undo/redo, the currentVersion will not be the last element of the history
    // array anymore.
    return this.currentVersion.join("")
  }

  // Internal methods for code readability.
  private historyIsEmpty = (): boolean => {
    return this.history.length === 0
  }

  private getLastIndex = (): number => {
    return this.history.length - 1
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