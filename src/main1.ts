type EditorState = string[];

/*
 Data examples when writing methods:
 
  editorState = ["first", "second", "third" ]
  history = [
    ["first"],
    ["first", "second"], <- editorState. Delete "second".
    ["first"]



    ["first", "second", "third"]
 */

interface EditorInterface {
  editorState: EditorState;
  history: EditorState[];
  indexToDisplay: number;
  add: (word: string) => void; 
  delete: () => void;
  edit: (newWord: string) => void;
  undo: () => void;
  redo: () => void;
  toString: () => string;
}

class Editor implements EditorInterface {
  editorState: EditorState = [];
  history: EditorState[] = [];
  indexToDisplay: number = 0;

  /** Take the word and add it to the editorState array. Then add the editorState array to history array. */
  add = (word: string) => {
    // Make a copy of editorState and modify the copy.
    const copyOfState = [...this.editorState];
    copyOfState.push(word);
    // If history is empty, add the word to the history array.
    if (this.history.length === 0) {
      // Update the editorState and history with the new editorState.
      this.editorState = copyOfState;
      this.history.push(copyOfState);
      this.indexToDisplay = 0;
      return;
    }
    const lastIndexOfHistory = this.history.length - 1;
    // If indexToDisplay is in the middle or start of the array.
    if (this.indexToDisplay !== lastIndexOfHistory) {
      // Chop off the history array from the indexOfStateToDisplay till the end.
      this.history.splice(this.indexToDisplay + 1);
    }

    // Update the editorState and history with the new editorState.
    this.editorState = copyOfState;
    this.history.push(copyOfState);
    // Every time when we add a word, we need to update the indexOfStateToDisplay.
    this.history.length === 1
      ? (this.indexToDisplay = 0)
      : this.indexToDisplay++;
  };

  /** Remove the last word from the state array. Then add the new state to history array. */
  delete = () => {
    // Make a copy of editorState and modify the copy.
    const copyOfState = [...this.editorState];
    copyOfState.pop();
    const lastIndexOfHistory = this.history.length - 1;
    // indexToDisplay is in the middle or start of the array.
    if (this.indexToDisplay !== lastIndexOfHistory) {
      this.history.splice(this.indexToDisplay + 1);
    }
    // Update the editorState and history with the new editorState.
    this.editorState = copyOfState;
    this.history.push(copyOfState);
    // Every time when we delete a word, we need to update the indexOfStateToDisplay by once,
    // since we have added a new state with missing word.
    this.indexToDisplay++;
  };

  /** Remove the last word from the state array. Add the new word to the end of the state array.
   *  Aft that add the new state to history array. */
  edit = (newWord: string) => {
    // Make a copy of editorState and modify the copy.
    const copyOfState = [...this.editorState];
    copyOfState.pop();
    copyOfState.push(newWord);
    const lastIndexOfHistory = this.history.length - 1;
    if (this.indexToDisplay !== lastIndexOfHistory) {
      this.history.splice(this.indexToDisplay + 1);
    }
    // Update the editorState and history with the new editorState.
    this.editorState = copyOfState;
    this.history.push(copyOfState);
  };

  /* 
  When we are always modifying the last editorState in the history array.
  Adding:
    history = [  <-Add "first"
    ["first"],   <-Add "second"
    ["first", "second"],  <- Add "third"  
    ["first", "second", "third"]
    ]

  Deleting:
    history = [  <-Add "first"
    ["first"],   <-Add "second"
    ["first", "second"],  <- Add "third"  
    ["first", "second", "third"]  <- Delete the last word
    ["first", "second"],
    ]

    Editing:
    history = [  <-Add "first"
    ["first"],   <-Add "second"
    ["first", "second"],    <-Add "third"
    ["first", "second", "third"] <- Edit the last word
    ["first", "second", "fourth"]
    ]
--------------------------------
  When we are modifying the editorState which is in the middle of the array.
    Adding:
    history = [  <-Add "first"
    ["first"],   <-Add "second"
    ["first", "second"],  <- Add "third"   <- Add "fourth" 
    ["first", "second", "fourth"]

    ["first", "second", "third"] <- undo  ----- Delete this
    ]

    Deleting:
    history = [  <-Add "first"
    ["first"],   <-Add "second"
    ["first", "second"],  <- Add "third"  
    ["first", "second", "third"]  <- Delete the last word
    ["first", "second"], <- undo
    ]

  */

  /**  Move indexOfStateToDisplay closer to the start of the array */
  undo = () => {
    if (this.indexToDisplay > 0) {
      this.indexToDisplay--;
      this.editorState = this.history[this.indexToDisplay];
    } else if (this.indexToDisplay <= 0) {
      this.indexToDisplay = -1; // Don't allow the index to go below 0.
      this.editorState = [];
    }
  };

  /** Move indexOfStateToDisplay closer to the end of the array */
  redo = () => {
    const lastIndexOfHistory = this.history.length - 1;
    if (this.indexToDisplay < lastIndexOfHistory) {
      this.indexToDisplay++;
      this.editorState = this.history[this.indexToDisplay];
    } else {
      // Display the last editorState in the history array.
      this.editorState = this.history[lastIndexOfHistory];
    }
  };

  /** Takes the current state of what's displayed in the editor and return it as a string.  */
  toString = () => { 
    return this.editorState.join(" ");
  };
}

export default Editor;
