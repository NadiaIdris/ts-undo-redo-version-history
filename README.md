# Version history

Implement an editor class which allows to edit a file by adding and deleting words. It will also have methods called undo and redo.

Editor actions:
- `add(word: string): void` - appends a word to the end of the current text.
- `delete()` - deletes the last word in the editor.
- `edit(newWord: string): void` - replaces the last word in the editor with the given word.
- `undo(): void` - undoes the last action (actions are: adding, deleting, editing).
- `redo(): void` - redoes the last undone action. We can redo an action only if we have undone it previously.
- `printString(): string` - prints the current text in the editor.

![](/readme-assets/version-history.png)

## How to run the project
- `npm install` to install the dependencies
- `npm run start` to start the project

## How to run tests
- `npx jest --watchAll` to run the tests

# Implementation

## Data modeling

We know we want to be able to add, delete and edit words. Each word is a string. We need to be able to add/remove/edit words easily. We want to use array of strings to store the words. 

In order to implement undo, we must be able to revert to a previous state of the editor. We can store each state of the editor in another array. We can use a stack to store the states. Let's call that array `states `

`undo` - To implement undo we need to create a new property in our class to track the current state to display. Let's call that indexOfStateToDisplay.

Let's update our interface to include the indexOfStateToDisplay property. It is a type number.

```typescript
interface EditorInterface {
  editorState: EditorState;
  history: EditorState[];
  indexOfStateToDisplay: number;
  add: (word: string) => void;
  deleteLastWord: () => void;
  replaceLastWord: (newWord: string) => void;
  undo: () => void; 
  redo: () => void;
}
```

If I have undo() in the middle of the history and I add a new word -> update the editorState with the new word, add to the end of the editorHistory the new state, and set the indexOfStateToDisplay to the end of the history.

```typescript
add(word: string) {
  this.editorState.words.push(word);
  this.history.push(this.editorState);
  this.indexOfStateToDisplay = this.history.length - 1;
}
``` 


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
