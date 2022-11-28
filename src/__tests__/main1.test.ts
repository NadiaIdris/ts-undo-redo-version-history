import Editor from "../main1";

test("add word works", () => {
  const editor = new Editor();
  editor.add("first");
  editor.add("second");
  console.log(editor)
  // expect(editor.editorState).toEqual(["first", "second"]);
  // expect(editor.history).toEqual([ [ "first" ], [ "first", "second" ] ]);
});

// test("deleteLastWord works", () => {
//   const editor = new Editor();
//   editor.add("first");
//   editor.add("second");
//   editor.delete();
//   expect(editor.editorState).toEqual(["first"]);
//   expect(editor.history).toEqual([["first"], ["first", "second"], ["first"]]);
// });

// test("undo works", () => {
//   const editor = new Editor();
//   editor.add("first");
//   editor.add("second");
//   editor.add("third");
//   editor.undo();
//   expect(editor.editorState).toEqual(["first", "second"]);
//   editor.undo();
//   expect(editor.editorState).toEqual(["first"]);
//   editor.undo();
//   expect(editor.editorState).toEqual([]);
//   expect(editor.history).toEqual([["first"], ["first", "second"], ["first", "second", "third"]]);
// });

// test("redo works", () => {
//   const editor = new Editor();
//   editor.add("first");
//   editor.add("second");
//   editor.add("third");
//   editor.undo();
//   editor.redo();
//   expect(editor.editorState).toEqual(["first", "second", "third"]);
//   // Walkin down to the first state.
//   editor.undo();
//   expect(editor.editorState).toEqual(["first", "second"]);
//   editor.undo();
//   expect(editor.editorState).toEqual(["first"]);
//   editor.undo();
//   expect(editor.editorState).toEqual([]);

//   // Walkin up to the last state.
//   editor.redo();
//   expect(editor.editorState).toEqual(["first"]);
//   editor.redo();
//   expect(editor.editorState).toEqual(["first", "second"]);
//   editor.redo();
//   expect(editor.editorState).toEqual(["first", "second", "third"]);
//   editor.redo();
//   expect(editor.editorState).toEqual([ "first", "second", "third" ]);
//   expect(editor.history).toEqual([["first"], ["first", "second"], ["first", "second", "third"]]);
// });

// test("add word to the middle of the history array works", () => {
//   const editor = new Editor();
//   editor.add("first"); // [["first"]]
//   editor.add("second"); // [["first"], ["first", "second"]]
//   editor.add("third"); // [["first"], ["first", "second"], ["first", "second", "third"]]
//   editor.undo(); // ["first", "second"]
//   editor.add("fourth"); // [["first"], ["first", "second"], ["first", "second", "fourth"]]
//   expect(editor.editorState).toEqual(["first", "second", "fourth"]);
//   expect(editor.history).toEqual([ [ "first" ], [ "first", "second" ], [ "first", "second", "fourth" ] ]);
// });

// test("delete word from the middle of the history array works", () => {
//   const editor = new Editor();
//   editor.add("first"); // [["first"]]
//   editor.add("second"); // [["first"], ["first", "second"]]
//   editor.add("third"); // [["first"], ["first", "second"], ["first", "second", "third"]]
//   editor.undo(); // ["first", "second"]
//   editor.delete(); // [["first"], ["first", "second"], ["first"]]
//   expect(editor.editorState).toEqual(["first"]);
//   expect(editor.history).toEqual([["first"], ["first", "second"], ["first"]]);
//   // Delete the first word.
//   editor.undo(); // ["first", "second"]
//   editor.undo(); // ["first"]
//   editor.delete(); // []
//   expect(editor.editorState).toEqual([]);
//   expect(editor.history).toEqual([ [ "first" ], [] ]);
// });

// test("edit word from the middle of the history array works", () => {
//   const editor = new Editor();
//   editor.add("first"); // [["first"]]
//   editor.add("second"); // [["first"], ["first", "second"]]
//   editor.add("third"); // [["first"], ["first", "second"], ["first", "second", "third"]]
//   editor.undo(); // ["first", "second"]
//   editor.edit("fourth"); // [["first"], ["first", "second"], ["first", "fourth"]]
//   expect(editor.editorState).toEqual([ "first", "fourth" ]);
//   expect(editor.history).toEqual([ [ "first" ], [ "first", "second" ], [ "first", "fourth" ] ]);
//  })
