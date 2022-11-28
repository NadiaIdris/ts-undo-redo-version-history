# Version history
![](/readme-assets/version-history.svg)

Implement an editor class which allows to edit a file by adding and deleting words. It will also have methods called undo and redo.

Editor properties and methods:
- `add(word: string): void` - appends a word to the end of the current text.
- `delete()` - deletes the last word in the editor.
- `edit(newWord: string): void` - replaces the last word in the editor with the given word.
- `undo(): void` - undoes the last action (actions are: adding, deleting, editing).
- `redo(): void` - redoes the last undone action. We can redo an action only if we have undone it previously.
- `printString(): string` - prints the current text in the editor.

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
  delete: () => void;
  edit: (newWord: string) => void;
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



## Undo/redo
![](/readme-assets/undo-redo.svg)

## Modify the editorState when currently displayed states's index is at the end of the history array
![](/readme-assets/modify-the-end-of-history-array.svg)
## Modify the editorState when currently displayed states's index is at the start of in the middle of the history array
![](/readme-assets/modify-in-middle-of-history-array.svg)
