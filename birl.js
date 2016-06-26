var path = require("path")
  , pressed = {}
  , key_down = null
  , editorView = null
;

function handleKeyDown (event) {
	if (!pressed[event.keyCode]) {
		pressed[event.keyCode] = true;

		if (event.keyCode === 13) {
			key_down = new Audio(path.join(__dirname, "audio/porra.mp3"));
			key_down.play();
		} else if (event.keyCode === 8) {
      key_down = new Audio(path.join(__dirname, "audio/eitaporra.mp3"));
      key_down.play();
    } else {
      key_down = new Audio(path.join(__dirname, "audio/birl.mp3"));
      key_down.play();
    }
	}
}

function handleKeyUp (event) {
	pressed[event.keyCode] = false;
}

module.exports = {
	activate: function (state) {
		atom.workspace.observeTextEditors(function (editor) {
      editorView = atom.views.getView(editor);

			editorView.addEventListener('keydown', handleKeyDown);
			editorView.addEventListener('keyup', handleKeyUp);
		});
	},

	deactivate: function () {
		atom.workspace.observeTextEditors(function (editor) {
      editorView = atom.views.getView(editor);

			editorView.removeEventListener('keydown', handleKeyDown);
			editorView.removeEventListener('keyup', handleKeyUp);
		});
	}
};
