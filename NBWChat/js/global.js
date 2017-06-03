var flashconfig = {
    id: 'nbwchat', src: 'flashchat20.swf?update=20,35', version: [9, 115], width: '105', height: '16', allowScriptAccess: 'always', wmode: 'transparent',
    onFail: function () {
        document.getElementById("nbflashchat20").innerHTML = "<div id=\"flashfailnotice\">Flash plugin is not installed or it is disabled in your browser.</div>"
            + flashembed.getHTML({ id: 'nbwchat', src: 'flashchat20.swf?update=20,35', wmode: 'opaque' });
    }
};
var ircserverips = "167.114.203.99";
var ircserverport = "6668";
