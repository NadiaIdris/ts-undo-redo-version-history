# About Version History

This is a TypeScript project illustrating how to implement undo/redo functionality in a version
  history.

![](/readme-assets/version-history.png)

## How to run the project
- `npm install` to install the dependencies
- `npm run start` to start the project

## How to run tests
- `npx jest --watchAll` to run the tests

## Instructions

- Read the Python code and follow the instructions.
- I have also copied these instructions to the bottom of the `main.ts` file.

``` python
 # Part 1: Write a simple text editor that supports add, delete, and edit with undo functionality.
 class Editor:
     def __init__(self) -> None:
         pass

     def add(self, s: str) -> None:
         """
         Appends s to current text.
         Examples:
             - Current text is 'foo'. if add('bar') is called, then dump() should return 'foobar'
         """
         pass


     def edit(self, s: str) -> None:
         """
         Edits the last 's' that was added and replaces it with the given 's'.
         Examples:
             - Current text is 'foobar' after add('foo') and add('bar'). if edit('xyz') is called,
             then dump() should return 'fooxyz'
         """
         pass

     def delete(self) -> None:
         """
         Deletes the last 's' that was added or edited.
         Examples:
             - Current text is 'foobar' after add('foo') and add('bar'). if delete() is called,
             then dump() should return 'foo'
         """
         pass


     def undo(self) -> None:
         """
         undoes the last action.
         For example, if the last action was a deletion, then it will remove the deletion.
         If the last action was an edit, then it restores the previous state for the last added string.
         If the last action as an add, then it removes the last string added.
         Examples:
             - Current text is 'foobar' after add('foo') and add('bar'). if undo() is called,
             then dump() should return 'foo'
             - Current text is 'bar' after add('foo') and edit('bar'). if undo() is called,
             then dump() should return 'foo'
             - Current text is 'foo' after add('foo'), add('bar'), delete(). if undo() is called,
             then dump() should return 'foobar'
         """
         pass

     def dump(self) -> str:
         """
         dump renders the full text based on the previous actions.
         """
         pass
```
