// JScript source code
var userAgent = navigator.userAgent.toLowerCase();
//alert(userAgent);
var isIE = (userAgent.indexOf('msie') !== -1);
var isFF = (userAgent.indexOf('firefox') !== -1);
var isWK = (userAgent.indexOf('webkit') !== -1);
var dtTmssaved = false;
//Update(01-Oct-2014): protection against time and version reply flooding. --Mike
var waiterror = false;
var waittime = false;
var waitnotice = false;
var waittimereply = false;
var waitversion = false;
var waityoutubect = false;
var ytcount = 0;
//Update(16-May-2016): protection against knock flooding. --Mike
var waitknock = false;
var waitwhispersound = false;
var chatflash = '';
var sURIFUIDIR2 = '';
var pageFontsize = '';
var sendFontfamily = null;
var sendFontcolor = null;
var sendFontweight = null;
var sendFontstyle = null;
var whisperzindex = 11;
var whisperoffset = 0;
if (window.sFUIDIR === undefined) { sFUIDIR = ''; sFUIDIR2 = ''; }
else {
	sFUIDIR2 = sFUIDIR + '/';
	var sTPN = window.location.pathname.replace(/chatui.aspx|chatui.php|\/c\/?.*/i, "");
	var hostport = ":" + window.location.port;
	sURIFUIDIR2 = "http://" + window.location.hostname + hostport + sTPN + sFUIDIR2;
}
var aaTagged = new Array();
var staffIgnore = ["^Bot_Iggy"];
var sMsg = '';
var sIcoDir = 'images/listicons/';
var sIcoDir2 = 'images/listicons/';
var sIcoDir3 = 'images/top_menu/';
var arListIcons = new Array();
arListIcons["ico_spect"] = 'spect.png';
arListIcons["ico_away"] = 'away.png';
arListIcons["ico_nogender"] = 'nogender.png';
arListIcons["ico_nogenderwpic"] = 'nogenderwpic.png';
arListIcons["ico_female"] = 'female.png';
arListIcons["ico_femalewpic"] = 'femalewpic.png';
arListIcons["ico_male"] = 'male.png';
arListIcons["ico_malewpic"] = 'malewpic.png';
arListIcons["ico_spacer"] = 'noprofile.png';
arListIcons["ico_staff"] = 'staff.png';
arListIcons["ico_superowner"] = 'superowner.png';
arListIcons["ico_owner"] = 'owner.png';
arListIcons["ico_ignore"] = 'ignore.png';
arListIcons["ico_host"] = 'host.png';
arListIcons["ico_helpop"] = 'helpop.png';
arListIcons["ico_tagged"] = 'tagged.png';
arListIcons["ico_servicerm"] = 'rmicon_srv.png';
arListIcons["ico_regrm"] = 'rmicon_user.png';
arListIcons["ico_blank"] = 'spacer.gif';
var ptxSend = null;
var pChatPane = null;
var pwndGLD = null, ptxGLN = null, ppwGuest = null, ptxGLDErrorMessage = null;
var olvUsers = null;
var flashObj = null; idIntIsWbrLoadedPtr = 0;
var IsGuestInfoSet = false;
var plbMe = null, puicoMe = null, ouserMe = null, cmnuSelMe = false; var flashsckloaded = false; var strGuestPass = '';
var m_sChan = '', pchanIco = null, ptxChan = null, ptxChanModes = null, ptxNumberOfUser = null;
var dMyDate = new Date();
var FlashWindowEnabled = false;
var paturl = "https?://(\\w*:\\w*@)?[-\\w.]+(:\\d+)?(/([^\\s[]*(\\?[^\\s]+)?)?)?", pattag = "<.*?>|\\[style .*?\\]|\\[\/.*?\\]|\\[br\\]|<|>";
var reHTMLFRMTTAGS = /\bspan\b|\bfont\b|\bb\b|\bi\b|\bu\b/i;
var reInlineScript = /\son\w.*?=/i;
var reBBCODES = /\[style.*?\]|\[\/style\]/i;
var reBBCODES_SUB = /ff:.+?;|co:.+?;|bgco:.+?;|b;|i;|u;|\bundefined\b/ig;
var aTagNeedClosing = new Array();
var re = null;
var tmpUser = new Object();
tmpUser.pUser = { nick: null, ident: null, host: null, ilevel: 0, iprofile: NoProfile, away: false, awaymsg: "", voice: false, tagged: false };
var sDspFrmt = '', bCorpText = true;
var sAwayMsg = '';
var bDspArrivals = true, bDspStatusChg = true, bDspDeparts = true;
var bSndArrival = true, bSndKick = true, bSndTagged = true, bSndInvites = true, bSndWhisp = true;
var bEmotsOff = false, bTextFrmtOff = false;
var bWhispOff = false, bTimeStampOn = false;
var XmlNullChar = '$1a2XMLNULL2a1$';
var IsStaff = 128, IsSuperOwner = 64, IsOwner = 32, IsHost = 16, IsHelpOp = 8;
var NoProfile = 0, NoGender = 1, NoGenderWPic = 2, Female = 3, FemaleWPic = 4, Male = 5; MaleWPic = 6;
var Is_m_Mode = false, Is_x_Mode = false;
var Modes = new Array(5); Modes[0] = Modes[1] = Modes[2] = Modes[3] = Modes[4] = "";
var KEY_UP = 38, KEY_DOWN = 40, KEY_BACKSPACE = 8;
var UPDATEUSER_TEXT = 0, UPDATEUSER_FORMATING = 1, UPDATEUSER_ICON = 2, UPDATEUSER_ICON2 = 3;
var WHISP_IN = 1, WHISP_OUT = 2;
var USER_GUEST = 0, USER_REG = 1;
var CMD_KICK = 0, CMD_KICKBAN15M = 1, CMD_KICKBAN1H = 2, CMD_KICKBAN24H = 3;
var sSiteURL = '';
var iUserLoggin = 0;
var MChatPaneLines = 0, MChatPaneMaxLines = 250;
var MChatPaneTemp = "";
var lstPendingActions = new Array();
var imgBtnProfileDisabled = sFUIDIR + '/images/profile-grey.png';
var imgBtnProfileEnabled = sFUIDIR + '/images/profile.png';
var imgBtnWhispDisabled = sFUIDIR + '/images/whisper-grey.png';
var imgBtnWhispEnabled = sFUIDIR + '/images/whisper.png';
var imgBtnIgnoreDisabled = sFUIDIR + '/images/iggy-grey.png';
var imgBtnIgnoreEnabled = sFUIDIR + '/images/iggy.png';
var imgBtnTagEnabled = sFUIDIR + '/images/tag.png';
var imgBtnTagDisabled = sFUIDIR + '/images/tag-grey.png';
var imgBtnSendHover = sFUIDIR + '/images/button_send_hover.png';
var imgBtnAction = sFUIDIR + '/images/button_action.png';
var imgIconAway = sFUIDIR + '/images/listicons/away.png';
var imgIconTag = sFUIDIR + '/images/listicons/tag.png';
var imgBtnEmotes = sFUIDIR + '/images/button_emotes.png';
var imgBtnColorsel = sFUIDIR + '/images/colorsel.png';
var imgBtnMenubg = sFUIDIR + '/images/menubg.png';
// Update Aug 12 2015 Extra Settings
var bInviteOn = false;
var bPiconsOn = false;
var bUnoticeOn = false;
//Update Jan 18 2017 Add URL Management
var bUrlOn = false;
var bSafeUrlCheckOn = false;
//Update Apr 2017 Youtube support
var bYoutubeUrl = 1;
text_truncate = function (str, length, ending) {
	if (length == null) {
		length = 100;
	}
	if (ending == null) {
		ending = '...';
	}
	if (str.length > length) {
		return str.substring(0, length - ending.length) + ending;
	} else {
		return str;
	}
};

function fnPreloadUIImages() {
	MM_preloadImages(
		imgBtnProfileDisabled,
		imgBtnProfileEnabled,
		imgBtnWhispDisabled,
		imgBtnWhispEnabled,
		imgBtnIgnoreDisabled,
		imgBtnIgnoreEnabled,
		imgBtnTagEnabled,
		imgBtnTagDisabled,
		imgBtnSendHover,
		imgBtnAction,
		imgIconAway,
		imgIconTag,
		imgBtnEmotes,
		imgBtnColorsel,
		imgBtnMenubg
	);
}

//<Utility Functions>
function YouTubeGetID(url) {
	var ID = '';
	url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	if (url[2] !== undefined) {
		ID = url[2].split(/[^0-9a-z_\-]/i);
		ID = ID[0];
	}
	return ID;
}
setInterval("cleanPendingActionsList()", 30000);

function cleanPendingActionsList() {
	if (lstPendingActions.length > 0) {

		var currentTimeL = new Date();

		for (var i = 0; i < lstPendingActions.length; i++) {
			var timeDiffL = (currentTimeL - lstPendingActions[i].added) / (1000 * 60);

			if (lstPendingActions[i].timeout < timeDiffL) {
				lstPendingActions.splice(i, 1);
			}
		}
	}
}

function DebugWhisp(loc, _var) {
	if (wndDebugIsOpen == true) {
		dbLines++;
		wndDebug.document.write("(" + dbLines + "): " + loc + ":: " + _var + "<br />");
	}
}

function debugOutput(ex, loc) {
	if (typeof (ex.message) != 'undefined') {
		fnAppendText(ex.message + '; location:' + loc);
		DebugWhisp(loc, ex.message);
	}
	else {
		fnAppendText(ex + '; location:' + loc);
		DebugWhisp(loc, ex);
	}
}

//</Utility Functions>

RegExp.escape = function (text) {
	if (!arguments.callee.sRE) {
		var specials = [
			'/', '.', '*', '+', '?', '|', '$',
			'(', ')', '[', ']', '{', '}', '\\', '^'
		];
		arguments.callee.sRE = new RegExp(
			'(\\' + specials.join('|\\') + ')', 'gi'
		);
	}
	return text.replace(arguments.callee.sRE, '\\$1');
}

function BuildTextReplacerPattern() {
	strcol = '';
	for (var colitem in colRepl) strcol += RegExp.escape(colitem) + '|';

	if (strcol.length > 0) {
		strcol = pattag + "|" + paturl + "|" + "(" + strcol.substr(0, strcol.length - 1) + ")(?!\\/.+\\])";
	}
	else {
		strcol = pattag + "|" + paturl;
	}

	re = new RegExp(strcol, 'gi');
}
BuildTextReplacerPattern();

function MM_preloadImages() { //v3.0
	var d = document; if (d.images) {
		if (!d.MM_p) d.MM_p = new Array();
		var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
			if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
	}
}

function MM_swapImgRestore() { //v3.0
	var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
}

function MM_findObj(n, d) { //v4.01
	var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
		d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
	}
	if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
	for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
	if (!x && d.getElementById) x = d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
	var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2); i += 3)
		if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
}

function fnEnterKey(e) {
	if (e == null) e = window.event;

	if (e.keyCode == 13) {
		onGuestLoginDialogReturn();
	}
}

function fnCheckKey(e) {
	if (e == null) e = window.event;

	if (e.keyCode == 13) {
		fnCPAppendText();
	}

	//debugOutput("ctrlkey: " + e.ctrlKey + ", keycode: " + e.keyCode + ", which" + e.which, "fnCheckKey");
	if (e.ctrlKey == true && e.shiftKey == true) {
		if (isIE) {
			switch (e.keyCode) {
				case 1:
					onBtnAction();
					break;

				case 13:
					ptxSend.focus();
					break;
			}
		}
		else {
			switch (e.which) {
				case 65:
					onBtnAction();
					break;

				case 13:
					ptxSend.focus();
					break;
			}
		}
	}
}

function GetFormattedNickMe() {
	var frmtedNick;
	if (aaTagged[ouserMe.nick] == true) frmtedNick = '<span class="cpnicktaggedlocaluser">' + getUserLabel(ouserMe.nick) + '</span>';
	else if (ouserMe.away == true) frmtedNick = '<span class="cpnickawaylocaluser">' + getUserLabel(ouserMe.nick) + '</span>';
	else frmtedNick = '<span class="cpnicklocaluser">' + getUserLabel(ouserMe.nick) + '</span>';

	return frmtedNick;
}
function FormatFromByNick(sFrom) {
	return (aaTagged[sFrom] == true) ? '<span class="cpnicktaggeduser">' + getUserLabel(sFrom) + '</span>&nbsp;:&nbsp;' : '<span class="cpnickuser">' + getUserLabel(sFrom) + '&nbsp;:&nbsp;</span>';
}
function FormatFromByUser(uFrom) {
	try {
		var frmtedNick;
		if (aaTagged[uFrom.nick] == true) frmtedNick = '<span class="cpnicktaggeduser">' + getUserLabel(uFrom.nick) + '</span>&nbsp;:&nbsp;';
		else if (uFrom.away == true) frmtedNick = '<span class="cpnickawayuser">' + getUserLabel(uFrom.nick) + '</span>&nbsp;:&nbsp;';
		else frmtedNick = '<span class="cpnickuser">' + getUserLabel(uFrom.nick) + '&nbsp;:&nbsp;</span>';

		return frmtedNick;
	}
	catch (ex) {
		debugOutput(ex, 'FormatFromByUser');
	}

}

function isHtmlTag(str) {
	if (str.charAt(0) == "<" && str.charAt(str.length - 1) == ">") return true;
	if (str.indexOf("<") >= 0) return true;

	return false;
}

function addTagNeedClosing(etag) {
	//current bbcode tags: stl [style]
	aTagNeedClosing.push(etag);
}

function remTagNeedClosing(etag) {
	for (var i = (aTagNeedClosing.length - 1); i >= 0; i--) {
		if (etag == aTagNeedClosing[i]) {
			switch (aTagNeedClosing[i]) {
				case '[/STYLE]':
					aTagNeedClosing.splice(i, 1);
					return '</span>';
			}

		}
	}

	return null;
}

function IsTagClosings() {
	return (aTagNeedClosing.length > 0) ? true : false;
}

function closeRemaingTags() {
	var strClosingTags = '';

	for (var i = 0; i < aTagNeedClosing.length; i++) {
		switch (aTagNeedClosing[i]) {
			case "[/STYLE]":
				strClosingTags += "</span>";
				break;
		}
	}

	aTagNeedClosing.splice(0, aTagNeedClosing.length);

	return strClosingTags;
}

function UnescapeSpecialChars(str) {
	str = str.replace(/[\\]/g, '\\');
	str = str.replace(/[\b]/g, '\\b');
	str = str.replace(/[\n]/g, '\\n');
	str = str.replace(/[\r]/g, '\\r');
	str = str.replace(/[\f]/g, '\\f');

	//str = str.replace(/[&]/g,'&amp;');
	//str = str.replace(/[\]/g,'\\f');
	//str = str.replace(/[\f]/g,'\\f');
	return str;
}

function ParseTextMessage(str) {
	return (bEmotsOff == true) ? ParseTextMessage2(str, false) : ParseTextMessage2(str, true);
}
function FixHexColorIfHexCode(str_color) {
	if (str_color === 'undefined') return '';

	if (str_color.length == 0) return '';

	if (str_color[0] == '#') return str_color;

	if (str_color.match(/^[a-f0-9]{1,6};{0,1}$/i) !== null) {
		return '#' + str_color;
	}

	return str_color;
}

var RenderOptions = (function () {
	function RenderOptions() {
		this.RenderEmots = false;
		this.RenderLinks = false;
	}
	return RenderOptions;
}());

function ParseTextMessage2(str, rendEmots) {
	var ro = new RenderOptions();
	ro.RenderEmots = rendEmots;
	ro.RenderLinks = bUrlOn == false;
	return ParseTextMessage3(str, ro);
}

function ParseTextMessage3(str, ro) {
	//ToDo: optimizations and html tag striping
	var regret = null, bbcoderet = null;
	var strtmp = '', strsubtmp = '', pos1 = 0, bSanitize = true;
	var spancount = 0;

	while (true) {
		regret = re.exec(str);

		if (regret != null) {
			if (isHtmlTag(regret[0])) {
				//edit begin
				if (regret[0].length > 0) {
					regret[0] = sanitizeHtml(regret[0]);
					strtmp += str.slice(pos1, regret.index) + regret[0];
					pos1 = re.lastIndex;
				}
				//edit end
			}
			else if (regret[0].indexOf("[br]") == 0) {
				strtmp += str.slice(pos1, regret.index) + "<br />";
				pos1 = re.lastIndex;
			}
			else if (regret[0].search(reBBCODES) >= 0) {
				//edit begin
				if (bTextFrmtOff != true) {
					strsubtmp = '';

					while (true) {
						bbcoderet = reBBCODES_SUB.exec(regret[0]);

						if (bbcoderet != null) {
							if (bbcoderet[0].indexOf("ff:") == 0) {
								strsubtmp += 'font-family:' + bbcoderet[0].substr(3);
							}
							else if (bbcoderet[0].indexOf("bgco:") == 0) {
								strsubtmp += 'background-color:' + FixHexColorIfHexCode(bbcoderet[0].substr(5));
							}
							else if (bbcoderet[0].indexOf("co:") == 0) {
								strsubtmp += 'color:' + FixHexColorIfHexCode(bbcoderet[0].substr(3));
							}
							else if (bbcoderet[0].indexOf("b;") == 0) {
								strsubtmp += 'font-weight:bold;';
							}
							else if (bbcoderet[0].indexOf("i;") == 0) {
								strsubtmp += 'font-style:italic;';
							}
							else if (bbcoderet[0].indexOf("u;") == 0) {
								strsubtmp += 'text-decoration:underline;';
							}
							else {
								strsubtmp += 'undefined;';
							}
						}
						else break;
					}
				}
				else {
					strsubtmp = 'txtfrmttingoff';
				}

				if (strsubtmp.length > 0) {
					regret[0] = '<span style="' + strsubtmp + '">';
					addTagNeedClosing('[/STYLE]');
					strtmp += str.slice(pos1, regret.index) + regret[0];
					pos1 = re.lastIndex;
				}
				else {
					strsubtmp = remTagNeedClosing(regret[0].toUpperCase());
					if (strsubtmp != null) {
						strtmp += str.slice(pos1, regret.index) + strsubtmp;
						pos1 = re.lastIndex;
					}
				}
				//edit end
			}
			else if (regret[0].search(paturl) != -1) {
				if (ro.RenderLinks) {
					//Note: in channel list render link will be false so no need to handle youtube links here for channel list. 29-Jul-2017 HY
					if (YouTubeGetID(regret[0])) {
						if (bYoutubeUrl == 2) {
							if (!waityoutubect) {
								waityoutubect = true;
								setTimeout(function () {
									waityoutubect = false;
								}, 2000);
								var youtubeID = YouTubeGetID(regret[0]);
								ytcount++;
								strtmp += str.slice(pos1, regret.index) + "<a href='" + regret[0] + "' target='_blank'>" + regret[0] + "</a>";
								$.getJSON("https://www.googleapis.com/youtube/v3/videos", {
									key: "AIzaSyDAUcNMLQGLCC57fr6cchMAUUlqUSNYiQg",
									part: "snippet,statistics",
									id: youtubeID
								}, function (data) {
									if (data.items.length === 0) {
										return;
									}
									$("#ChatPane").contents().find("#cpbody").append("<div class='ytbox' id='ytbox_" + ytcount + "'><div class='ytloading'><img src='" + sFUIDIR + "/images/loading.gif' alt='' /> loading title...</div></div>");
									ytoutput = "<div class='ytholdertitle'><div id='vidid_" + ytcount + "'><div style='display:inline;font-weight:bold;color:black;margin-right:2px;'>You</div><div style='display:inline;font-weight:bold;color:white;background-color:red;margin-right:5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;padding:0 2px;'>Tube</div><a id='ytxout_" + ytcount + "' href='#'>x</a> - <a target='_blank' href='https://www.youtube.com/watch?v=" + youtubeID + "'>" + data.items[0].snippet.title + "</a></div></div>";
									setTimeout(function () {
										showvid(ytoutput, ytcount, 2);
									}, 1000);
								});
							}
						}
						else if (bYoutubeUrl == 3) {
							if (!waityoutubect) {
								waityoutubect = true;
								setTimeout(function () {
									waityoutubect = false;
								}, 2000);
								var youtubeID = YouTubeGetID(regret[0]);
								ytcount++;
								strtmp += str.slice(pos1, regret.index) + "<a href='" + regret[0] + "' target='_blank'>" + regret[0] + "</a>";
								$.getJSON("https://www.googleapis.com/youtube/v3/videos", {
									key: "AIzaSyDAUcNMLQGLCC57fr6cchMAUUlqUSNYiQg",
									part: "snippet,statistics",
									id: youtubeID
								}, function (data) {
									if (data.items.length === 0) {
										return;
									}
									$("#ChatPane").contents().find("#cpbody").append("<div class='ytbox' id='ytbox_" + ytcount + "'><div class='ytloading'><img src='" + sFUIDIR + "/images/loading.gif' alt='' /> loading video...</div></div>");
									ytoutput = "<div class='ytholder'><a class='videolink' target='_blank' href='https://www.youtube.com/watch?v=" + youtubeID + "'><span></span><img src='https://img.youtube.com/vi/" + youtubeID + "/0.jpg' alt='' /></a><div class='ytxout'><a id='ytxout_" + ytcount + "' href='#'>x</a></div><div class='ytvideotitle' id='vidid_" + ytcount + "'>" + text_truncate(data.items[0].snippet.title, 80, '...') + "</div><div class='ytvideodesc'>" + text_truncate(data.items[0].snippet.description, 80, '...') + "</div><div style='font-size:10px;float:right;display:inline;font-weight:bold;color:white;background-color:red;margin-right:5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;padding:0 2px;'>Tube</div><div style='font-size:10px;float:right;display:inline;font-weight:bold;color:black;margin-right:2px;'>You</div></div>";
									setTimeout(function () {
										showvid(ytoutput, ytcount, 3);
									}, 1000);
								});
							}
						}
						else {
							strtmp += str.slice(pos1, regret.index) + "<a href='" + regret[0] + "' target='_blank'>" + regret[0] + "</a>";
						}
					}
					else {
						strtmp += str.slice(pos1, regret.index) + "<a href='" + regret[0] + "' target='_blank'>" + regret[0] + "</a>";
					}

				}
				else {
					//old code, commented 29-jul-2017 HY
					//strtmp += str.slice(pos1, regret.index) + "<span style=\"color:blue;\">-URLs Blocked in Options-</span>";
					strtmp += str.slice(pos1, regret.index) + "<a href='#' target='_blank' disabled='disabled' style='pointer-events: none;' onclick='return false;'>" + regret[0] + "</a>";
				}
				pos1 = re.lastIndex;
			}
			else {
				//debugOutput(rendEmots ,'ParseTextMessage2');
				if (ro.RenderEmots == true) {
					//var checkdoline = '';
					regret[0] = colRepl[regret[0].toLowerCase()];
					//checkdoline = regret[0].indexOf("doline");
					//if (regret[0] != undefined && checkdoline == -1) {
					if (regret[0] != undefined) {
						strtmp += str.slice(pos1, regret.index) + '<img class="emotestyle" src="' + sEmotsDir + regret[0] + '" border="0" />';
						pos1 = re.lastIndex;
					}
				}
			}
		}
		else break;
	}

	if (pos1 < str.length) strtmp += str.slice(pos1);
	if (IsTagClosings()) strtmp += closeRemaingTags();

	//alert(UnescapeSpecialChars(strtmp));
	return UnescapeSpecialChars(strtmp);
}

function showvid(content, id, vtype) {
	$("#ChatPane").contents().find("#ytbox_" + id).html(content);
	ScrollFix();
}
function IsMyDispFormatGood() {
	if (bTextFrmtOff == true) return false;
	if (typeof (sDspFrmt) == 'undefined') return false;
	if (sDspFrmt.length == 0) return false;

	return true;
}

function FormatSendTextMessage(str) {
	return (IsMyDispFormatGood() == true) ? '[style ' + sDspFrmt + ']' + str + '[/style]' : str;
}

//function FormatWWSendTextMessage(str)
//{
//    alert(sDspFrmt); //window.opener.
//    return '<span style="'+sDspFrmt+'">'+str+'</span>';
//}

function RenderPrivmsg(sFrom, str) {
	fnAppendText(FormatFromByNick(sFrom) + ParseTextMessage(str));
}
function RenderPrivmsg2(puser, str) {
	if (puser.ilevel >= IsHelpOp) {
		fnAppendText('<img unselectable="on" src="' + fnGetIco(puser) + '" border="0" class="lvuitemico" /><a class="usernickclick" style="text-decoration:none;" href="javascript:;" onclick="usernickclick(\'' + puser.nick + '\');">' + FormatFromByUser(puser) + '</a>' + ParseTextMessage(str));
	}
	else {
		if (bPiconsOn == false) {
			fnAppendText('<img style="height:16px;width:16px;margin-bottom:2px;" unselectable="on" src="' + fnGetIco(puser) + '" border="0" class="lvuitemico" /><a style="text-decoration:none;" href="javascript:;" onclick="usernickclick(\'' + puser.nick + '\');">' + FormatFromByUser(puser) + '</a>' + ParseTextMessage(str));
		}
		else {
			fnAppendText('<span class="cpblankicospace"></span><a style="text-decoration:none;" href="javascript:;" onclick="usernickclick(\'' + puser.nick + '\');">' + FormatFromByUser(puser) + '</a>' + ParseTextMessage(str));
		}
	}
}
function RenderWhisp(sFrom, str, wnd) {
	wnd.fnAppendText(FormatFromByNick(sFrom) + ParseTextMessage(str));
}
function clearChatPane() {
	_pcpbody.innerHTML = '';
}
function amPm(tsb) {
	var ampm = tsb >= 12 ? 'p' : 'a';
	return ampm;
}
function TwelveHour(ts) {
	if (ts > 12) {
		ts -= 12;
	} else if (ts === 0) {
		ts = 12;
	}
	return ts;
}
function FormatTimeNums(tn) {
	if (tn < 10) return tn = "0" + tn;
	return tn;
}

function fnAppendText(str) {
	bSkipCPScroll = true;
	if (bTimeStampOn == true) {
		var dtTms = new Date();
		// Update(15-Aug-2016): addition of date stamp bar	
		var dtTmsn = dtTms.getDate() + " " + monthNames[dtTms.getMonth()] + " " + dtTms.getFullYear();
		var tms = "<span class='timestamp'>[" + FormatTimeNums(TwelveHour(dtTms.getHours())) + ":" + FormatTimeNums(dtTms.getMinutes()) + "" + amPm(dtTms.getHours()) + "]</span>&nbsp;";
		if (!dtTmssaved || dtTmssaved != dtTmsn) {
			dtTmssaved = dtTmsn;
			var tmsline = "<div class='timeline'><span>" + dtTmsn + "</span></div>";
			str = tmsline + tms + str;
		}
		else {
			str = tms + str;
		}
	}
	$("#ChatPane").contents().find("#cpbody").append('<div class="linebreakindenter">' + str + '</div>');
	if (isIE) {
		if (bSkipCPScrollCall == false) { autoCPScroll(ChatPane.document.body); }
	}
	else {
		if (bSkipCPScrollCall == false) { autoCPScroll(pChatPane.contentDocument.body); }
	}
	MChatPaneLines++;
	if (MChatPaneLines > (MChatPaneMaxLines - 75)) storeText('<div class="linebreakindenter">' + str + '</div>');
	fnNewMessageVisualIndicator();
}
function fnAppendText2(str) {
	bSkipCPScroll = true;
	if (isIE) {
		ChatPane.document.body.insertAdjacentHTML('beforeEnd', str);
		if (bSkipCPScrollCall == false) autoCPScroll(ChatPane.document.body);
	}
	else {
		var oSpan = document.createElement('div');
		oSpan.innerHTML = str;
		pChatPane.contentDocument.body.appendChild(oSpan);
		if (bSkipCPScrollCall == false) autoCPScroll(pChatPane.contentDocument.body);
	}
	MChatPaneLines = 25;
}

function fnNewMessageVisualIndicator() {
	if (FlashWindowEnabled) document.body.focus();
}
function storeText(str) {
	if (bCorpText) {
		MChatPaneTemp += str;
		if (MChatPaneLines > MChatPaneMaxLines) {
			MChatPaneLines = 0;
			clearChatPane();
			fnAppendText2(MChatPaneTemp);
			MChatPaneTemp = '';
		}
	}
}
function clearChatPane() {
	if (isIE)
		ChatPane.document.body.innerText = "";
	else
		pChatPane.contentDocument.body.innerHTML = "";
}
function IsSendable() {
	if ((Is_m_Mode == true || Is_x_Mode == true) && (ouserMe.ilevel < IsHelpOp && ouserMe.voice == false)) {
		fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorsendable + "</span></span>");
		return false;
	}
	else return true;
}
function fnCPAppendText() {
	if (ptxSend.value.length > 0) {
		if (IsSendable()) {
			fnSend(ptxSend.value);
			fnNewInputMessage(ptxSend.value);
			ptxSend.value = ""; idxInputMessages = null;
		}
	}
	ptxSend.focus();
}

function IsWWSendable(puserTo, wnd) {
	if ((Modes[0].indexOf("w") >= 0 || Is_m_Mode == true || Is_x_Mode == true) && (ouserMe.ilevel < IsHelpOp && (ouserMe.voice == false || puserTo.voice == false) && puserTo.ilevel < IsHelpOp)) {
		wnd.fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorWWsendable + "</span></span>");
		return false;
	}
	else if (Modes[0].indexOf("W") >= 0 && (ouserMe.nick.charAt(0) == ">" || puserTo.nick.charAt(0) == ">") && (ouserMe.ilevel < IsHelpOp && puserTo.ilevel < IsHelpOp)) {
		wnd.fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + errorWWsendableb + "</span></span>");
		return false;
	}
	else return true;
}


function fnSend(str) {
	//ToDo: disable html input
	if (str.charAt(0) != '/') {
		//str = FormatSendTextMessage(str); //css formatting characters had problems like Font-Family:Paprus
		//alert('<img src="'+fnGetIco(ouserMe).substr(sFUIDIR2.length)+'" border="0" />');
		if (ouserMe.ilevel >= IsHelpOp) fnAppendText('<img src="' + fnGetIco(ouserMe) + '" border="0" unselectable="on" class="lvuitemico" />' + GetFormattedNickMe() + '&nbsp;:&nbsp;' + ParseTextMessage(FormatSendTextMessage(str)));
		else {
			if (bPiconsOn == false) {
				fnAppendText('<img style="height:16px;width:16px;margin-bottom:2px;" unselectable="on" src="' + fnGetIco(ouserMe) + '" border="0" class="lvuitemico" />' + GetFormattedNickMe() + '&nbsp;:&nbsp;' + ParseTextMessage(FormatSendTextMessage(str)));
			}
			else {
				fnAppendText('<span class="cpblankicospace"></span>' + GetFormattedNickMe() + '&nbsp;:&nbsp;' + ParseTextMessage(FormatSendTextMessage(str)));
			}
		}
		flashObj.sendToServer("PRIVMSG " + m_sChan + " :" + FormatSendTextMessage(str));

		return true;
	}
	else {
		return ProcessInterUserCommand(str.slice(1));
	}

	return false;
}

function fnConnect() {
	if (IsGuestInfoSet) flashObj.sckConnect();
	else onFlashSocketLoad();
	sendTostatus('<span class="status-connected">' + langr.l_connected + '</span>');
}

function fnReconnect() {
	flashObj.PSetReconnectTimer();
	sendTostatus('<span class="status-reconnect">' + langr.l_reconnecting + '</span>');
}

function fnDisconnect() {
	flashObj.sckDisconnect();
	fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_disconnected + "</span></span>");
	sendTostatus('<span class="status-disconnect">' + langr.l_disconnected + '</span>');
	onClearUserList();
	UpdateUserCount();
}

function ProcessInterUserCommand(sCmd) {
	switch (sCmd.split(" ", 1)[0].toUpperCase()) {
		case "RECONNECT":
			fnReconnect();
			break;

		case "CONNECT":
			fnConnect();
			break;

		case "DISCONNECT":
			fnDisconnect();
			break;

		case "CLEAR":
			clearChatPane();
			break;

		case "AWAY":
			ouserMe.away = false;
			ToggleAwayButton(sCmd.split(" ").slice(1).join(" "), 'cmdline');
			break;

		case "UNAWAY":
			ouserMe.away = true;
			ToggleAwayButton('', 'cmdline');
			break;

		//		case "FIXCHATPANE": 
		//			MChatPane.redraw(true); 
		//			break; 

		case "NICK":
			if (sCmd.split(" ")[1].length > 0) flashObj.sendToServer("NICK " + sCmd.split(" ")[1]);
			break;

		case "ME":
			fnAction(sCmd.split(" ").slice(1).join(" "));
			break;

		case "ENABLEFW":
			{
				FlashWindowEnabled = true;
				fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " <span class='msgfrmt2'>" + langr.l_flashwindowenabled + "</span></span></span>");
			}
			break;

		case "DISABLEFW":
			{
				FlashWindowEnabled = false;
				fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt2'>" + langr.l_flashwindowdisabled + "</span></span>");
			}
			break;

		case "DEBUGPRINT":
			{
				flashObj.DebugPrint();
			}
			break;

		case "SHOWGUESTPASSSTORED":
			{
				fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt2'>" + langr.l_guestpasswordstored + " " + flashObj.GetGuestuserPass() + "</span></span>");
			}
			break;
		case "SAVEGUESTPASS":
			{
				var strNewGuestPass = sCmd.split(" ")[1];
				if (strNewGuestPass.length > 0) {
					flashObj.SaveGuestuserPass(strNewGuestPass);
					strGuestPass = flashObj.GetGuestuserPass();
					fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt2'>" + langr.l_guestpasswordstored + " " + strGuestPass + "</span></span>");
				}
				else {
					fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorguestpass + "</span></span>");
				}
			}
			break;

		case "ROOMBROADCAST":

			if (ouserMe.ilevel >= IsOwner) {
				try {
					var sBCMsg = sCmd.split(" ").slice(1).join(" ");

					flashObj.sendToServer("NOTICE " + m_sChan + " " + m_sChan + " " + sBCMsg);

					onNoticeChanBroadcast(ouserMe.nick, m_sChan, sBCMsg);

				}
				catch (ex) {
					debugOutput(ex, "Commandline Function");
				}
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorsolevel + "</span></span>");
			}

			break;

		case "TOPIC":
			if (ouserMe.ilevel >= IsHost) {
				try {
					var sCLMsg = sCmd.split(" ").slice(1).join(" ");

					flashObj.sendToServer("PROP " + m_sChan + " TOPIC " + sCLMsg);

				}
				catch (ex) {
					debugOutput(ex, "Commandline Function");
				}
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorhlevel + "</span></span>");
			}
			break;

		case "WELCOME":
			if (ouserMe.ilevel >= IsHost) {
				try {
					var sCLMsg = sCmd.split(" ").slice(1).join(" ");

					flashObj.sendToServer("PROP " + m_sChan + " ONJOIN " + sCLMsg);

				}
				catch (ex) {
					debugOutput(ex, "Commandline Function");
				}
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorhlevel + "</span></span>");
			}
			break;

		case "+PROTECTIONMODE":
			if (ouserMe.ilevel >= IsHost) {
				try {

					flashObj.sendToServer("MODE " + m_sChan + " +P");

				}
				catch (ex) {
					debugOutput(ex, "Commandline Function");
				}
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorhlevel + "</span></span>");
			}
			break;

		case "-PROTECTIONMODE":
			if (ouserMe.ilevel >= IsHost) {
				try {

					flashObj.sendToServer("MODE " + m_sChan + " -P");

				}
				catch (ex) {
					debugOutput(ex, "Commandline Function");
				}
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorhlevel + "</span></span>");
			}
			break;

		case "KICK":
			fnIrcKickBan(sCmd.split(" ").slice(1).join(" "), CMD_KICK);
			break;

		case "BAN15M":
			fnIrcKickBan(sCmd.split(" ").slice(1).join(" "), CMD_KICKBAN15M);
			break;

		case "BAN1H":
			fnIrcKickBan(sCmd.split(" ").slice(1).join(" "), CMD_KICKBAN1H);
			break;

		case "BAN24H":
			fnIrcKickBan(sCmd.split(" ").slice(1).join(" "), CMD_KICKBAN24H);
			break;

		case "GUESTBAN":
			if (ouserMe.ilevel >= IsSuperOwner) {
				flashObj.sendToServer("ACCESS " + m_sChan + " ADD DENY >* 0 : GuestBan");
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_guestnowbanned + "<span class='errortype1'></span></span>");
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorslevel + "</span></span>");
			}
			break;

		case "GUESTUNBAN":
			if (ouserMe.ilevel >= IsSuperOwner) {
				flashObj.sendToServer("ACCESS " + m_sChan + " DELETE DENY >*");
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_guestbanremoved + "<span class='errortype1'></span></span>");
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorslevel + "</span></span>");
			}
			break;

		case "GUESTMIRCBAN":
			if (ouserMe.ilevel >= IsSuperOwner) {
				flashObj.sendToServer("ACCESS " + m_sChan + " ADD DENY >*1_* 0 : mIRC GuestBan");
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_mircguestnowbanned + "<span class='errortype1'></span></span>");
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorslevel + "</span></span>");
			}
			break;

		case "GUESTMIRCUNBAN":
			if (ouserMe.ilevel >= IsSuperOwner) {
				flashObj.sendToServer("ACCESS " + m_sChan + " DELETE DENY >*1_*");
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_mircgueatbanremoved + "<span class='errortype1'></span></span>");
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorslevel + "</span></span>");
			}
			break;

		case "INVITE":
			if (ouserMe.ilevel >= IsHost) {
				var inviteName = sCmd.split(" ").slice(1).join(" ");
				flashObj.sendToServer("INVITE " + inviteName + " " + m_sChan);
				fnAppendText("<span class='msgfrmtparent'><span class='invite'>" + langr.l_youareinvited_a + " " + inviteName + " " + langr.l_youareinvited_b + "</span></span>");
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorhlevel + "</span></span>");
			}
			break;

		case "?":
			listCommands();
			break;

		case "DEBUGWINDOW":
			wndDebug = window.open("WebchatMain/debug.htm", "wndDBug");
			wndDebugIsOpen = true;
			break;

		case "DEBUGCLEAR":
			wndDebug.document.body.innerHTML = "";
			break;

		case "INNERHTML":
			alert(ChatPane.document.body.innerHTML);
			break;
		case "VERSION":
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt2'>" + langr.l_version + " " + sVersion + ".</span></span>");
			break;
		case "HOP":
			window.location.reload();
			break;

		case "FIXSCROLL":
			ScrollFix();
			break;

		case "PASS":

			var strPass = prompt("Enter password:", "");
			//var strPass = "OWNERKEY " + m_Chan + " " + sCmd.split(" ").slice(1).join(" ");
			try {
				if (strPass.length > 0) {
					flashObj.sendToServer("OWNERKEY " + m_sChan + " " + strPass);
					flashObj.sendToServer("HOSTKEY " + m_sChan + " " + strPass);
				}
			}
			catch (ex) {
			}
			break;
		// Mike Addon 07/30/16
		case "PROPS":
			OpenPropsOptionsWnd();
			break;

		// Mike Addon 04/05/16
		case "MODES":
			OpenModesOptionsWnd();
			break;

		case "RAW":
			flashObj.sendToServer(sCmd.split(" ").slice(1).join(" "));
			break;

		case "TEST":
			//fnAppendText("<div class='whispreq' id='whispid123'><div id='abc123' style='color: #8b0000'><span class='cpnickuser'>TestNick</span> has sent you whispers (<a href='javascript:;' onclick='chromeTest();'>accept</a> | <a href='javascript:;' onclick='subdeclineWhisper(\"\", this);'>decline</a>).</div><div><span style='color: #8b0000'>Message:</span> " + ParseTextMessage("Test Message!") + "</div></div>");
			break;

		default:
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorcommand_a + " \"" + sCmd.split(" ", 1)[0] + "\" " + langr.l_errorcommand_b + "</span></span>");
			return false;
	}

	return true;
}

function listCommands() {
	fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt2'>" + langr.l_commandlinessupported + " " + sanitizeHtml("FixScroll, Reconnect, Disconnect, Hop, Clear, Away [<Away Message>], Unaway, Nick <Nickname>, DebugPrint, ShowGuestpassStored, SaveGuestpass <Guest Password>, Kick <kick message>, Ban15m <ban message>, Ban1h <ban message>, Ban24h <ban message>, Guestban, Guestunban, Guestmircban, Guestmircunban, INVITE <username>, TOPIC <topic message>, WELCOME <welcome message>, +/-PROTECTIONMODE") + ". Commands must start with /</span></span>");
	closeAllMenus();
}
function updateAwayButton(away) {
	if (away) {
	}
	else {
	}
}

var stkInputMessages = new Array();
var iMaxInputMessageStackCount = 10;
function fnNewInputMessage(str) {
	stkInputMessages.push(str);
	if (stkInputMessages.length > iMaxInputMessageStackCount)
		stkInputMessages.splice(0, 1);
}
// Update 25-Nov-2014 Changed action color to class - Mike
function fnAction(str) {
	flashObj.sendToServer("PRIVMSG " + m_sChan + " :\1ACTION " + str + "\1");
	//fnAppendText("<span style='font-style:italic; color: #9C009C;'>" + getUserLabel(ouserMe.nick) + " " + ParseTextMessage(str) + "</span>");
	if (ouserMe.ilevel >= IsHelpOp) fnAppendText('<span class="actiontext"><img unselectable="on" src="' + fnGetIco(ouserMe) + '" border="0" class="lvuitemico" />' + getUserLabel(ouserMe.nick) + " " + ParseTextMessage(str) + "</span>");
	else fnAppendText('<span class="actiontext"><span class="cpblankicospace"></span>' + getUserLabel(ouserMe.nick) + " " + ParseTextMessage(str) + "</span>");
}

function ToggleAwayButton(sReason, src) {
	//ToDo:

	if (sReason == null) {
		sReason = (src == 'button') ? sAwayMsg : '';
	}

	if (ouserMe.away == false) {
		ouserMe.away = true;
		if (sReason.length > 0) flashObj.sendToServer("AWAY " + m_sChan + " " + sReason);
		else flashObj.sendToServer("AWAY " + m_sChan + " ");
		//btnAway.gotoAndStop(2);
	}
	else {
		ouserMe.away = false;
		flashObj.sendToServer("AWAY " + m_sChan);
		//btnAway.gotoAndStop(1);
	}
}

function sanitizeHtml(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');

	return str;
}

function fnNickNameSanitize(nick) {
	//ToDo: check if more control chars 1 to 36 needs to be sanitized
	nick = sanitizeHtml(nick);
	nick = UnescapeSpecialChars(nick);
	nick = nick.replace(/[\t]/g, '\t');

	return nick;
}

function getUserLabel(nick) {
	return (nick.charAt(0) == ">") ? langr.l_guestprefix + fnNickNameSanitize(nick.substr(1)) : fnNickNameSanitize(nick);
}

function getUserLabel2(puser) {
	var tnick = (puser.nick.charAt(0) == ">") ? langr.l_guestprefix + fnNickNameSanitize(puser.nick.substr(1)) : fnNickNameSanitize(puser.nick);

	if ((puser.ilevel & IsStaff) == IsStaff) tnick += ' ' + '(' + langr.l_levelprefixstaff + ')';
	else if ((puser.ilevel & IsSuperOwner) == IsSuperOwner) tnick += ' ' + '(' + langr.l_levelprefixsuperowner + ')';
	else if ((puser.ilevel & IsOwner) == IsOwner) tnick += ' ' + '(' + langr.l_levelprefixowner + ')';
	else if ((puser.ilevel & IsHost) == IsHost) tnick += ' ' + '(' + langr.l_levelprefixhost + ')';
	else if ((puser.ilevel & IsHelpOp) == IsHelpOp) tnick += ' ' + '(' + langr.l_levelprefixhelpop + ')';
	return tnick;
}
function fnGetIgnore(puser) {
	if (puser.ignore == true) { return sIcoDir + arListIcons["ico_ignore"]; }
	else if (puser.tagged == true) { return sIcoDir + arListIcons["ico_tagged"]; }
	else { return sIcoDir + arListIcons["ico_blank"]; }
}
function fnGetIco(puser) {
	//alert(sIcoDir);
	//if (puser.tagged == true) return sIcoDir + arListIcons["ico_tagged"];
	if (puser.away == true) return sIcoDir + arListIcons["ico_away"];
	else if ((puser.ilevel & IsStaff) == IsStaff & puser.nick == "^Sysop_Passion") return sIcoDir + arListIcons["ico_passion"];
	else if ((puser.ilevel & IsStaff) == IsStaff) return sIcoDir + arListIcons["ico_staff"];
	else if ((puser.ilevel & IsSuperOwner) == IsSuperOwner) return sIcoDir + arListIcons["ico_superowner"];
	else if ((puser.ilevel & IsOwner) == IsOwner) return sIcoDir + arListIcons["ico_owner"];
	else if ((puser.ilevel & IsHost) == IsHost) return sIcoDir + arListIcons["ico_host"];
	else if ((puser.ilevel & IsHelpOp) == IsHelpOp) return sIcoDir + arListIcons["ico_helpop"];
	//else if (puser.ignore == true) return sIcoDir + arListIcons["ico_ignore"];
	else if (Is_m_Mode == true || Is_x_Mode == true) {
		//debugOutput(puser.nick + '; ' + puser.voice, 'fnGetIco');
		if (puser.voice == false) return sIcoDir + arListIcons["ico_spect"];
	}

	switch (puser.iprofile) {
		case NoProfile:
			return sIcoDir + arListIcons["ico_spacer"];
		case NoGender:
			return sIcoDir + arListIcons["ico_nogender"];
		case NoGenderWPic:
			return sIcoDir + arListIcons["ico_nogenderwpic"];
		case Female:
			return sIcoDir + arListIcons["ico_female"];
		case FemaleWPic:
			return sIcoDir + arListIcons["ico_femalewpic"];
		case Male:
			return sIcoDir + arListIcons["ico_male"];
		case MaleWPic:
			return sIcoDir + arListIcons["ico_malewpic"];
	}

	return sIcoDir + arListIcons["ico_spacer"];
}

function updateUserIcon(puser, pico, plb, pigy) {
	pico.src = fnGetIco(puser);
	pigy.src = fnGetIgnore(puser);
	updateUserLabel2(puser, plb);
}

function updateUserLabel(puser, plb) {
	if (typeof (plb.value) == 'undefined') plb.innerHTML = getUserLabel(puser.nick);
	else plb.value = getUserLabel(puser.nick);
}

function updateUserLabel2(puser, plb) {
	//debugOutput('aaaa', 'updateUserLabel2');

	if (typeof (plb.value) == 'undefined') plb.innerHTML = getUserLabel2(puser);
	else plb.value = getUserLabel2(puser);
}

function formatUserLabel(puser, plb) {
	if (puser.nick != ouserMe.nick) {
		if (olvUsers.selectedUser() != null) {
			if (olvUsers.selectedUser().nick == puser.nick) return;
		}
		if (puser.away == true) { plb.className += ' lvuitemlbAway'; }
		else { plb.className = 'lvuitemlb'; }
	}
	else {
		if (puser.away == true) { plb.className = 'lvuitemMeAway'; }
		else { plb.className = 'lvuitemMe'; }
	}
}

function getUserModeVal(smode) {
	switch (smode) {
		case "v":
			return -1;
		case "h":
			return IsHelpOp;
		case "o":
			return IsHost;
		case "q":
			return IsOwner;
		case "Q":
			return IsSuperOwner;
	}

	return 0;
}

function updateUser(oUserChanges) {
	//ToDo: optimization
	var modeval = getUserModeVal(oUserChanges.mode);
	var lvuitem = olvUsers.getItemByName(oUserChanges.param);

	if (lvuitem != null) {
		if (oUserChanges.op == "+") {
			if (modeval == -1 && lvuitem.pUser.voice != true) {
				tmpUser.pUser.voice = true;
				olvUsers.updateItemById(lvuitem.id, tmpUser, UPDATEUSER_ICON2);
				return lvuitem.id;
			}
			else if (((modeval & lvuitem.pUser.ilevel) != modeval) && modeval != -1) {
				tmpUser.pUser.ilevel = lvuitem.pUser.ilevel;
				tmpUser.pUser.host = lvuitem.pUser.host;
				//tmpUser.pUser.iprofile = lvuitem.pUser.iprofile;
				tmpUser.pUser.ilevel |= modeval;
				olvUsers.updateItemById(lvuitem.id, tmpUser, UPDATEUSER_ICON);
				return lvuitem.id;
			}
		}
		else {
			if (modeval == -1 && lvuitem.pUser.voice != false) {
				tmpUser.pUser.voice = false;
				olvUsers.updateItemById(lvuitem.id, tmpUser, UPDATEUSER_ICON2);
				return lvuitem.id;
			}
			else if (((modeval & lvuitem.pUser.ilevel) == modeval) && modeval != -1) {
				tmpUser.pUser.ilevel = lvuitem.pUser.ilevel;
				tmpUser.pUser.host = lvuitem.pUser.host;
				//tmpUser.pUser.iprofile = lvuitem.pUser.iprofile;
				tmpUser.pUser.ilevel ^= modeval;
				olvUsers.updateItemById(lvuitem.id, tmpUser, UPDATEUSER_ICON);
				return lvuitem.id;
			}
		}

		return -1;
	}

	return -1;
}

function UpdateUserCount() {
	ptxNumberOfUser.innerHTML = (olvUsers.length() + 1) + ' ' + langr.l_userschatting;
}

function UpdateLblModes() {
	try {
		ptxChanModes.innerHTML = "+" + Modes[0] + Modes[1] + Modes[2] + Modes[3] + Modes[4];
		//if (txtModes.length == 1) ptxChanModes.innerHTML = "";
	}
	catch (ex) {
		debugOutput(ex, 'UpdateLblModes');
	}
}

function UpdateChatRoomText() {
	ptxChan.innerHTML = DecodeRoomName(m_sChan);
}

function UpdateChatRoomIcon() {
	if (Modes[0].indexOf("R") >= 0) {
		pchanIco.src = sIcoDir + arListIcons["ico_servicerm"];
	}
	else if (Modes[0].indexOf("r") >= 0) {
		pchanIco.src = sIcoDir + arListIcons["ico_regrm"];
	}
	else {
		pchanIco.src = sIcoDir + arListIcons["ico_spacer"];
	}
}

function DecodeRoomName(str) {
	var sChan = str.slice(2);
	return sChan.split("\\b").join(" ");
}

function EncodeRoomName(str) {
	return str.split(" ").join("\\b");
}

function FixChannelEncoding(sChan) {
	return sChan.replace(/[\b]/g, '\\b');
}

function openProfileWindow(pid) {
	var sURL = sSiteURL + "u/" + pid;
	window.open(sURL, '_blank');
}

function addTag(nick) {
	if (!aaTagged[nick]) {
		aaTagged[nick] = true;
		flashObj.addTag(nick);
	}
}

function removeTag(nick) {
	if (aaTagged[nick]) {
		delete aaTagged[nick];
		flashObj.removeTag(nick);
	}
}

function BuildFmtString(pOptions) {
	//font-family: Georgia; color: Goldenrod; font-weight: bold; font-style: normal;
	sDspFrmt = '';
	if (pOptions.font.length > 0) sDspFrmt += 'ff:' + pOptions.font + ';';
	if (pOptions.color.length > 0) sDspFrmt += 'co:' + pOptions.color + ';';
	sDspFrmt += (pOptions.bold == true) ? 'b;' : '';
	sDspFrmt += (pOptions.italic == true) ? 'i;' : '';
}

function loadOptions() {
	var COptions = flashObj.LoadChatOptions();
	var EOptions = flashObj.GetExtraOptions();
	if (COptions.sDspFrmt) {
		var fontinfo = COptions.sDspFrmt.split(";");
		for (f = 0; f < fontinfo.length; f++) {
			if (fontinfo[f].substr(0, 3) == 'ff:') { sendFontfamily = fontinfo[f].substr(3); }
			if (fontinfo[f].substr(0, 3) == 'co:') { sendFontcolor = fontinfo[f].substr(3); }
			if (fontinfo[f].substr(0, 1) == 'b') { sendFontweight = 'bold'; }
			if (fontinfo[f].substr(0, 1) == 'i') { sendFontstyle = 'italic'; }
		}
		if (sendFontfamily != null) { ptxSend.style.fontFamily = sendFontfamily; }
		if (sendFontcolor != null) { ptxSend.style.color = sendFontcolor; }
		if (sendFontweight != null) { ptxSend.style.fontWeight = sendFontweight; }
		if (sendFontstyle != null) { ptxSend.style.fontStyle = sendFontstyle; }
	}
	sDspFrmt = COptions.sDspFrmt;
	if (COptions.fontSize && COptions.fontSize != 'null') {
		pageFontsize = COptions.fontSize;
		_pcpbody.style.fontSize = COptions.fontSize;
		_pstatusbody.style.fontSize = COptions.fontSize;

	}
	bCorpText = COptions.corpText;
	sAwayMsg = (COptions.sAwayMsg == XmlNullChar) ? '' : COptions.sAwayMsg;

	if (typeof (COptions.oEventShowNotifys) != 'undefined') {
		var oEventShowNotifys = null;

		oEventShowNotifys = COptions.oEventShowNotifys;

		if (typeof (oEventShowNotifys.bDspArrivals) != 'undefined') bDspArrivals = oEventShowNotifys.bDspArrivals;
		if (typeof (oEventShowNotifys.bDspStatusChg) != 'undefined') bDspStatusChg = oEventShowNotifys.bDspStatusChg;
		if (typeof (oEventShowNotifys.bDspDeparts) != 'undefined') bDspDeparts = oEventShowNotifys.bDspDeparts;
	}

	if (typeof (COptions.sndArrival) != 'undefined') bSndArrival = COptions.sndArrival;
	if (typeof (COptions.sndKick) != 'undefined') bSndKick = COptions.sndKick;
	if (typeof (COptions.sndTagged) != 'undefined') bSndTagged = COptions.sndTagged;
	if (typeof (COptions.sndInvite) != 'undefined') bSndInvites = COptions.sndInvite;
	if (typeof (COptions.sndWhisp) != 'undefined') bSndWhisp = COptions.sndWhisp;

	if (typeof (COptions.bEmotsOff) == 'boolean') bEmotsOff = COptions.bEmotsOff;
	if (typeof (COptions.bTextFrmtOff) == 'boolean') bTextFrmtOff = COptions.bTextFrmtOff;

	if (typeof (COptions.bWhispOff) == 'boolean') bWhispOff = COptions.bWhispOff;
	if (typeof (COptions.bTimeStampOn) == 'boolean') bTimeStampOn = COptions.bTimeStampOn;
	if (typeof (EOptions) != 'undefined') {
		if (typeof (EOptions.bInviteOn) == 'boolean') { bInviteOn = EOptions.bInviteOn; }
		else { bInviteOn = false; }
		if (typeof (EOptions.bPiconsOn) == 'boolean') { bPiconsOn = EOptions.bPiconsOn; }
		else { bPiconsOn = false; }
		if (typeof (EOptions.bUnoticeOn) == 'boolean') { bUnoticeOn = EOptions.bUnoticeOn; }
		else { bUnoticeOn = false; }
		if (typeof (EOptions.bUrlOn) == 'boolean') { bUrlOn = EOptions.bUrlOn; }
		else { bUrlOn = false; }
		if (typeof (EOptions.bSafeUrlCheckOn) == 'boolean') { bSafeUrlCheckOn = EOptions.bSafeUrlCheckOn; }
		else { bSafeUrlCheckOn = false; }
		if (typeof (EOptions.bYoutubeUrl) == 'number' && EOptions.bYoutubeUrl > 0) { bYoutubeUrl = EOptions.bYoutubeUrl; }
		else { bYoutubeUrl = 1; }
	}
	else { bInviteOn = false; bPiconsOn = false; bUnoticeOn = false; bUrlOn = false; bSafeUrlCheckOn = false; bYoutubeUrl = 1; }
	//alert(JSON.stringify(EOptions));
	//sound are played in flash object, so they won't load here
}

function saveOptions(pOptions) {
	BuildFmtString(pOptions);
	setFontsizewhisper(pOptions.fontSize);
	_pcpbody.style.fontSize = pOptions.fontSize;
	_pstatusbody.style.fontSize = pOptions.fontSize;
	bCorpText = pOptions.corpText;

	bDspArrivals = pOptions.showArrivals;
	bDspStatusChg = pOptions.showStatusChg;
	bDspDeparts = pOptions.showDeparts;

	bSndArrival = pOptions.sndArrival;
	bSndKick = pOptions.sndKick;
	bSndTagged = pOptions.sndTagged;
	bSndInvites = pOptions.sndInvite;
	bSndWhisp = pOptions.sndWhisp;

	bEmotsOff = pOptions.bEmotsOff;
	bTextFrmtOff = pOptions.bTextFrmtOff;

	bWhispOff = pOptions.bWhispOff;
	bTimeStampOn = pOptions.bTimeStampOn;
	// Update Aug 12 2015 Extra Settings
	bInviteOn = pOptions.bInviteOn;
	bPiconsOn = pOptions.bPiconsOn;
	bUnoticeOn = pOptions.bUnoticeOn;
	bUrlOn = pOptions.bUrlOn;
	bSafeUrlCheckOn = pOptions.bSafeUrlCheckOn;
	bYoutubeUrl = pOptions.bYoutubeUrl;
	//
	var COptions = new Object();
	// Update Aug 12 2015 Extra Settings
	var EOptions = new Object();
	var oEventShowNotifys = new Object();
	COptions.sDspFrmt = sDspFrmt;
	COptions.fontSize = pOptions.fontSize;
	COptions.corpText = pOptions.corpText;
	COptions.sAwayMsg = (sAwayMsg == '') ? XmlNullChar : sAwayMsg;

	oEventShowNotifys.bDspArrivals = bDspArrivals;
	oEventShowNotifys.bDspStatusChg = bDspStatusChg;
	oEventShowNotifys.bDspDeparts = bDspDeparts;
	COptions.oEventShowNotifys = oEventShowNotifys;

	COptions.sndArrival = pOptions.sndArrival;
	COptions.sndKick = pOptions.sndKick;
	COptions.sndTagged = pOptions.sndTagged;
	COptions.sndInvite = pOptions.sndInvite;
	COptions.sndWhisp = pOptions.sndWhisp;

	COptions.bEmotsOff = pOptions.bEmotsOff;
	COptions.bTextFrmtOff = pOptions.bTextFrmtOff;

	COptions.bWhispOff = pOptions.bWhispOff;
	COptions.bTimeStampOn = pOptions.bTimeStampOn;
	// Update Aug 12 2015 Extra Settings
	EOptions.bInviteOn = pOptions.bInviteOn;
	EOptions.bPiconsOn = pOptions.bPiconsOn;
	EOptions.bUnoticeOn = pOptions.bUnoticeOn;
	EOptions.bUrlOn = pOptions.bUrlOn;
	EOptions.bSafeUrlCheckOn = pOptions.bSafeUrlCheckOn;
	EOptions.bYoutubeUrl = pOptions.bYoutubeUrl;

	if (COptions.sDspFrmt) {
		var fontinfo = COptions.sDspFrmt.split(";");
		for (f = 0; f < fontinfo.length; f++) {
			if (fontinfo[f].substr(0, 3) == 'ff:') { sendFontfamily = fontinfo[f].substr(3); }
			if (fontinfo[f].substr(0, 3) == 'co:') { sendFontcolor = fontinfo[f].substr(3); }
			if (fontinfo[f].substr(0, 1) == 'b') { sendFontweight = 'bold'; }
			if (fontinfo[f].substr(0, 1) == 'i') { sendFontstyle = 'italic'; }
		}
		if (sendFontfamily != null) { ptxSend.style.fontFamily = sendFontfamily; }
		else { ptxSend.style.fontFamily = 'Tahoma'; }
		if (sendFontcolor != null) { ptxSend.style.color = sendFontcolor; }
		else { ptxSend.style.color = '#000000'; }
		if (sendFontweight != null) { ptxSend.style.fontWeight = sendFontweight; }
		else { ptxSend.style.fontWeight = 'normal'; }
		if (sendFontstyle != null) { ptxSend.style.font = sendFontstyle; }
		else { ptxSend.style.fontStyle = 'normal'; }
		setFontswhisper();
	}

	flashObj.SaveChatOptions(COptions);
	// Update Aug 12 2015 Extra Settings
	flashObj.SetExtraOptions(EOptions);

	ScrollFix();
}
function getCPBody() {
	if (isIE) return ChatPane.document.body;
	else return pChatPane.contentDocument.body;
}

/* test code */
var dbLines = 0;
var wndDebug = null; //window.open("fui/nbchatdebug.htm", "wndDBug");
var wndDebugIsOpen = false, bDebugScroll = false;

function DebugWindow(str, fnLoc) {
	if (wndDebugIsOpen == true && bDebugScroll == true) {
		dbLines++;
		wndDebug.document.write("(" + dbLines + ") Function: " + fnLoc + "<br />");
		wndDebug.document.write(sanitizeHtml(str) + "<br />");
	}
}
/* test code end */


var iLastAutoCpScrollVal = 0;
var bCPAutoScroll = true;
var bSkipCPScrollCall = false;
function autoCPScroll(cpb) {
	if (bCPAutoScroll) {
		cpb.scrollTop = cpb.scrollHeight;
		iLastAutoCpScrollVal = cpb.scrollTop;
	}

	/* test code begin */
	//bSkipCPScrollCall = true;
	DebugWindow("bCPAutoScroll: " + bCPAutoScroll + ", cpb.scrollTop: " + cpb.scrollTop + ", iLastAutoCpScrollVal: " + iLastAutoCpScrollVal + ", cpb.scrollHeight: " + cpb.scrollHeight, "autoCPScroll");
	//bSkipCPScrollCall = false;
	/* test code end */
}

function ScrollFix() {
	var cpb = getCPBody();
	cpb.scrollTop = cpb.scrollHeight;
	iLastAutoCpScrollVal = cpb.scrollTop;
	bCPAutoScroll = true;
}

var bScrollCallEnabled = true;

function UserScrolled() {
	var cpb = getCPBody();
	var iScrollOffset = 20;

	if ((cpb.scrollTop + iScrollOffset) < iLastAutoCpScrollVal) bCPAutoScroll = false;
	else bCPAutoScroll = true;

	bScrollCallEnabled = true;
}

var bSkipCPScroll = false;

function OnCPScroll() {
	var cpb = getCPBody();
	//bSkipCPScrollCall = true;
	DebugWindow("bCPAutoScroll: " + bCPAutoScroll + ", cpb.scrollTop: " + cpb.scrollTop + ", iLastAutoCpScrollVal: " + iLastAutoCpScrollVal + ", cpb.scrollHeight: " + cpb.scrollHeight, "OnCPScroll");
	//bSkipCPScrollCall = false;

	if (!bSkipCPScroll) {
		if (bScrollCallEnabled) {
			bCPAutoScroll = bScrollCallEnabled = false;
			setTimeout(UserScrolled, 1000);
		}
	}
	else bSkipCPScroll = false;
}


function fnInitialize() {
	//Update: moved images to var at top for better management --Duke, 12-Feb-2014.
	fnPreloadUIImages();
	ptxSend = document.getElementById('txSend');
	pChatPane = document.getElementById('ChatPane');
	pStatusPane = document.getElementById('StatusPane');
	//pChatPane.style.height = document.getElementById('tdcp').style.height;
	ptxChan = document.getElementById('txChan');
	pchanIco = document.getElementById('chanIco');
	ptxChanModes = document.getElementById('txChanModes');
	ptxNumberOfUser = document.getElementById('txNumberOfUser');
	pwndGLD = document.getElementById('wndGuestLogin');
	ptxGLN = document.getElementById('txtGuestNick');
	//ppwGuest = document.getElementById('pwdGuest');
	ptxGLDErrorMessage = document.getElementById('txGLDErrorMessage');
	if (isIE) {
		flashObj = document.getElementById('nbwchat');
		ChatPane.document.body.onscroll = OnCPScroll;
	} else {
		if (embtype == 1) flashObj = document.getElementById('nbwchat');
		else flashObj = document.getElementById('nbwchatff');
		pChatPane.contentDocument.defaultView.onscroll = OnCPScroll;
	}
	plbMe = document.getElementById('lbMe');
	puicoMe = document.getElementById('uicoMe');
	//ouserMe = {nick:null, ident:null, host:null, ilevel:0, iprofile:NoProfile, away:false, awaymsg:"", voice:false};

	if (!flashsckloaded) plbMe.innerHTML = '';

	plbMe.onclick = SelectLocalUser;

	idIntIsWbrLoadedPtr = setInterval(fnIntIsWbrFlashChatObjLoaded, 96);
	loadnicklist();
	//alert('tl');
	//
	//LoadDummyUsers();
}
function loadnicklist() {
	olvUsers = new ListView(document.getElementById('lvUsers'));
}
function fnIntIsWbrFlashChatObjLoaded() {
	if (typeof (flashObj.setLoadingCallTimer) == "function") {
		clearInterval(idIntIsWbrLoadedPtr);
		flashObj.setLoadingCallTimer();
	}
}

function fnMainWndUnload() {
	plbMe.innerHTML = '';
	flashsckloaded = false;

	closeAllWhispTabs();
	if (wndChatOptions != null) {
		if (!wndChatOptions.closed) wndChatOptions.close();
	}
}

// <Flash Object Events>

function onFlashSocketLoad() {
	iniContextMenu();
	iniUIObjects();

	loadOptions();

	if (iUserLoggin != USER_REG) {
		if (sGuestNick == null) showGuestLoginDialog();
		else {
			var sGNick = sGuestNick;
			strGuestPass = flashObj.GetGuestuserPass();

			if (sGNick.length <= 2) sGNick += "NickLessThan2Chars";

			if (sGNick[0] != '>') sGNick = '>' + sGNick;
			flashObj.SetGuestInfo(sGNick, strGuestPass);
			IsGuestInfoSet = true;
			fnConnect();
		}
	}
	else flashObj.sckConnect();

	//    var sGNick = prompt("Guest Login: Enter your nick name (don't enter less than 2 characters)");

	//    if (sGNick.length > 2)
	//    {
	//       if (sGNick[0] != '>') sGNick =  '>' + sGNick;
	//       flashObj.SetGuestInfo(sGNick, 'fhejkruyg');
	//       IsGuestInfoSet = true;
	//       fnConnect();
	//    }
}

function onClearUserList() {
	olvUsers.removeAll();
	if (!delete aaTagged) {
		for (tu in aaTagged) delete tu;
	}
	aaTagged = new Array();
	UpdateUserCount();
}

function onAddUser(ouser) {
	//debugOutput(ouser.nick + '; ' + ouser.voice, 'onAddUser');
	olvUsers.addItem(ouser);
	UpdateUserCount();
}

function onJoin(ujoined, chan) {
	var plvi = olvUsers.addItem(ujoined);
	fnProcessUserIdentIngnore(plvi);
	if (bDspArrivals != false) {
		var usrname = (bShowIdentOnJoin) ? getUserLabel(ujoined.nick) + "!" + ujoined.fullident + "@*" : getUserLabel(ujoined.nick);
		// Update Dec 3 2016 Superowner show ident Mike
		if (ouserMe.ilevel >= IsSuperOwner) { fnAppendText('<span class="msgfrmtparent"><span class="msgfrmt4">' + cmdIndChar + ' <a class="usernickclick" style="text-decoration:none;" href="javascript:;" onclick="usernickclick(\'' + ujoined.nick + '\');">' + usrname + '</a> ' + langr.l_userhasjoined + ' Passport: ' + ujoined.ident + '</span></span>'); }
		else { fnAppendText('<span class="msgfrmtparent"><span class="msgfrmt4">' + cmdIndChar + ' <a class="usernickclick" style="text-decoration:none;" href="javascript:;" onclick="usernickclick(\'' + ujoined.nick + '\');">' + usrname + '</a> ' + langr.l_userhasjoined + '</span></span>'); }
	}
	UpdateUserCount();
}

function onRemoveUserByNick(sNick) {
	//ToDo:
	//debugOutput(sNick + ' : ' + pUser.nick);
	var pUser = olvUsers.removeItemByName2(sNick);
	if (pUser != null) {
		// Update Dec 3 2016 Superowner show ident Mike
		if (bDspDeparts != false) {
			if (ouserMe.ilevel >= IsSuperOwner) {
				if (pUser.ident != null) { var passportshow = "Passport: " + pUser.ident; }
				else { var passportshow = ''; }
				fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((pUser.tagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(pUser.nick) + "</span>") : getUserLabel(pUser.nick)) + " " + langr.l_userhasleft + " " + passportshow + "</span></span>");
			}
			else { fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((pUser.tagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(pUser.nick) + "</span>") : getUserLabel(pUser.nick)) + " " + langr.l_userhasleft + "</span></span>"); }
		}
		removeTag(sNick);
		EndTabs(sNick);
		UpdateUserCount();
	}
}

function onJoinMe(oluser, sChan) {
	ouserMe = oluser;
	m_sChan = FixChannelEncoding(sChan);
	//plbMe.innerHTML = getUserLabel(ouserMe.nick);
	updateUserLabel2(ouserMe, plbMe);
	uicoMe.src = fnGetIco(ouserMe);
	formatUserLabel(ouserMe, plbMe);

	flashsckloaded = true;

	UpdateChatRoomText();

	fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='msgfrmt4me'> " + langr.l_uhavejoined + "</span></span></span>");

	UpdateUserCount();
}

function onNameslistMe(oluser, sChan) {
	var nothing = '';
	ouserMe = oluser;
	updateUserLabel2(ouserMe, plbMe);
	updateUserIcon(ouserMe, puicoMe, plbMe, nothing); //some redundency in these functions
	formatUserLabel(ouserMe, plbMe);
	//debugOutput("-", "onNameslistMe");
	updateLVIMenu();
	//don't update usercount, it is already being called from flash
}

function onProp(sNickFrom, sChan, sType, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	//prop returns, what if client disconnects?
	switch (sType.toUpperCase()) {
		case "TOPIC":
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='pretopiclabel'> " + getUserLabel(sNickFrom) + " " + langr.l_changestopic + " </span><span class='topic'>" + ParseTextMessage(sMessage) + "</span></span>");
			sendTostatus("<span class='status-prop'>" + getUserLabel(sNickFrom) + " " + langr.l_changestopic + " " + ParseTextMessage(sMessage) + "</span>");
			break;

		case "ONJOIN":
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='preonjoinlabel'> " + getUserLabel(sNickFrom) + " " + langr.l_changeswelcome + " </span><span class='onjoin'>" + ParseTextMessage(sMessage) + "</span></span>");
			sendTostatus("<span class='status-prop'>" + getUserLabel(sNickFrom) + " " + langr.l_changeswelcome + " " + ParseTextMessage(sMessage) + "</span>");
			break;

		case "LANGUAGE2":
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + getUserLabel(sNickFrom) + " " + langr.l_changesdisplaylang + " " + sMessage + "</span></span>");
			sendTostatus("<span class='status-prop'>" + getUserLabel(sNickFrom) + " " + langr.l_changesdisplaylang + " " + ParseTextMessage(sMessage) + "</span>");
			break;
	}
}

function onNotice(sNickFrom, sChan, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	fnAppendText("<span class='msgfrmt5'><span class='titlenotice'>" + ((aaTagged[sNickFrom] == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : getUserLabel(sNickFrom)) + " (" + langr.l_notice + "):</span><span class='msgnotice'>" + ParseTextMessage(sMessage) + "</span></span>");
}

function onNoticePrivate(sNickFrom, sChan, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	//ToDo:
	var plvi = olvUsers.getItemByName(sNickFrom);
	if ((plvi.pUser.ignore == false) || (plvi.pUser.ilevel > IsSuperOwner && staffIgnore.indexOf(pLVI.pUser.nick) <= -1)) {
		if (sMessage.charAt(0) != "\2") {
			//Update(11-Aug-2016): parsetext2 to remove emotes. --Mike
			if (bUnoticeOn == false) {
				fnAppendText("<div style='padding-left:30px;'><span class='msgfrmt5'><span class='titlenoticepr'>" + ((aaTagged[sNickFrom] == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : getUserLabel(sNickFrom)) + " (" + langr.l_notice + "):</span> <span class='msgnoticepr'>" + ParseTextMessage2(sMessage, false) + "</span></span></div>");
			}
			else {
				if (!waitnotice) {
					flashObj.sendToServer("NOTICE " + sChan + " " + sNickFrom + " : " + ouserMe.nick + " " + langr.l_noticesoff);
					waitnotice = true;
					setTimeout(function () {
						waitnotice = false;
					}, 5000);
				}
			}
		}
		else {
			//Update(11-Aug-2016): protection against time reply flooding. --Mike
			if (!waittimereply) {
				var sRpl = sMessage.substr(sMessage.indexOf("\2", 1) + 1);
				sRpl = sRpl.substring(0, 50);
				fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + getUserLabel(sNickFrom) + "'s " + langr.l_localtime + " " + sRpl + "</span></span>");
				waittimereply = true;
				setTimeout(function () {
					waittimereply = false;
				}, 5000);
			}
		}

	}
}

function onNoticeChanBroadcast(sNickFrom, sChan, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	fnAppendText("<div class='broadcastmessage'><span class='broadcasttitlecr'><img unselectable='on' src='" + sIcoDir2 + arListIcons["ico_owner"] + "' border='0' class='lvuitemico' />&nbsp;Chat Room Broadcast:</span> <span class='broadcastmsg'>" + ParseTextMessage(sMessage) + "</span></div>");
	sendTostatus("<div class='broadcastmessage'><span class='broadcasttitlecr'><img unselectable='on' src='" + sIcoDir2 + arListIcons["ico_owner"] + "' border='0' class='lvuitemico' />&nbsp;Chat Room Broadcast:</span> <span class='broadcastmsg'>" + ParseTextMessage(sMessage) + "</span></div>");
}

function onNoticeServerBroadcast(sNickFrom, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	fnAppendText("<div class='broadcastmessage'><span class='broadcasttitlesrv'><img unselectable='on' src='" + sIcoDir2 + arListIcons["ico_staff"] + "' border='0' class='lvuitemico' />&nbsp;Server Broadcast:</span> <span class='broadcastmsg'>" + ParseTextMessage(sMessage) + "</span></div>");
	sendTostatus("<div class='broadcastmessage'><span class='broadcasttitlesrv'><img unselectable='on' src='" + sIcoDir2 + arListIcons["ico_staff"] + "' border='0' class='lvuitemico' />&nbsp;Server Broadcast:</span> <span class='broadcastmsg'>" + ParseTextMessage(sMessage) + "</span></div>");
}

function onNoticeServerMessage(sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	if (!bShowServAuthMsgs) {
		var reSrvAuthMsgs = /^\bAUTH\b(?!.*authentication failed.*)|^There\sare|^Current\sLocal\sUsers/i;
		if (reSrvAuthMsgs.test(sMessage)) return;
	}
	fnAppendText("<span class='servnotice'>Server Notice: " + ParseTextMessage2(sMessage, false) + "</span>");
	sendTostatus("<span class='servnotice'>Server Notice: " + ParseTextMessage2(sMessage, false) + "</span>");
}

function onKick(sNickFrom, sChan, sNickTo, sMessage) {
	//ToDo: check if the remove call is the correct one. whispers.
	if (sNickTo != ouserMe.nick) {
		if (olvUsers.removeItemByName(sNickTo) >= 0) {
			if (sMessage != XmlNullChar) fnAppendText("<span class='kicked'>" + getUserLabel(sNickTo) + " has been kicked out by " + getUserLabel(sNickFrom) + ". Reason: " + ParseTextMessage(sMessage) + "</span>");
			else fnAppendText("<span class='kicked'>" + getUserLabel(sNickTo) + " has been kicked out by " + getUserLabel(sNickFrom) + ".</span>");
			EndTabs(sNickTo); //ToDo: bug, if nick wrong function doesn't return
			if (bSndKick) flashObj.playKickSnd();
		}
	}
	else {
		if (sMessage != XmlNullChar) fnAppendText("<span class='kickedme'>You have been kicked out by " + getUserLabel(sNickFrom) + ". Reason: " + ParseTextMessage(sMessage) + "</span>");
		else fnAppendText("<span class='kicked'>You have been kicked out by " + getUserLabel(sNickFrom) + ".</span>");
		onClearUserList();
		if (bSndKick) flashObj.playKickSnd();
	}
	UpdateUserCount();
}

function onPrivmsg(sNickFrom, sChan, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	var pLVI = olvUsers.getItemByName(sNickFrom);
	var str = new String();
	if ((pLVI.pUser.ignore == false) || (pLVI.pUser.ilevel > IsSuperOwner && staffIgnore.indexOf(pLVI.pUser.nick) <= -1)) {
		if (sMessage.indexOf("\1") == 0) {
			//str.split(
			var pos1 = sMessage.indexOf(" ", 1);
			if (pos1 >= 0) {
				var sCmd = sMessage.slice(1, pos1).toUpperCase();

				switch (sCmd) {
					case "ACTION":
						//check ways to optimize this
						//make action function 1 function
						//fnAppendText("<span style='font-style:italic; color: #9C009C;'>" + getUserLabel(sNickFrom) + " " + ParseTextMessage(sMessage.substring(pos1, sMessage.length - 1)) + "</span>");
						// Update 25-Nov-2014 Changed action color to class - Mike
						if (pLVI.pUser.ilevel >= IsHelpOp) fnAppendText('<span class="actiontext"><img unselectable="on" src="' + fnGetIco(pLVI.pUser) + '" border="0" class="lvuitemico" /><a class="usernickclick" style="text-decoration:none;" href="javascript:;" onclick="usernickclick(\'' + sNickFrom + '\');">' + getUserLabel(sNickFrom) + "</a> " + ParseTextMessage(sMessage.substring(pos1, sMessage.length - 1)) + "</span>");
						else fnAppendText('<span class="actiontext"><span class="cpblankicospace"></span><a class="usernickclick" style="text-decoration:none;" href="javascript:;" onclick="usernickclick(\'' + sNickFrom + '\');">' + getUserLabel(sNickFrom) + "</a> " + ParseTextMessage(sMessage.substring(pos1, sMessage.length - 1)) + "</span>");
						break;

					case "VERSION":
						sCmd = "NOTICE " + m_sChan + " " + sNickFrom + " :\2VERSION\2" + sVersion;
						//Update(01-Oct-2014): (cont... refer earlier code) protection against time and version reply flooding. --Mike
						if (!waitversion) {
							flashObj.sendToServerQue(sCmd);
							waitversion = true;
							setTimeout(function () {
								waitversion = false;
							}, 1000);
						}
						break;
				}
			}
		}
		else {
			RenderPrivmsg2(pLVI.pUser, sMessage);
		}
	}
}
//Update(21-Nov-2014): Removed <br /> and <div /> from string. --Mike
function on332(sChan, sTopic) {
	fnAppendText("<span class='topicparent'><span class='pretopiclabel'>" + txPretopiclabel + "</span><span class='topic'>" + ParseTextMessage(sTopic) + "</span></span>");
}
function onChanPrivmsg(sChanFrom, sChan, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	//this is welcome message (onjoin message)
	if (sChanFrom == sChan) fnAppendText("<span class='onjoinparent'><span class='onjoin'>" + ParseTextMessage(sMessage) + "</span></span>");
}
function onPrivmsgPr(sNickFrom, sChan, sNickTo, sMessage) {
	//ToDo:
	if (sMessage == XmlNullChar) sMessage = '';
	var plvi = olvUsers.getItemByName(sNickFrom);
	if (sMessage.charAt(0) != "\1") {
		if (plvi.pUser.ignore == false || plvi.pUser.ilevel > IsSuperOwner) {
			//ToDo: this function is null
			RenderMessage(sNickFrom, sMessage);
			//flashObj.playTagSnd();
		}
	}
	else {
		var sCmd = sMessage.slice(1, sMessage.indexOf("\1", 1)).toUpperCase();
		switch (sCmd) {
			case "TIME":
				//check ways to optimize this
				delete dMyDate;
				dMyDate = new Date();
				sCmd = "NOTICE " + m_sChan + " " + sNickFrom + " :\2TIME\2" + flashObj.GetMyDateTime();

				//Update(01-Oct-2014): (cont... refer earlier code) protection against time and version reply flooding. --Mike
				if (!waittime) {
					flashObj.sendToServerQue(sCmd);
					waittime = true;
					setTimeout(function () {
						waittime = false;
					}, 1000);
				}
				break;
		}
	}
}

function onWhisper(sNickFrom, sChan, sNickTo, sMessage) {
	//ToDo:
	if (sMessage == XmlNullChar) sMessage = '';
	var plvi = olvUsers.getItemByName(sNickFrom);
	if (plvi.pUser.ignore == false || plvi.pUser.ilevel > IsSuperOwner) {
		WhisperTabManager(sNickFrom, sChan, sNickTo, sMessage, WHISP_IN);
	}
}
function on301(sNickFrom, sMessage) {
	//ToDo:
	if (sMessage == XmlNullChar) sMessage = '';
	if (sNickFrom != ouserMe.nick) {
		var plvi = olvUsers.getItemByName(sNickFrom);
		if (plvi.pUser != undefined) {
			plvi.pUser.awaymsg = sMessage;
			if (sMessage.length > 0 && (plvi.pUser.ignore == false || plvi.pUser.ilevel > IsSuperOwner)) {
				fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((plvi.pUser.tagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : getUserLabel(sNickFrom)) + " " + langr.l_isaway_a + " " + langr.l_isaway_b + " " + ParseTextMessage(sMessage) + "</span></span>");
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((plvi.pUser.tagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : getUserLabel(sNickFrom)) + " " + langr.l_isaway_a + "</span></span>");
			}
			//flashObj.playTagSnd();
		}
	}
	else {
		if (sMessage.length > 0) {
			ouserMe.awaymsg = sMessage;
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='msgfrmt4me'> " + langr.l_umarkedaway_a + " " + langr.l_umarkedaway_b + " " + ParseTextMessage(sMessage) + "</span></span></span>");
		}
		else {
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4me'>" + cmdIndChar + " " + langr.l_umarkedaway_a + "</span></span>");
		}
	}
}

function on302(sNickFrom, sMessage) {
	//ToDo:
	if (sMessage == XmlNullChar) sMessage = '';
	UpdateIdent(sNickFrom, sMessage);
}

function UpdateIdent(sNickFrom, sUserHost) {
	var istrtloc = sUserHost.indexOf("=") + 1;
	var iendloc = sUserHost.indexOf("@");
	var nickloc = sUserHost.slice(0, istrtloc - 1);
	var preidentloc = sUserHost.slice(istrtloc, iendloc);
	var identloc;
	if (preidentloc.charAt(0) == "+" || preidentloc.charAt(0) == "-") identloc = preidentloc.slice(1);
	else identloc = preidentloc;
	if (nickloc == ouserMe.nick) {
		if (ouserMe.ident == null) {
			ouserMe.fullident = identloc;
			ouserMe.ident = identloc.slice(identloc.lastIndexOf(".") + 1);
		}
		fnProcessPendingActionsList(sNickFrom, "kickban@ident", plvi);
	}
	else {
		var plvi = olvUsers.getItemByName(nickloc);
		if (plvi.pUser != undefined) {
			if (plvi.pUser.ident == null) {
				plvi.pUser.fullident = identloc;
				plvi.pUser.ident = identloc.slice(identloc.lastIndexOf(".") + 1);
			}
			fnProcessPendingActionsList(sNickFrom, "kickban@ident", plvi);
		}
	}
}
function fnProcessPendingActionsList(sNickFrom, sWaitingOn, plvi) {
	if (lstPendingActions.length > 0) {
		for (var i = 0; i < lstPendingActions.length; i++) {
			if (lstPendingActions[i].sWaitingOn == sWaitingOn && lstPendingActions[i].sNick == plvi.pUser.nick) {
				switch (sWaitingOn) {
					case "kickban@ident":
						fnKickBan(plvi.pUser, lstPendingActions[i].flag, lstPendingActions[i].text);
						lstPendingActions.splice(i, 1);
						break;
				}
			}
		}
	}
}

function on822Chan(sNickFrom, sChan, sMessage) {
	//ToDo: add reason tool tip or something similar; optimize
	if (sMessage == XmlNullChar) sMessage = '';
	if (sNickFrom != ouserMe.nick) {
		var idx = olvUsers.findUser(sNickFrom);
		if (idx > -1) {
			tmpUser.pUser.away = true;
			olvUsers.updateItemById(idx, tmpUser, UPDATEUSER_FORMATING);
			var oUser = olvUsers.getItemByName(sNickFrom).pUser;
			var bTagged = oUser.tagged;
			oUser.awaymsg = sMessage;
			if (bDspStatusChg != false) {
				if (oUser.ignore == false || oUser.ilevel > IsSuperOwner) {
					if (sMessage.length > 0) {
						fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((bTagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : getUserLabel(sNickFrom)) + " " + langr.l_wentaway_a + " " + langr.l_wentaway_b + " " + ParseTextMessage(sMessage) + "</span></span>");
					}
					else {
						fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((bTagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : getUserLabel(sNickFrom)) + " " + langr.l_wentaway_a + "</span></span>");
					}
					//flashObj.playTagSnd();
				}
			}
		}
	}
	else {
		var nothing = '';
		ouserMe.away = true;
		formatUserLabel(ouserMe, plbMe);
		updateUserIcon(ouserMe, puicoMe, plbMe, nothing);
		if (sMessage.length > 0) {
			ouserMe.awaymsg = sMessage;
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='msgfrmt4me'> " + langr.l_umarkedaway_a + " " + langr.l_umarkedaway_b + " " + ParseTextMessage(sMessage) + "</span></span></span>");
		}
		else {
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='msgfrmt4me'> " + langr.l_umarkedaway_a + "</span></span></span>");
		}
	}
}
function on822Pr(sNickFrom, sMessage) {
	//ToDo: add reason tool tip or something similar
	if (sMessage == XmlNullChar) sMessage = '';
	if (sNickFrom != ouserMe.nick) {
		var idx = olvUsers.findUser(sNickFrom);
		if (idx > -1) {
			tmpUser.pUser.away = true;
			olvUsers.updateItemById(idx, tmpUser, UPDATEUSER_FORMATING);
			var oUser = olvUsers.getItemByName(sNickFrom).pUser;
			var bTagged = oUser.tagged;
			oUser.awaymsg = sMessage;
			if (bDspStatusChg != false) {
				if (sMessage.length > 0 && (oUser.ignore == false || oUser.ilevel > IsSuperOwner)) {
					fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((bTagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : "<span class='cpnickuser'>" + getUserLabel(sNickFrom) + "</span>") + " " + langr.l_wentaway_a + " " + langr.l_wentaway_b + " " + ParseTextMessage(sMessage) + "</span></span>");
				}
				else {
					fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((bTagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : "<span class='cpnickuser'>" + getUserLabel(sNickFrom) + "</span>") + " " + langr.l_wentaway_a + "</span></span>");
				}
				//flashObj.playTagSnd();
			}
		}
	}
	else {
		var nothing = '';
		ouserMe.away = true;
		formatUserLabel(ouserMe, plbMe);
		updateUserIcon(ouserMe, puicoMe, plbMe, nothing);
		if (sMessage.length > 0) {
			ouserMe.awaymsg = sMessage;
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='msgfrmt4me'> <b>" + langr.l_umarkedaway_a + " " + langr.l_umarkedaway_b + " " + ParseTextMessage(sMessage) + "</span></span></span>");
		}
		else {
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='msgfrmt4me'> <b>" + langr.l_umarkedaway_a + "</span></span></span>");
		}
	}
}
function on821Chan(sNickFrom, sChan, sMessage) {
	//ToDo: tagged
	if (sMessage == XmlNullChar) sMessage = '';
	if (sNickFrom != ouserMe.nick) {
		var idx = olvUsers.findUser(sNickFrom);
		if (idx > -1) {
			tmpUser.pUser.away = false;
			olvUsers.updateItemById(idx, tmpUser, UPDATEUSER_FORMATING);
			var oUser = olvUsers.getItemById(idx).pUser;
			var bTagged = oUser.tagged;
			if (bDspStatusChg != false) {
				if (oUser.ignore == false || oUser.ilevel > IsSuperOwner) {
					fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((bTagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : getUserLabel(sNickFrom)) + " " + langr.l_isback + "</span></span>");
					//flashObj.playTagSnd();
				}
			}
		}
	}
	else {
		var nothing = '';
		ouserMe.away = false;
		formatUserLabel(ouserMe, plbMe);
		updateUserIcon(ouserMe, puicoMe, plbMe, nothing);
		fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='msgfrmt4me'> " + langr.l_nolongeraway + "</span></span></span>");
	}
}

function on821Pr(sNickFrom, sMessage) {
	//ToDo: tagged
	if (sMessage == XmlNullChar) sMessage = '';
	if (sNickFrom != ouserMe.nick) {
		var idx = olvUsers.findUser(sNickFrom);
		if (idx > -1) {
			tmpUser.pUser.away = false;
			olvUsers.updateItemById(idx, tmpUser, UPDATEUSER_FORMATING);
			var oUser = olvUsers.getItemByName(sNickFrom).pUser;
			var bTagged = oUser.tagged;
			if (bDspStatusChg != false) {
				fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + ((bTagged == true) ? ("<span class='cpnicktaggeduser'>" + getUserLabel(sNickFrom) + "</span>") : "<span class='cpnickuser'>" + getUserLabel(sNickFrom) + "</span>") + " " + langr.l_isback + "</span></span>");
				//flashObj.playTagSnd();
			}
		}
	}
	else {
		var nothing = '';
		ouserMe.away = false;
		formatUserLabel(ouserMe, plbMe);
		updateUserIcon(ouserMe, puicoMe, plbMe, nothing);
		fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + "<span class='msgfrmt4me'> " + langr.l_nolongeraway + ".</span></span></span>");
	}
}
function onNameslist(aNames) {
	//ToDo: check performance between js vs. flash
}
function onSetNick(sNick) {
	ouserMe.nick = sNick;
}
function onIniLocalUser(oluser) {
	//debugOutput("-", "onIniLocalUser");
	ouserMe = oluser;
}
function onNick(sOldNick, sNewNick) {
	var idx = olvUsers.findUser(sOldNick);
	if (idx > -1) {
		tmpUser.pUser.nick = sNewNick;
		olvUsers.updateItemById(idx, tmpUser, UPDATEUSER_TEXT);
		fnAppendText("<span class='msgfrmtparent'><span class='nickchange'>" + cmdIndChar + " " + getUserLabel(sOldNick) + " " + langr.l_isknownas + " " + getUserLabel(sNewNick) + ".</span></span>");
		if (aaTagged[sOldNick]) {
			removeTag(sOldNick);
			addTag(sNewNick);
		}
		//ToDo: whispers, tagged event
		WhisphersNickChange(sOldNick, sNewNick);
	}
}
function onNickMe(sNewNick) {
	ouserMe.nick = sNewNick;
	updateUserLabel2(ouserMe, plbMe);
	fnAppendText("<span class='msgfrmtparent'><span class='nickchangeme'>" + cmdIndChar + " " + langr.l_knownas + " " + getUserLabel(ouserMe.nick) + ".</span></span>");
}
function onChanMode(sSender, sModes, sChan) {
	//Mike Addon to Fix null mode
	Modes[0] = Modes[0].replace("null", "");
	//ToDo:
	var bSignAdd = true, b_xm_ops = false;
	var bModeFound = false, aSubPos = new Array();
	var sTmpStrAdd = "", sTmpStrSubrem = "";
	var i = 0; var j = 0;
	for (i = 0; i < sModes.length; i++) {
		if (sModes.charAt(i) == "-") {
			bSignAdd = false;
			continue;
		}
		else if (sModes.charAt(i) == "+") {
			bSignAdd = true;
			continue;
		}
		if (bSignAdd == true) {
			for (j = 0; j < Modes[0].length; j++) {
				if (Modes[0].charAt(j) == sModes.charAt(i)) {
					bModeFound = true;
					break;
				}
			}
			if (bModeFound == false) {
				sTmpStrAdd += sModes.charAt(i);
				switch (sModes.charAt(i)) {
					case "m":
						b_xm_ops = Is_m_Mode = true;
						break;
					case "x":
						b_xm_ops = Is_x_Mode = true;
						break;
				}
			}
			bModeFound = false;
		}
		else {
			for (j = 0; j < Modes[0].length; j++) {
				if (Modes[0].charAt(j) == sModes.charAt(i)) {
					aSubPos.push(j);

					switch (sModes.charAt(i)) {
						case "m":
							Is_m_Mode = false;
							b_xm_ops = true;
							break;
						case "x":
							Is_x_Mode = false;
							b_xm_ops = true;
							break;
					}

					break;
				}
			}
		}
	}

	if (aSubPos.length > 0) {
		i = 0;
		j = 0;

		while ((i < aSubPos.length) && (j < Modes[0].length)) {
			if (aSubPos[i] != j) {
				sTmpStrSubrem += Modes[0].charAt(j);
				j++;
			}
			else {
				i++;
				j++;
			}
		}

		if (j < Modes[0].length) sTmpStrSubrem += Modes[0].substr(j);

		Modes[0] = sTmpStrSubrem + sTmpStrAdd;
	}
	else Modes[0] = Modes[0] + sTmpStrAdd;

	//if (sTmpStrSubrem.length > 0 || sTmpStrAdd.length > 0) {
	UpdateLblModes();
	UpdateChatRoomIcon();
	fnAppendText("<span class='msgfrmtparent'><span class='modechange'>" + cmdIndChar + " " + getUserLabel(sSender) + " " + langr.l_changedmodes + " " + sModes + "</span></span>");
	//}

	if (b_xm_ops == true) {
		var nothing = '';
		updateUserIcon(ouserMe, puicoMe, plbMem, nothing);
		olvUsers.redrawList();
	}
}

function on324(sChan, sNModes, s_l_Mode, s_k_Mode) {
	//ToDo:
	//debugOutput(sNModes, "on324");
	if (sNModes == XmlNullChar) sNModes = '';
	Modes[0] = sNModes;

	if (s_l_Mode != undefined) {
		Modes[1] = "l";
		Modes[3] = " " + s_l_Mode;
	}

	if (s_k_Mode != undefined) {
		Modes[2] = "k";
		Modes[4] = " " + s_k_Mode;
	}

	if (Modes[0].indexOf("m") >= 0) Is_m_Mode = true;
	else Is_m_Mode = false;

	if (Modes[0].indexOf("x") >= 0) Is_x_Mode = true;
	else Is_x_Mode = false;

	UpdateLblModes();
	UpdateChatRoomIcon();
	if (Is_m_Mode == true || Is_x_Mode == true) olvUsers.redrawList();
	var nothing = '';
	updateUserIcon(ouserMe, puicoMe, plbMe, nothing);
}
function sendToaccess(str) {
	$("#accessPane").contents().find("#accessBody").append(str);
}
var acount = 0;
function onAccessNRelatedReplies(numeric, srv_message) {
	var astr = numeric + " " + srv_message;
	var aentry = astr.split(" ");
	if ($('#accessContainer').is(':visible')) {
		if (ouserMe.ilevel >= IsSuperOwner) {
			if (numeric == "801") { $("#accessPane").contents().find("#accessBody").empty(); flashObj.sendToServer("access " + m_sChan + " list"); }
			if (numeric == "803") { acount = 1; }
			if (numeric == "804") {
				var abywho = aentry[8].split("!");
				var anotes = aentry.slice(9).join(" ");
				if (aentry[5] == "OWNER") { var aicon = "<i style=\"color:#D7B700;\" class=\"fa fa-legal\"></i>"; }
				else if (aentry[5] == "HOST") { var aicon = "<i style=\"color:brown;\" class=\"fa fa-legal\"></i>"; }
				else if (aentry[5] == "DENY") { var aicon = "<i style=\"color:red;\" class=\"fa fa-ban\"></i>"; }
				else if (aentry[5] == "GRANT") { var aicon = "<i style=\"color:orange;\" class=\"fa fa-star\"></i>"; }
				else if (aentry[5] == "VOICE") { var aicon = "<i style=\"color:purple;\" class=\"fa fa-microphone\"></i>"; }
				else { var aicon = ""; }
				sendToaccess("<tr id=\"accessholder_" + acount + "\"><td class=\"access-icon\">" + aicon + "</td><td id=\"accesstype_" + acount + "\" class=\"access-type\">" + aentry[5] + "</td><td id=\"accessmask_" + acount + "\" class=\"access-mask\">" + aentry[6] + "</td><td class=\"access-time\">" + aentry[7] + "</td><td class=\"access-who\">" + abywho[0] + "</td><td class=\"access-notes\">" + anotes.substr(1) + "</td><td class=\"access-delete\"><a id=\"accessdelete_" + acount + "\" style=\"color:red;\" href=\"#\"><i class=\"fa fa-user-times\"></i></a></td></tr>");
				acount++;
			}
		}
	}
	else {
		if (numeric == "801") {
			var ereason = aentry.slice(4).join(" ");
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_accessadd + " " + ereason + "</span></span>");
		}
	}
	if (numeric == '914') {
		var ereason = aentry.slice(4).join(" ").substr(1);
		fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error + " " + ereason + "</span></span>");
	}
	/*
	
	*Access*
	801: IRCRPL_ACCESSADD
	802: IRCRPL_ACCESSDELETE
	803: IRCRPL_ACCESSSTART
	804: IRCRPL_ACCESSLIST
	805: IRCRPL_ACCESSEND
	820: IRCRPL_ACCESSEND
	903: IRCERR_BADLEVEL
	913: IRCERR_NOACCESS
	914: IRCERR_DUPACCESS
	915: IRCERR_MISACCESS
	916: IRCERR_TOOMANYACCESSES

	*Shared by other commands but also used in access*
	900: IRCERR_BADCOMMAND
	901: IRCERR_TOOMANYARGUMENTS
	925: IRCERR_TOOMANYARGUMENTS

	*/

}
// Room Properties
function sendToprops(str) {
	$("#propsPane").contents().find("#propsdebug").append(str);
}
function onPropReplies(numeric, sChan, srv_message) {
	if ($('#propsContainer').is(':visible')) {
		sendToprops(numeric + ": " + srv_message + "&#xA;");
		var pentry = srv_message.split(" ");
		if (numeric == 818) {
			var propinfo = pentry.slice(5).join(" ").substring(1);
			if (pentry[4] === 'ChanSuperOwnerID') {
				$("#propsPane").contents().find("#superownername").val(propinfo);
			}
			else if (pentry[4] === 'TOPIC') {
				$("#propsPane").contents().find("#topicbox").val(propinfo);
			}
			else if (pentry[4] === 'ONJOIN') {
				$("#propsPane").contents().find("#onjoinbox").val(propinfo);
			}
			else if (pentry[4] === 'OWNERKEY') {
				$("#propsPane").contents().find("#ownerkeybox").val(propinfo);
			}
			else if (pentry[4] === 'HOSTKEY') {
				$("#propsPane").contents().find("#hostkeybox").val(propinfo);
			}
			else if (pentry[4] === 'CATEGORY') {
				var pcat = propinfo.toUpperCase();
				$("#propsPane").contents().find("#categoryselect").val(pcat);
			}
			else if (pentry[4] === 'LANGUAGE') {
				var plang = propinfo.toUpperCase();
				var plang = plang.split("-");
				$("#propsPane").contents().find("#languageselect").val(plang[0]);
			}
			else if (pentry[4] === 'LOCKED') {
				if (srv_message.includes("CATEGORY")) {
					$("#propsPane").contents().find("#categorylock").prop("checked", true);
					$("#propsPane").contents().find("#categoryselect").prop("disabled", true);
					$("#propsPane").contents().find("#categoryset").prop("disabled", true);
				}
				if (srv_message.includes("LANGUAGE")) {
					$("#propsPane").contents().find("#languagelock").prop("checked", true);
					$("#propsPane").contents().find("#languageselect").prop("disabled", true);
					$("#propsPane").contents().find("#languageset").prop("disabled", true);
				}
				if (srv_message.includes("HOSTKEY")) {
					$("#propsPane").contents().find("#hostkeylock").prop("checked", true);
					$("#propsPane").contents().find("#hostkeybox").prop("disabled", true);
					$("#propsPane").contents().find("#hostkeyset").prop("disabled", true);
				}
				if (srv_message.includes("OWNERKEY")) {
					$("#propsPane").contents().find("#ownerkeylock").prop("checked", true);
					$("#propsPane").contents().find("#ownerkeybox").prop("disabled", true);
					$("#propsPane").contents().find("#ownerkeyset").prop("disabled", true);
				}
				if (srv_message.includes("TOPIC")) {
					$("#propsPane").contents().find("#topiclock").prop("checked", true);
					$("#propsPane").contents().find("#topicbox").prop("disabled", true);
					$("#propsPane").contents().find("#topicset").prop("disabled", true);
				}
				if (srv_message.includes("ONJOIN")) {
					$("#propsPane").contents().find("#onjoinlock").prop("checked", true);
					$("#propsPane").contents().find("#onjoinbox").prop("disabled", true);
					$("#propsPane").contents().find("#onjoinset").prop("disabled", true);
				}
			}
		}
	}
}




function onChanModeWParams(sSender, modeoplist, sChan) {
	var bModesChanged = false;
	var sModes = "", sParams = "";

	for (var i = 0; i < modeoplist.length; i++) {
		switch (modeoplist[i].mode) {
			case "l":
				if (modeoplist[i].op == "+") {
					Modes[1] = "l";
					Modes[3] = " " + modeoplist[i].param;
					sModes += "+l"; sParams += Modes[3];
				}
				else {
					Modes[1] = "";
					Modes[3] = "";
					sModes += "-l"; sParams += Modes[3];
				}
				bModesChanged = true;
				break;

			case "k":
				if (modeoplist[i].op == "+") {
					Modes[2] = "k";
					Modes[4] = " " + modeoplist[i].param;
					sModes += "+k"; sParams += "";
				}
				else {
					Modes[2] = "";
					Modes[4] = "";
					sModes += "-k"; sParams += "";
				}
				bModesChanged = true;
				break;
		}
	}

	if (bModesChanged == true) {
		fnAppendText("<span class='msgfrmtparent'><span class='modechange'>" + cmdIndChar + " " + getUserLabel(sSender) + " " + langr.l_changedmodes + " " + sModes + sParams + "</span></span>");
		UpdateLblModes();
	}
}

function onUserMode(sSender, modeoplist, sChan) {
	var modeval = 0, bMeModeChanged = false;
	var sTmp = "";

	for (var i = 0; i < modeoplist.length; i++) {
		if (modeoplist[i].param != ouserMe.nick) {
			if (updateUser(modeoplist[i]) >= 0) {
				fnAppendText("<span class='msgfrmtparent'><span class='modechange'>" + cmdIndChar + " " + getUserLabel(sSender) + " " + modeoplist[i].op + modeoplist[i].mode + " " + getUserLabel(modeoplist[i].param) + "</span></span>");
			}
		}
		else {
			modeval = getUserModeVal(modeoplist[i].mode);

			if (modeoplist[i].op == "+") {
				if (modeval == -1 && ouserMe.voice != true) {
					ouserMe.voice = true;
					bMeModeChanged = true;
					sTmp += modeoplist[i].op + modeoplist[i].mode;
				}
				else if (((modeval & ouserMe.ilevel) != modeval) && modeval != -1) {
					ouserMe.ilevel |= modeval;
					bMeModeChanged = true;
					sTmp += modeoplist[i].op + modeoplist[i].mode;
				}
			}
			else {
				if (modeval == -1 && ouserMe.voice != false) {
					ouserMe.voice = false;
					bMeModeChanged = true;
					sTmp += modeoplist[i].op + modeoplist[i].mode;
				}
				else if (((modeval & ouserMe.ilevel) == modeval) && modeval != -1) {
					ouserMe.ilevel ^= modeval;
					bMeModeChanged = true;
					sTmp += modeoplist[i].op + modeoplist[i].mode;
				}
			}
		}
	}

	if (bMeModeChanged == true) {
		var nothing = '';
		updateUserIcon(ouserMe, puicoMe, plbMe, nothing);

		formatUserLabel(ouserMe, plbMe);
		//debugOutput("-", "onUserMode");

		updateLVIMenu();

		fnAppendText("<span class='msgfrmtparent'><span class='modechangeme'>" + cmdIndChar + " " + getUserLabel(sSender) + " " + langr.l_haschangedmodesto + " " + sTmp + "</span></span>");
	}
}
// Update Knock 05/15/2016 - Mike
function onKnock(sFrom, sChan, sMessage) {
	if (sMessage == '474') { sMessage = '(' + langr.l_banned + ')'; }
	else if (sMessage == '473') { sMessage = '(' + langr.l_inviteonly + ')'; }
	else if (sMessage == '471') { sMessage = '(' + langr.l_roomfull + ')'; }
	else { sMessage = ''; }
	if (sMessage != '') {
		if (ouserMe.ilevel >= IsOwner) {
			if (!waitknock) {
				var sFromNick = sFrom.split("!");
				var sFromIdent = sFromNick[1].match(/\./g).length;
				var sFromIdentGate = sFromNick[1].split(".");
				var sFromFinalGate = sFromIdentGate[sFromIdent].split("@");
				if (sMessage.length > 0) {
					sendTostatus("<span class='knock'>" + cmdIndChar + " " + getUserLabel(sFromNick[0]) + " (" + sFromFinalGate[0] + ") " + langr.l_knocked_a + " " + langr.l_knocked_b + " " + ParseTextMessage(sMessage) + "</span>");
				}
				else {
					sendTostatus("<span class='knock'>" + cmdIndChar + " " + getUserLabel(sFrom) + " " + langr.l_knocked_a + "</span>");
				}
				waitknock = true;
				setTimeout(function () {
					waitknock = false;
				}, 60000);
			}
		}
	}
}

//Invite Flood Protection
var LastInviteTime = 0;
var iInviteCountUnderlimit = 0;
var InviteBlockAlert = false;

function checkInviteFlood() {
	var t = new Date();

	curInviteTime = t.getTime() / 1000;

	if ((curInviteTime - LastInviteTime) > 60) {
		iInviteCountUnderlimit = 0;
		InviteBlockAlert = false;
		flashObj.InviteFlood(false);
	}
	else {
		iInviteCountUnderlimit++;
	}

	LastInviteTime = curInviteTime;

	if (iInviteCountUnderlimit > 2) return true;
}

function onInvite(sNickFrom, sNickTo, sChanFor) {
	if (bInviteOn == false) {
		if (checkInviteFlood() == true) {
			if (InviteBlockAlert == false) {
				fnAppendText("<span class='msgfrmtparent'><span class='invite'><i>" + langr.l_blockedinviteflood + "</i></span></span>");
				InviteBlockAlert = true;
				flashObj.InviteFlood(true);
			}
			return;
		}

		if (isHtmlTag(sChanFor) == false) {
			sChanForR = FixChannelEncoding(sChanFor);
			var sURI = sSiteURL + "c/?cn=" + DecodeRoomName(sChanForR);
			fnAppendText("<span class='msgfrmtparent'><span class='invite'>" + cmdIndChar + " " + getUserLabel(sNickFrom) + " " + langr.l_hasinvitedyou + "<u><a href='" + sURI + "' target='_blank'>" + DecodeRoomName(sChanForR) + "</a></u>.'</span></span>");
		}
		else {
			fnAppendText("<span class='msgfrmtparent'><span class='invite'><i>" + cmdIndChar + " " + langr.l_blockedinvite_a + " \"" + getUserLabel(sNickFrom) + "\" " + langr.l_blockedinvite_b + "</i></span></span>");
		}
	}
}

function onDataIRC(sNickBy, sType, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';

	if (sType == "PID") {
		sPID = sMessage.split(" ");
		openProfileWindow(sPID[1]);
		return;
	}
}

function onDataIRC2(sNickFrom, sChan, sNickTo, sTag, sMessage) {
	if (sMessage == XmlNullChar) sMessage = '';
	switch (sTag) {
		case "CMWHISP":
			customWhispData(sNickFrom, sMessage);
			break;
	}
}

function onErrorReplies(nErrorNum, sNickTo, sTarget, sMessage) {
	//ToDo: check if all irc errors replies follow the same format. Potential for abuse, check if users can send custom messages as error replies
	if (sMessage == XmlNullChar) sMessage = '';

	switch (nErrorNum) {
		case "403":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error403_a + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\" " + langr.l_error403_b + "</span></span>");
			flashObj.sckDisconnect();
			break;

		case "404":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error404 + " " + sMessage + "</span></span>");
			break;

		case "431":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error431 + "</span></span>");
			break;

		case "432":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error432 + "</span></span>");
			break;

		case "433":
			if (sTarget.indexOf(">Guest") < 0) fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error433_a + " \"" + getUserLabel(sTarget) + "\" " + langr.l_error433_b + "</span></span>");
			break;

		case "441":
			// Update Mike 3/26/2017 error flood protection
			if (!waiterror) {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error441 + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\"; " + sMessage + "</span></span>");
				waiterror = true;
				setTimeout(function () {
					waiterror = false;
				}, 3000);
			}
			break;

		case "442":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error442 + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\"; " + sMessage + "</span></span>");
			break;

		case "451":
			//fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr_lerror451 + " "+ sMessage +"</span></span>");
			break;

		case "461":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error461 + " " + DecodeRoomName(FixChannelEncoding(sTarget)) + "; " + sMessage + "</span></span>");
			break;

		case "471":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error471_a + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\" " + langr.l_error471_a + "</span></span>");
			flashObj.sendToServer("KNOCK " + FixChannelEncoding(sTarget) + " 471");
			break;

		case "473":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error473_a + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\" " + langr.l_error473_b + "</span></span>");
			flashObj.sendToServer("KNOCK " + FixChannelEncoding(sTarget) + " 473");
			break;

		case "474":
			if (IsGuestInfoSet) {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error474_a + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\" " + langr.l_error474_b + " " + langr.l_error474_c + "</span></span>");
			}
			else {
				fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error474_a + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\" " + langr.l_error474_b + "</span></span>");
			}
			if (sMessage.indexOf("+u") > -1) {
				flashObj.sendToServer("KNOCK " + FixChannelEncoding(sTarget) + " 474");
			}
			//flashObj.sckDisconnect();
			break;

		// Mike Update 04/05/16 Added Key Support
		case "475":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error475_a + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\" " + langr.l_error475_b + "</span></span>");
			var strKey = prompt(langr.l_enterkey, "");
			try {
				if (strKey.length > 0) {
					flashObj.sendToServer("JOIN " + FixChannelEncoding(sTarget) + " " + strKey);
				}
			}
			catch (ex) {
			}
			break;

		case "927":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error927 + " \"" + DecodeRoomName(FixChannelEncoding(sTarget)) + "\"; " + sMessage + "</span></span>");
			break;

		case "999":
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_error999 + " " + sMessage + "</span></span>");
			break;
	}
	if ($('#chatwindowholder').is(':visible')) { }
	else {
		clearInterval(chatflash);
		chatflash = setInterval(function () { $("#chattab").toggleClass("blinktab"); }, 600);
	}
}

// </Flash Object Events>


//---- ListView
var loopcount = 0;
var loopcountsub = 0;

var gNewFocus;

function setFocus() {
	gNewFocus.focus();
}

function logMax() {
	if (loopcountsub > loopcount) loopcount = loopcountsub;
}

function ListView(pListViewParent) {
	var plvParent = pListViewParent; var selectedItem = null;
	var alvUsers = new Array();
	var alvUsers2 = new Array();
	IntializeLV();

	//---- methods -----
	this.addItem = ptAddItem;
	this.removeItemByName = ptRemItemByName;
	this.removeItemByName2 = ptRemItemByName2;
	this.removeItemById = ptRemItemById;
	this.removeAll = fptRemoveAll;
	this.updateItemByName = null;
	this.updateItemById = ptUpdateItemById; //param:id, pUpdatedLVI; return: void;
	this.getItemByName = ptGetItemByName; //param:sNom; return: User Object Reference;
	this.getItemById = fptGetItemById;
	this.findUser = fptFindUser;
	this.redrawList = fptRedrawList;
	this.length = pfnLength;
	this.selectedUser = pfnSelectedUser;
	this.selectedLVI = pfnSelectedLVI;
	this.unselectLVI = unSelectItem;

	//---- events ----
	var bDisableOnSelectLVI = false;

	function onlvikeypress(ev, lvi) {
		if (ev == null) ev = window.event;
		var nlvi = null;

		try {
			// navflag: prev = -1, next = 1, same = 0;
			if (ev.keyCode == KEY_DOWN) {
				nlvi = getRelativeLVI(lvi, 1);
			}
			else if (ev.keyCode == KEY_UP) {
				nlvi = getRelativeLVI(lvi, -1);
			}

			//alert(nlvi);
			if (nlvi) selectItem(nlvi);
		}
		catch (ex) {
			debugOutput(ex, 'onlvikeypress');
		}
	}

	function onselectlvi(lvi) {
		if (!bDisableOnSelectLVI) selectItem(lvi);
	}

	function onDoubleClick() {
		OpenWhisperTab();
		//OpenWhisperWindow();
	}
	//---- functions ----

	function IntializeLV() {
		// cleaning nodes
		while (plvParent.childNodes.length > 0) {
			for (var i = 0; i < plvParent.childNodes.length; i++) {
				plvParent.removeChild(plvParent.childNodes[i]);
			}
		}
	}

	function LVIUser(id, pLVItem, pIco, pLabel, pUser, pIggy) {
		this.id = id || -2;
		this.pLVItem = pLVItem || null;
		this.pIco = pIco || null;
		this.pLabel = pLabel || null;
		this.pUser = pUser || null;
		this.pIggy = pIggy || null;
	}

	function pfnUpdateLVIPos(lvi, pos) {
		lvi.id = pos;
		lvi.pLVItem.id = 'lvi' + pos;
		lvi.pIco.id = 'lvie' + pos;
		lvi.pLabel.id = 'lvit' + pos;
		lvi.pIggy.id = 'lviig' + pos;
	}

	function getRelativeLVI(clvi, navflag) {
		var nlvi = null;

		switch (navflag) {
			case 1:
				nlvi = clvi.nextSibling;
				break;

			case -1:
				nlvi = clvi.previousSibling;
				break;
		}

		return nlvi;
	}

	function selectItem(lvi) {
		var pos = lvi.id.substr(3);
		unSelectItem(selectedItem);
		$('.lvuitemlb').removeClass('lvuitemlbSelected');
		plbMe.className = 'lvuitemlbMe';
		selectedItem = alvUsers[pos];
		selectedItem.pLabel.className += " lvuitemlbSelected";
		selectedItem.pLVItem.tabIndex = 0;
		gNewFocus = selectedItem.pLabel;
		setTimeout("setFocus();", 0);
		UpdateUI(selectedItem.pUser);
	}

	function unSelectItem(lvi) {
		if (lvi != null) {
			//lvi.pLabel.style.color = '#0000cd';
			//lvi.pLabel.style.backgroundColor = '';
			lvi.pLVItem.tabIndex = -1;
		}
	}

	function pfnSelectedUser() {
		return (selectedItem) ? selectedItem.pUser : null;
	}

	function pfnSelectedLVI() {
		return (selectedItem) ? selectedItem : null;
	}

	function UserCompare(u1, u2) {
		loopcountsub++;

		u1slev = getSimpleLevel(u1.pUser);
		u2slev = getSimpleLevel(u2.pUser);

		if (u1slev != u2slev) {
			if (u1slev < u2slev) return 1;
			else if (u1slev > u2slev) return -1;
			else {
				return cnicks(u1, u2);
			}
		}
		else {
			return cnicks(u1, u2);
		}
	}

	function cnicks(u1, u2) {
		if ((u1.pUser.nick.charAt(0) == ">") && (u2.pUser.nick.charAt(0) != ">")) return 1;
		else if ((u1.pUser.nick.charAt(0) != ">") && (u2.pUser.nick.charAt(0) == ">")) return -1;
		else {
			if (u1.pUser.nick > u2.pUser.nick) return 1;
			else if (u1.pUser.nick < u2.pUser.nick) return -1;
			else return 0;
		}
	}

	function getLVIPos(lvi) {
		if (alvUsers.length == 0) return 0;

		var j = 0;
		var i = 0;

		for (i = 0; i < alvUsers.length; i++) {
			j = UserCompare(alvUsers[i], lvi);
			//debugOutput(j, 'getLVIPos');
			if (j >= 0) return i;
		}
		return i;
	}

	function adjustLVItem(lvi, pos) {
		//ToDo: change id attrib to pos
		if (alvUsers.length == pos) {
			loopcountsub++;
			alvUsers.push(lvi);
			plvParent.appendChild(lvi.pLVItem);
			pfnUpdateLVIPos(lvi, pos);
		}
		else {
			alvUsers.splice(pos, 0, lvi);
			plvParent.insertBefore(lvi.pLVItem, alvUsers[pos + 1].pLVItem);
			pfnUpdateLVIPos(lvi, pos);

			for (var i = (pos + 1); i < alvUsers.length; i++) {
				loopcountsub++;
				pfnUpdateLVIPos(alvUsers[i], i);
			}
		}
	}

	function adjustLVItem2(lvi, p1, p2) {
		var istart = -1;

		if (p1 == p2 || (p1 + 1) == p2) {
			loopcountsub++;

			//alvUsers[p1] = lvi;
			//commented because dom nodes assignment like this causes error.
			//ToDo: check if commenting introduces some bugs
			//plvParent.childNodes[p1] = lvi.pLVItem;

		}
		else if (alvUsers.length == p2) {
			loopcountsub++;

			alvUsers.splice(p1, 1);
			alvUsers.push(lvi);
			pfnUpdateLVIPos(lvi, (p2 - 1));
			plvParent.removeChild(plvParent.childNodes[p1]);
			plvParent.appendChild(lvi.pLVItem);

			istart = p1;
		}
		else {
			alvUsers.splice(p1, 1);
			plvParent.removeChild(plvParent.childNodes[p1]);

			if (p2 < p1) {
				plvParent.insertBefore(lvi.pLVItem, alvUsers[p2].pLVItem);
				alvUsers.splice(p2, 0, lvi);
				istart = p2;
			}
			else {
				plvParent.insertBefore(lvi.pLVItem, alvUsers[p2 - 1].pLVItem);
				alvUsers.splice((p2 - 1), 0, lvi);
				istart = p1;
			}
		}

		if (istart != -1) {
			for (var i = istart; i < alvUsers.length; i++) {
				loopcountsub++;
				pfnUpdateLVIPos(alvUsers[i], i);
			}
		}
	}

	function getLVIChild(childid, lvi) {
		for (var i = 0; i < lvi.childNodes.length; i++) {
			if (lvi.childNodes[i].id == childid) return lvi.childNodes[i];
		}
	}

	function ptAddItem(oUser) {
		//ToDo: optimize

		bDisableOnSelectLVI = true;

		var lvuItem = document.createElement('div');
		lvuItem.className = 'lvuitem';
		//var id = plvParent.childNodes.length;

		lvuItem.id = 'lvi' + -2;
		lvuItem.tabIndex = -1;
		lvuItem.onclick = function () { onselectlvi(this) };
		lvuItem.oncontextmenu = function () { onselectlvi(this) };
		lvuItem.ondblclick = function () { onDoubleClick(this) };

		lvuItem.onkeydown = function (event) { onlvikeypress(event, this) };
		//lvuItem.onkeypress = function(){onkeypress(this)};
		if (getUserLabel2(oUser).length > 23) { var maketitle = getUserLabel2(oUser); }
		else { var maketitle = ''; }
		lvuItem.innerHTML = '<img unselectable="on" tabindex="-1" src="' + fnGetIgnore(oUser) + '" border="0" class="lvuitemicob" id="lviig-2" /><img unselectable="on" tabindex="-1" src="' + fnGetIco(oUser) + '" border="0" class="lvuitemico" id="lvie-2" /><span title="' + maketitle + '" unselectable="on" tabindex="-1" class="lvuitemlb" id="lvit-2" >' + getUserLabel2(oUser) + '</span></div>';

		var oIco = getLVIChild('lvie-2', lvuItem);
		var oLbl = getLVIChild('lvit-2', lvuItem);
		var oIggyIco = getLVIChild('lviig-2', lvuItem);
		var pLVIUser = new LVIUser(-2, lvuItem, oIco, oLbl, oUser, oIggyIco);

		formatUserLabel(oUser, oLbl);

		loopcountsub = 0;

		var pos = getLVIPos(pLVIUser);
		adjustLVItem(pLVIUser, pos);

		logMax();
		bDisableOnSelectLVI = false;

		return pLVIUser;
	}

	function removeLVItem(pos) {
		if (selectedItem != null) {
			if (alvUsers[pos].pLVItem == selectedItem.pLVItem) selectedItem = null;
		}

		lvUsers.removeChild(alvUsers[pos].pLVItem);
		alvUsers.splice(pos, 1);
		if (pos < (alvUsers.length)) {
			for (var i = pos; i < alvUsers.length; i++) {
				alvUsers[i].pLVItem.id = 'lvi' + i;
				alvUsers[i].id = i;
				//fnAppendText(JSON.stringify(alvUsers[i]));
				//pfnUpdateLVIPos(alvUsers[i],i);
			}
		}
		//fnAppendText(JSON.stringify(alvUsers));

	}

	function ptRemItemByName(sNom) {
		//ToDo: optimize
		for (var i = 0; i < alvUsers.length; i++) {
			if (alvUsers[i].pUser.nick == sNom) {
				removeLVItem(i);
				return i;
			}
		}

		return -1;
	}

	function ptRemItemByName2(sNom) {
		//ToDo: optimize
		for (var i = 0; i < alvUsers.length; i++) {
			if (alvUsers[i].pUser.nick == sNom) {
				var pUser = alvUsers[i].pUser;
				removeLVItem(i);
				return pUser;
			}
		}

		return null;
	}

	function ptRemItemById(id) {
		removeLVItem(id);
	}

	function fptRemoveAll() {
		lvUsers.innerHTML = '';
		alvUsers.splice(0, alvUsers.length);
	}

	function ptUpdateItemById(id, pUpdatedLVI, type) {
		//fnAppendText(id);
		//alert(alvUsers[id].pUser.nick);
		loopcountsub = 0;

		var tmpLVIUser = alvUsers[id];
		var pos = -1;

		switch (type) {
			case UPDATEUSER_TEXT:
				pUpdatedLVI.pUser.ilevel = tmpLVIUser.pUser.ilevel;
				pos = getLVIPos(pUpdatedLVI);

				tmpLVIUser.pUser.nick = pUpdatedLVI.pUser.nick;
				updateUserLabel2(tmpLVIUser.pUser, tmpLVIUser.pLabel);

				adjustLVItem2(tmpLVIUser, id, pos);
				break;

			case UPDATEUSER_FORMATING:
				tmpLVIUser.pUser.away = pUpdatedLVI.pUser.away;
				formatUserLabel(tmpLVIUser.pUser, tmpLVIUser.pLabel);
				updateUserIcon(tmpLVIUser.pUser, tmpLVIUser.pIco, tmpLVIUser.pLabel, tmpLVIUser.pIggy);
				break;

			case UPDATEUSER_ICON:
				pUpdatedLVI.pUser.nick = tmpLVIUser.pUser.nick;
				pos = getLVIPos(pUpdatedLVI);

				tmpLVIUser.pUser.host = pUpdatedLVI.pUser.host;
				tmpLVIUser.pUser.ilevel = pUpdatedLVI.pUser.ilevel;
				//tmpLVIUser.pUser.iprofile = pUpdatedLVI.pUser.iprofile;
				updateUserIcon(tmpLVIUser.pUser, tmpLVIUser.pIco, tmpLVIUser.pLabel, tmpLVIUser.pIggy);
				adjustLVItem2(tmpLVIUser, id, pos);
				break;

			case UPDATEUSER_ICON2:
				tmpLVIUser.pUser.voice = pUpdatedLVI.pUser.voice;
				updateUserIcon(tmpLVIUser.pUser, tmpLVIUser.pIco, tmpLVIUser.pLabel, tmpLVIUser.pIggy);
				break;
		}

		logMax();
	}

	function ptGetItemByName(sNom) {
		//ToDo: optimize
		for (var i = 0; i < alvUsers.length; i++) {
			if (alvUsers[i].pUser.nick == sNom) return alvUsers[i];
		}
		return null;
	}

	function fptGetItemById(pos) {
		if (alvUsers.length != 0 && alvUsers.length > pos) return alvUsers[pos];

		return null;
	}

	function fptFindUser(sNom) {
		//ToDo: optimize
		for (var i = 0; i < alvUsers.length; i++) {
			if (alvUsers[i].pUser.nick == sNom) return i;
		}

		return -1;
	}

	function fptRedrawList() {
		for (var i = 0; i < alvUsers.length; i++) {
			formatUserLabel(alvUsers[i].pUser, alvUsers[i].pLabel);
			updateUserIcon(alvUsers[i].pUser, alvUsers[i].pIco, alvUsers[i].pLabel, alvUsers[i].pIggy);
		}
	}

	function pfnLength() {
		return alvUsers.length;
	}
}

// <whisper windows>

var WhisperWindows = new Array();
//wndWhisperListener = new Object();
var nMaxWhispWnds = 10;
var bInComingWhispWndsMaxed = false;

var wndEIcons;
var bWndEIconsIsOpen = false;
var wndPrefs;
var bWndPrefsIsOpen = false;

var WhispTest = 'Whisper window tester';
var offsetX = 0, offsetY = 0; var bGotOffsets = false;

function testWhispWnd() {
	return WhispTest;
}

function getHash(str) {
	//don't write full hash function, returned charcode for the nick is enough for unique id
	var strtmp = '';

	for (var i = 0; i < str.length; i++) {
		strtmp += str.charCodeAt(i);
	}

	return strtmp;
}

function customWhispData(nick, msg) {
	var str = '';
	switch (msg.toUpperCase()) {
		case "WHISPACCEPTNEEDED":
			str = "<div class='whispreq-tab'>" + langr.l_whispacceptneeded_a + " <span class='cpnickuser'>" + getUserLabel(nick) + "</span> " + langr.l_whispacceptneeded_a + " <span class='cpnickuser'>" + getUserLabel(nick) + "</span> " + langr.l_whispacceptneeded_a + "</div>"
			RenderWhisper2tabalt(nick, str);
			break;

		case "WHISPACCEPTED":
			str = "<div class='whispreq-tab'><span class='cpnickuser'>" + getUserLabel(nick) + "</span> " + langr.l_whispaccepted + "</div>"
			RenderWhisper2tabalt(nick, str);
			break;

		case "WHISPDECLINED":
			str = "<div class='whispreq-tab'><span class='cpnickuser'>" + getUserLabel(nick) + "</span> " + langr.l_whispdeclined + "</div>"
			RenderWhisper2tabalt(nick, str);
			break;

		case "WHISPWNDCLOSED":
			whispTabClosed(nick);
			break;

		case "WHISPOFF":
			str = "<div class='whispreq-tab'><span class='cpnickuser'>" + getUserLabel(nick) + "</span> " + langr.l_whispoff + "</div>"
			RenderWhisper2tabalt(nick, str);
			break;
	}
}


function WhisphersNickChange(sOldNick, sNewNick) {
	//// Broken
}




function remWhispRequest(pnode) {
	pnode.parentNode.removeChild(pnode);
}



//</whisper windows>

function getByIdFromCP(id) {
	var node = (isIE) ? ChatPane.document.getElementById(id) : pChatPane.contentDocument.getElementById(id);
	return node;
}

//---- <menu>
var _pmnucp = null, _pmnuhost = null, _pmnuhelpop = null, _pmnuuser = null;
var _clvicmnu = null;
var _pcpbody = null; var _pwndChat = null; var _pstatusbody = null; var _ptxsend = null;
var _mnuitemselected = false, prevmnuselected = null, _mnukeynavetimeout = true;

var _pMnuCopy = null;
var _pmiVPU = null, _pmiWU = null, _pmiIU = null, _pmiTUU = null, _pmiLTU = null, _pmiAMU = null;
var _pmiVPHO = null, _pmiWHO = null, _pmiIHO = null, _pmiTUHO = null, _pmiLTHO = null, _pmiAMHO = null, _pmiVHO = null, _pmiPHO = null, _pmiKHO = null;
//at the moment I'm adding owner mode in host menu, I may change this later and give owner and superowner their own menu.
var _pmiVPH = null, _pmiWH = null, _pmiIH = null, _pmiTUH = null, _pmiLTH = null, _pmiAMH = null, _pmiKH = null, _pmiKHM = null, _pmiB15mH = null, _pmiB1hH = null, _pmiB24hH = null, _pmiVH = null, _pmiPH = null, _pmiHOH = null, _pmiHH = null, _pmiOH = null;



//

var seltx = null;

function copyCP() {
	if (isIE) {
		//flashObj.copyToClipboard(_pcpbody.document.selection.createRange().text);
		clipboardData.setData("Text", _pcpbody.document.selection.createRange().text);
	}
	else if (isFF) {
		alert(langr.l_firefoxcopy);
	}
	else if (isWK) {
		pChatPane.contentDocument.execCommand("copy");
	}

	closeAllMenus();
}

function selectAllCP() {
	if (isIE) {
		seltx = _pcpbody.createTextRange();
		seltx.select();
	}
	else {
		pChatPane.contentDocument.defaultView.getSelection().selectAllChildren(_pcpbody);
		pChatPane.contentDocument.defaultView.focus();
	}

	closeAllMenus();
}

function clearCP() {
	clearChatPane();
	closeAllMenus();
}

function mifViewProfile() {
	fnViewProfile();
	closeAllMenus();
}

function mifWhisper() {
	setTimeout('closeAllMenus()', 7);
	OpenWhisperTab();
}

function mifIgnore() {
	fnIgnore();
	closeAllMenus();
}

function mifTaguser() {
	fnTag();
	closeAllMenus();
}

function mifLocaltime() {
	if (cmnuSelMe == false) {
		var cmdGetTime = "PRIVMSG " + m_sChan + " " + olvUsers.selectedUser().nick + " :\1TIME\1";
		flashObj.sendToServer(cmdGetTime);
		//debugOutput(cmdGetTime, 'mifLocaltime');
	}
	else {
		fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + cmdIndChar + " " + getUserLabel(ouserMe.nick) + "'s " + langr.l_localtime + " " + ParseTextMessage(flashObj.GetMyDateTime()) + "</span></span>");
	}

	closeAllMenus();
}

function mifAwayMessage() {
	var cmdGetAwayMsg = "AWAYMSG " + m_sChan + " " + olvUsers.selectedUser().nick;
	flashObj.sendToServer(cmdGetAwayMsg);
	closeAllMenus();
}

function mifVoice() {
	var sIRCCMD = "";

	if (cmnuSelMe == false) {
		if (olvUsers.selectedUser().voice == true) sIRCCMD = "MODE " + m_sChan + " -v " + olvUsers.selectedUser().nick;
		else sIRCCMD = "MODE " + m_sChan + " +v " + olvUsers.selectedUser().nick;
	}
	else {
		if (ouserMe.voice == true) sIRCCMD = "MODE " + m_sChan + " -v " + ouserMe.nick;
		else sIRCCMD = "MODE " + m_sChan + " +v " + ouserMe.nick;
	}

	flashObj.sendToServer(sIRCCMD);
	closeAllMenus();
}

function mifParti() {
	var sIRCCMD = "";

	if (cmnuSelMe == false) {
		sIRCCMD = "MODE " + m_sChan + " -qoh " + olvUsers.selectedUser().nick + " " + olvUsers.selectedUser().nick + " " + olvUsers.selectedUser().nick;
	}
	else {
		sIRCCMD = "MODE " + m_sChan + " -qoh " + ouserMe.nick + " " + ouserMe.nick + " " + ouserMe.nick;
	}

	flashObj.sendToServer(sIRCCMD);
	closeAllMenus();
}

function mifHelpOp() {
	var sIRCCMD = "";

	if (cmnuSelMe == false) {
		if ((olvUsers.selectedUser().ilevel & IsHelpOp) == IsHelpOp) sIRCCMD = "MODE " + m_sChan + " -h " + olvUsers.selectedUser().nick;
		else sIRCCMD = "MODE " + m_sChan + " +h-qo " + olvUsers.selectedUser().nick + " " + olvUsers.selectedUser().nick + " " + olvUsers.selectedUser().nick;
	}
	else {
		if ((ouserMe.ilevel & IsHelpOp) == IsHelpOp) sIRCCMD = "MODE " + m_sChan + " -h " + ouserMe.nick;
		else sIRCCMD = "MODE " + m_sChan + " +h-qo " + ouserMe.nick + " " + ouserMe.nick + " " + ouserMe.nick;
	}

	flashObj.sendToServer(sIRCCMD);
	closeAllMenus();
}

function mifHost() {
	var sIRCCMD = "";

	if (cmnuSelMe == false) {
		if ((olvUsers.selectedUser().ilevel & IsHost) == IsHost) sIRCCMD = "MODE " + m_sChan + " -oh " + olvUsers.selectedUser().nick + " " + olvUsers.selectedUser().nick;
		else sIRCCMD = "MODE " + m_sChan + " +o-q " + olvUsers.selectedUser().nick + " " + olvUsers.selectedUser().nick;
	}
	else {
		if ((ouserMe.ilevel & IsHost) == IsHost) sIRCCMD = "MODE " + m_sChan + " -oh " + ouserMe.nick + " " + ouserMe.nick;
		else sIRCCMD = "MODE " + m_sChan + " +o-q " + ouserMe.nick + " " + ouserMe.nick;
	}

	flashObj.sendToServer(sIRCCMD);
	closeAllMenus();
}

function mifOwner() {
	var sIRCCMD = "";

	if (cmnuSelMe == false) {
		if ((olvUsers.selectedUser().ilevel & IsOwner) == IsOwner) sIRCCMD = "MODE " + m_sChan + " -qoh " + olvUsers.selectedUser().nick + " " + olvUsers.selectedUser().nick + " " + olvUsers.selectedUser().nick;
		else sIRCCMD = "MODE " + m_sChan + " +q " + olvUsers.selectedUser().nick;
	}
	else {
		if ((ouserMe.ilevel & IsOwner) == IsOwner) sIRCCMD = "MODE " + m_sChan + " -qoh " + ouserMe.nick + " " + ouserMe.nick + " " + ouserMe.nick;
		else sIRCCMD = "MODE " + m_sChan + " +q " + ouserMe.nick;
	}

	flashObj.sendToServer(sIRCCMD);
	closeAllMenus();
}

function mifKick() {
	var sIRCCMD = "KICK " + m_sChan + " " + olvUsers.selectedUser().nick;
	flashObj.sendToServer(sIRCCMD);
	closeAllMenus();
}
function mifKickwmsg() {
	var kmsg = prompt(langr.l_enterkickmsg, "");
	if (kmsg != null) {
		var sIRCCMD = "KICK " + m_sChan + " " + olvUsers.selectedUser().nick + " " + kmsg;
		flashObj.sendToServer(sIRCCMD);
	}
	closeAllMenus();
}
function fnIrcKickBan(sMsg, type) {
	if (olvUsers.selectedUser() != null) {

		var selUserL = olvUsers.selectedUser();

		if (selUserL.ident != null) { fnKickBan(selUserL, type, sMsg); }
		else {
			var sIRCCMD = "USERHOST " + selUserL.nick;
			lstPendingActions.push({ sNick: selUserL.nick, sWaitingOn: "kickban@ident", flag: type, text: sMsg, timeout: 5, added: new Date() });
			flashObj.sendToServer(sIRCCMD);
		}
	}
	else {
		fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errornouser + "</span></span>");
	}
}

function fnKickBan(ppUser, flag, sMsg) {


	var selUserL = ppUser;

	var sIRCCMD = null;

	if (sMsg.length > 0) {
		sIRCCMD = "KICK " + m_sChan + " " + selUserL.nick + " " + sMsg;
	}
	else {
		sIRCCMD = "KICK " + m_sChan + " " + selUserL.nick;
	}

	switch (flag) {
		case CMD_KICK:
			break;

		case CMD_KICKBAN15M:
			sIRCCMD += " (ban 15 mins.).\r\n";
			sIRCCMD += "ACCESS " + m_sChan + " ADD DENY " + selUserL.ident + " 15 :";
			break;

		case CMD_KICKBAN1H:
			sIRCCMD += " (ban 1 hr.).\r\n";
			sIRCCMD += "ACCESS " + m_sChan + " ADD DENY " + selUserL.ident + " 60 :";
			break;

		case CMD_KICKBAN24H:
			sIRCCMD += " (ban 24 hrs.).\r\n";
			sIRCCMD += "ACCESS " + m_sChan + " ADD DENY " + selUserL.ident + " 1440 :";
			break;
	}

	flashObj.sendToServer(sIRCCMD);
}

function mifBan15m() {

	var selUserL = olvUsers.selectedUser();

	if (selUserL.ident != null) {
		var sIRCCMD = "KICK " + m_sChan + " " + selUserL.nick + "\r\n";
		sIRCCMD += "ACCESS " + m_sChan + " ADD DENY " + selUserL.ident + " 15 :";
	}
	else {
		var sIRCCMD = "USERHOST " + selUserL.nick;
		lstPendingActions.push({ sNick: selUserL.nick, sWaitingOn: "kickban@ident", flag: CMD_KICKBAN15M, text: "", timeout: 5, added: new Date() });
	}

	flashObj.sendToServer(sIRCCMD);

	closeAllMenus();
}

function mifBan1h() {

	var selUserL = olvUsers.selectedUser();

	if (selUserL.ident != null) {
		var sIRCCMD = "KICK " + m_sChan + " " + selUserL.nick + "\r\n";
		sIRCCMD += "ACCESS " + m_sChan + " ADD DENY " + selUserL.ident + " 60 :";
	}
	else {
		var sIRCCMD = "USERHOST " + selUserL.nick;
		lstPendingActions.push({ sNick: selUserL.nick, sWaitingOn: "kickban@ident", flag: CMD_KICKBAN1H, text: "", timeout: 5, added: new Date() });
	}

	flashObj.sendToServer(sIRCCMD);

	closeAllMenus();
}

function mifBan24h() {

	var selUserL = olvUsers.selectedUser();

	if (selUserL.ident != null) {
		var sIRCCMD = "KICK " + m_sChan + " " + selUserL.nick + "\r\n";
		sIRCCMD += "ACCESS " + m_sChan + " ADD DENY " + selUserL.ident + " 1440 :";
	}
	else {
		var sIRCCMD = "USERHOST " + selUserL.nick;
		lstPendingActions.push({ sNick: selUserL.nick, sWaitingOn: "kickban@ident", flag: CMD_KICKBAN24H, text: "", timeout: 5, added: new Date() });
	}

	flashObj.sendToServer(sIRCCMD);

	closeAllMenus();
}

//

function getById(id) {
	return document.getElementById(id);
}

function menuMouseIn(mnu) {
	_mnuitemselected = true;
}

function menuMouseOut(mnu) {
	_mnuitemselected = false;
}

function menuItemMouseIn(mnuitem) {
	if (!_mnukeynavetimeout) return;
	selectMnuItem(mnuitem);
}

function menuItemMouseOut(mnuitem) {
	if (!_mnukeynavetimeout) return;
	unselectMnuItem(mnuitem);
}
function selectMnuItem(mnuitem) {
	if (prevmnuselected != mnuitem) {
		if (prevmnuselected != null) unselectMnuItem(prevmnuselected);
		if (!mnuitem.disabled) {
			mnuitem.className += " menuitemSelected";
			gNewFocus = mnuitem;
			prevmnuselected = mnuitem;
			setTimeout("setFocus();", 0);
		}
	}
}
function unselectMnuItem(mnuitem) {
	_mnuitemselected = false;
	if (!mnuitem.disabled) {
		$('.menuitem').removeClass('menuitemSelected');
	}
}

function fnKeyNavTimeout() {
	_mnukeynavetimeout = true;
}

function mnuOnKeyPress(ev, mnui) {
	if (ev == null) ev = window.event;
	var nmnu = null;

	try {
		// navflag: prev = -1, next = 1, same = 0;
		if (ev.keyCode == KEY_DOWN) {
			//debugOutput('keydown');
			nmnu = getRelativeMenuItem(mnui, 1);
		}
		else if (ev.keyCode == KEY_UP) {
			//debugOutput('keyup');
			nmnu = getRelativeMenuItem(mnui, -1);
		}
		else if (ev.keyCode == KEY_BACKSPACE) {
			ev.returnValue = false;
		}

		if (nmnu) {
			setTimeout("fnKeyNavTimeout();", 10);
			selectMnuItem(nmnu);
		}
	}
	catch (ex) {
		debugOutput(ex, 'mnuOnKeyPress');
	}

	//ev.keyCode = 0;
	ev.cancelBubble = true;
	return false;
}

function getRelativeMenuItem(mnuitem, navflag) {
	var tmnuitem = null;

	switch (navflag) {
		case -1:
			if (mnuitem.className == 'menuitem') {
				if (mnuitem.previousSibling) tmnuitem = mnuitem.previousSibling;

				while (tmnuitem) {
					if (!tmnuitem.disabled && tmnuitem.className == 'menuitem') {
						return tmnuitem;
					}
					tmnuitem = tmnuitem.previousSibling;
				}

				return getLastMenuItem(mnuitem.parentNode);
			}
			else return getLastMenuItem(mnuitem);
		case 1:
			if (mnuitem.className == 'menuitem') {
				if (mnuitem.nextSibling) tmnuitem = mnuitem.nextSibling;

				while (tmnuitem) {
					if (!tmnuitem.disabled && tmnuitem.className == 'menuitem') {
						return tmnuitem;
					}

					tmnuitem = tmnuitem.nextSibling;
				}

				return getFirstMenuItem(mnuitem.parentNode);
			}
			else return getFirstMenuItem(mnuitem);
	}

	return null;
}

function getFirstMenuItem(parentmnu) {
	for (var i = 0; i < parentmnu.childNodes.length; i++) {
		if (!parentmnu.childNodes[i].disabled && parentmnu.childNodes[i].className == 'menuitem') return parentmnu.childNodes[i];
	}

	return null;
}

function getLastMenuItem(parentmnu) {
	for (var i = (parentmnu.childNodes.length - 1); i >= 0; i--) {
		if (!parentmnu.childNodes[i].disabled && parentmnu.childNodes[i].className == 'menuitem') return parentmnu.childNodes[i];
	}

	return null;
}

function IsCPTextSelected() {

	try {
		if (isIE) {
			if (_pcpbody.document.selection.type.toLowerCase() == 'none') return false;
			else return true;
		} //pChatPane.contentDocument
		else if (isFF) {
			if (pChatPane.contentDocument.getSelection().length == 0) return false;
			else return true;
		}
		else if (isWK) {
			if (pChatPane.contentDocument.getSelection().toString().length == 0) return false;
			else return true;
		}
	}
	catch (ex) {
	}

	return false;
}

function getEventObject() {
	//only for IE. IE doesn't pass event.

	if (window.event != null) return window.event;
	else {
		if (isIE) return window.frames['ChatPane'].window.event;
	}
}

function onMouseDown(event) {
	if (_mnuitemselected == true) return;

	closeAllMenus();


}

function showMenu(pmnu, event) {
	var _cmnuSelMe = cmnuSelMe;
	closeAllMenus();
	//debugOutput("_cmnuSelMe: " + _cmnuSelMe, "showMenu");
	if (_cmnuSelMe) cmnuSelMe = _cmnuSelMe;

	var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
	var scrollLeft = document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft;
	var left = event.clientX + scrollLeft;
	var top = event.clientY + scrollTop;
	var menuDimensionx = null;
	var menuDimensiony = null;
	var mousePositionx = null;
	var mousePositiony = null;
	var menuPostionx = null;
	var menuPostiony = null;
	var winwidth = null;
	var winheight = null;
	pmnu.style.display = 'block';
	if (pmnu.id == "cmenuCP") {
		menuPostionx = left;
		menuPostiony = top;
	}
	else {
		var menuDimensionx = pmnu.offsetWidth;
		var menuDimensiony = pmnu.offsetHeight;
		var mousePositionx = event.clientX;
		var mousePositiony = event.clientY;
		var winwidth = $("#whisperwindowadd").width();
		var winheight = $("#whisperwindowadd").height();
		if (mousePositionx + menuDimensionx > $("#whisperwindowadd").width()) {
			var menuPostionx = mousePositionx - menuDimensionx;
		} else {
			var menuPostionx = mousePositionx;
		}
		if (mousePositiony + menuDimensiony > $("#whisperwindowadd").height()) {
			var menuPostiony = mousePositiony - menuDimensiony;
		} else {
			var menuPostiony = mousePositiony;
		}
	}
	if (menuPostiony > 0) { }
	else { menuPostiony = 20; }
	pmnu.style.left = menuPostionx + 'px';
	pmnu.style.top = menuPostiony + 'px';
	//pmnu.style.display = 'block';
	//pmnu.tabIndex = 0;
	gNewFocus = pmnu;
	setTimeout("setFocus();", 0);
}

function closeAllMenus() {
	_mnuitemselected = false;
	//debugOutput("cmnuSelMe: " + cmnuSelMe, "closeAllMenus");
	cmnuSelMe = false;

	if (prevmnuselected != null) {
		unselectMnuItem(prevmnuselected);
		prevmnuselected = null;
	}

	closeMenu(_pmnucp);
	closeMenu(_pmnuhost);
	closeMenu(_pmnuhelpop);
	closeMenu(_pmnuuser);
}

function closeMenu(pmnu) {
	//pmnu.tabIndex = 0;
	if (pmnu) pmnu.style.display = 'none';
}

function fnMnuDisable(disable, pmnu) {
	try {
		if (disable == false) {
			pmnu.disabled = false;
			pmnu.className = 'menuitem';
		}
		else {
			pmnu.disabled = true;
			pmnu.className = 'menuitemDisabled';
		}
	}
	catch (ex) {
		debugOutput(ex, 'fnMnuDisable');
	}
}

//something doesn't seem right this function and unselect for LVI, and move this fn to right place
function SelectLocalUser() {
	if (olvUsers.selectedUser() != null) olvUsers.unselectLVI(olvUsers.selectedLVI());

	plbMe.className = 'lvuitemlbMeSel';
	gNewFocus = plbMe;
	setTimeout("setFocus();", 0);
}

function getMenu(el) {
	//debugger;
	var icount = 0;
	while ((el != null) && (icount < 5)) {
		icount++;
		switch (el.id.substring(0, 3)) {
			case 'txS':
				return 'true';
			// Mike Addon 04/05/16
			case 'cpb':
				if (ouserMe.ilevel >= IsSuperOwner) { $('.superownermenu').show(); }
				else { $('.superownermenu').hide(); }
				return _pmnucp;

			case 'lvi':
				onListUserSelect(_clvicmnu, false);
				if (ouserMe.ilevel >= IsSuperOwner) { $('.superownermenu').show(); }
				else { $('.superownermenu').hide(); }
				return _clvicmnu;
			case 'lbM':
				onListUserSelect(_clvicmnu, true);
				cmnuSelMe = true;
				SelectLocalUser();
				if (ouserMe.ilevel >= IsSuperOwner) { $('.superownermenu').show(); }
				else { $('.superownermenu').hide(); }
				return _clvicmnu;
			default:
				if (el.id.indexOf("mi") == 0) return null;
				//if (el.id.indexOf("lbMe") == 0 //add this one if there are other ids starting with 'lbM';
				//checked there is none starting with 'lbM', but add it in developor notes so nobody adds more
				break;
		}

		el = el.parentNode;
	}

	return null;
}

function onListUserSelect(pmnu, lumnu) {
	var puser = null;

	if (lumnu == false) puser = olvUsers.selectedUser();
	else puser = ouserMe;

	if (puser != null) {
		switch (pmnu.id) {
			case 'mnuUser':
				onMnuUser(lumnu);
				break;

			case 'mnuHelpOp':
				onMnuHelpOp(lumnu);
				break;

			case 'mnuHost':
				onMnuHost(lumnu);
				break;
		}
	}
}

function onMnuUser(lumnu) {
	var puser = null;

	if (lumnu == false) puser = olvUsers.selectedUser();
	else puser = ouserMe;

	if (puser != null) {
		//view profile menuitem
		if (puser.nick.indexOf(">") == 0) fnMnuDisable(true, _pmiVPU);
		else if (puser.nick.charAt(0) == '^') fnMnuDisable(true, _pmiVPU);
		else fnMnuDisable(false, _pmiVPU);

		//whisper menuitem
		if (lumnu == false) {
			if ((Modes[0].indexOf("w") >= 0 || Is_m_Mode == true || Is_x_Mode == true) && (ouserMe.ilevel < IsHelpOp && (ouserMe.voice == false || puser.voice == false) && puser.ilevel < IsHelpOp)) {
				//miWhisper.enabled = false;
				fnMnuDisable(true, _pmiWU);
			}
			else if ((Modes[0].indexOf("W") >= 0) && (ouserMe.nick.charAt(0) == ">" || puser.nick.charAt(0) == ">") && (ouserMe.ilevel < IsHelpOp && puser.ilevel < IsHelpOp)) {
				fnMnuDisable(true, _pmiWU);
			}
			else fnMnuDisable(false, _pmiWU);
		}
		else fnMnuDisable(true, _pmiWU);

		//ignore menuitem
		if (puser.ignore == true) _pmiIU.innerHTML = lang['menuitem_ignore_true'];
		else _pmiIU.innerHTML = lang['menuitem_ignore_false'];

		if ((puser.ilevel > IsSuperOwner || lumnu == true) && (staffIgnore.indexOf(puser.nick) <= -1)) { fnMnuDisable(true, _pmiIU); }
		else { fnMnuDisable(false, _pmiIU); }

		//tag menuitem
		if (puser.tagged == true) _pmiTUU.innerHTML = lang['menuitem_tagged_true'];
		else _pmiTUU.innerHTML = lang['menuitem_tagged_false'];

		//localtime menuitem
		if (ouserMe.voice == false && (Is_m_Mode == true || Is_x_Mode == true)) fnMnuDisable(true, _pmiLTU);
		else fnMnuDisable(false, _pmiLTU);

		//awaymsg menu
		if (puser.away == true) fnMnuDisable(false, _pmiAMU);
		else fnMnuDisable(true, _pmiAMU);
	}
}

function onMnuHelpOp(lumnu) {
	var puser = null;

	if (lumnu == false) puser = olvUsers.selectedUser();
	else puser = ouserMe;

	if (puser != null) {
		//view profile menuitem
		if (puser.nick.indexOf(">") == 0) fnMnuDisable(true, _pmiVPHO);
		else fnMnuDisable(false, _pmiVPHO);

		//whisper menuitem
		if (lumnu == false) {
			if ((Modes[0].indexOf("w") >= 0 || Is_m_Mode == true || Is_x_Mode == true) && (ouserMe.ilevel < IsHelpOp && (ouserMe.voice == false || puser.voice == false) && puser.ilevel < IsHelpOp)) {
				//miWhisper.enabled = false;
				fnMnuDisable(true, _pmiWHO);
			}
			else if ((Modes[0].indexOf("W") >= 0) && (ouserMe.nick.charAt(0) == ">" || puser.nick.charAt(0) == ">") && (ouserMe.ilevel < IsHelpOp && puser.ilevel < IsHelpOp)) {
				fnMnuDisable(true, _pmiWHO);
			}
			else fnMnuDisable(false, _pmiWHO);
		}
		else fnMnuDisable(true, _pmiWHO);

		//ignore menuitem
		if (puser.ignore == true) _pmiIHO.innerHTML = lang['menuitem_ignore_true'];
		else _pmiIHO.innerHTML = lang['menuitem_ignore_false'];

		if (puser.ilevel > IsSuperOwner || lumnu == true) fnMnuDisable(true, _pmiIHO);
		else fnMnuDisable(false, _pmiIHO);

		//tag menuitem
		if (puser.tagged == true) _pmiTUHO.innerHTML = lang['menuitem_tagged_true'];
		else _pmiTUHO.innerHTML = lang['menuitem_tagged_false'];

		//localtime menuitem
		//if (ouserMe.voice == false && (Is_m_Mode == true || Is_x_Mode == true)) fnMnuDisable(true, _pmiLTHO);
		//else fnMnuDisable(false, _pmiLTHO);

		//awaymsg menuitem
		if (puser.away == true) fnMnuDisable(false, _pmiAMHO);
		else fnMnuDisable(true, _pmiAMHO);

		//kick, voice menuitem
		mySLev = getSimpleLevel(ouserMe);
		ouSLev = getSimpleLevel(puser);

		if (mySLev < ouSLev) {
			fnMnuDisable(true, _pmiVHO);
			fnMnuDisable(true, _pmiKHO);
			fnMnuDisable(true, _pmiPHO);
		}
		else {
			fnMnuDisable(false, _pmiVHO);

			if (lumnu == false) fnMnuDisable(false, _pmiKHO);
			else fnMnuDisable(true, _pmiKHO);

			if (puser.ilevel >= IsHelpOp) fnMnuDisable(false, _pmiPHO);
			else fnMnuDisable(true, _pmiPHO);
		}
	}
}

function onMnuHost(lumnu) {
	var puser = null;

	if (lumnu == false) puser = olvUsers.selectedUser();
	else puser = ouserMe;

	if (puser != null) {
		//view profile menuitem
		if (puser.nick.indexOf(">") == 0) fnMnuDisable(true, _pmiVPH);
		else fnMnuDisable(false, _pmiVPH);

		//whisper menuitem
		if (lumnu == false) {
			if ((Modes[0].indexOf("w") >= 0 || Is_m_Mode == true || Is_x_Mode == true) && (ouserMe.ilevel < IsHelpOp && (ouserMe.voice == false || puser.voice == false) && puser.ilevel < IsHelpOp)) {
				fnMnuDisable(false, _pmiWH);
			}
			else if ((Modes[0].indexOf("W") >= 0) && (ouserMe.nick.charAt(0) == ">" || puser.nick.charAt(0) == ">") && (ouserMe.ilevel < IsHelpOp && puser.ilevel < IsHelpOp)) {
				fnMnuDisable(true, _pmiWH);
			}
			else fnMnuDisable(false, _pmiWH);
		}
		else fnMnuDisable(true, _pmiWH);

		//ignore menuitem
		if (puser.ignore == true) _pmiIH.innerHTML = lang['menuitem_ignore_true'];
		else _pmiIH.innerHTML = lang['menuitem_ignore_false'];

		if (puser.ilevel > IsSuperOwner || lumnu == true) fnMnuDisable(true, _pmiIH);
		else fnMnuDisable(false, _pmiIH);

		//tag menuitem
		if (puser.tagged == true) _pmiTUH.innerHTML = lang['menuitem_tagged_true'];
		else _pmiTUH.innerHTML = lang['menuitem_tagged_false'];

		//localtime menuitem
		//if (ouserMe.voice == false && (Is_m_Mode == true || Is_x_Mode == true)) fnMnuDisable(true, _pmiLTH);
		//else fnMnuDisable(false, _pmiLTH);

		//awaymsg menuitem
		if (puser.away == true) fnMnuDisable(false, _pmiAMH);
		else fnMnuDisable(true, _pmiAMH);

		//kick, voice menuitem
		mySLev = getSimpleLevel(ouserMe);
		ouSLev = getSimpleLevel(puser);

		if (mySLev < ouSLev) {
			fnMnuDisable(true, _pmiKH);
			fnMnuDisable(true, _pmiKHM);
			fnMnuDisable(true, _pmiB15mH);
			fnMnuDisable(true, _pmiB1hH);
			fnMnuDisable(true, _pmiB24hH);

			fnMnuDisable(true, _pmiVH);
			fnMnuDisable(true, _pmiPH);
			fnMnuDisable(true, _pmiHOH);
			fnMnuDisable(true, _pmiHH);
			fnMnuDisable(true, _pmiOH);
		}
		else {
			if (lumnu == false) {
				fnMnuDisable(false, _pmiKH);
				fnMnuDisable(false, _pmiKHM);
				fnMnuDisable(false, _pmiB15mH);
				fnMnuDisable(false, _pmiB1hH);
				fnMnuDisable(false, _pmiB24hH);
			}
			else {
				fnMnuDisable(true, _pmiKH);
				fnMnuDisable(true, _pmiKHM);
				fnMnuDisable(true, _pmiB15mH);
				fnMnuDisable(true, _pmiB1hH);
				fnMnuDisable(true, _pmiB24hH);
			}

			fnMnuDisable(false, _pmiVH);

			//user op modes menu items
			if (puser.ilevel >= IsSuperOwner) {
				fnMnuDisable(true, _pmiPH);
				fnMnuDisable(true, _pmiHOH);
				fnMnuDisable(true, _pmiHH);
				fnMnuDisable(true, _pmiOH);
			}
			else {
				fnMnuDisable(false, _pmiHOH);
				fnMnuDisable(false, _pmiHH);

				if (puser.ilevel >= IsHelpOp) fnMnuDisable(false, _pmiPH);
				else fnMnuDisable(true, _pmiPH);

				//owner mode menuitem
				if (ouserMe.ilevel < IsOwner) fnMnuDisable(true, _pmiOH);
				else fnMnuDisable(false, _pmiOH);
			}
		}
	}
}

function getSimpleLevel(puser) {
	var slev = 0;

	if ((puser.ilevel & IsStaff) == IsStaff) slev = 5;
	else if ((puser.ilevel & IsSuperOwner) == IsSuperOwner) slev = 4;
	else if ((puser.ilevel & IsOwner) == IsOwner) slev = 3;
	else if ((puser.ilevel & IsHost) == IsHost) slev = 2;
	else if ((puser.ilevel & IsHelpOp) == IsHelpOp) slev = 1;
	else slev = 0;

	return slev;
}

function updateLVIMenu() {
	if ((ouserMe.ilevel & IsStaff) == IsStaff) _clvicmnu = _pmnuhost;
	else if ((ouserMe.ilevel & IsSuperOwner) == IsSuperOwner) _clvicmnu = _pmnuhost;
	else if ((ouserMe.ilevel & IsOwner) == IsOwner) _clvicmnu = _pmnuhost;
	else if ((ouserMe.ilevel & IsHost) == IsHost) _clvicmnu = _pmnuhost;
	else if ((ouserMe.ilevel & IsHelpOp) == IsHelpOp) _clvicmnu = _pmnuhelpop;
	else _clvicmnu = _pmnuuser;
}

function cmenuShow(event) {
	//return true;

	if (event == null) event = getEventObject();

	if (IsCPTextSelected()) fnMnuDisable(false, _pMnuCopy);
	else fnMnuDisable(true, _pMnuCopy);

	var target = event.target != null ? event.target : event.srcElement;

	var pmnu = getMenu(target);

	if (pmnu != null) {
		if (pmnu == 'true') return true;
		showMenu(pmnu, event);
	}

	return false;
}

function iniContextMenu() {
	_pmnucp = getById('cmenuCP'); _pmnuhost = getById('mnuHost'); _pmnuhelpop = getById('mnuHelpOp'); _pmnuuser = getById('mnuUser');
	_pwndChat = getById('chatwindowholder'); //'chatwindowholder' to make whisper input box context menu work. Update made by Mike/err0r.
	_pcpbody = (isIE) ? ChatPane.document.body : pChatPane.contentDocument.body;
	_pstatusbody = (isIE) ? StatusPane.document.body : pStatusPane.contentDocument.body;
	_ptxsend = document.getElementById("txSend");
	_pMnuCopy = getById('mnuCpCopy');
	_pmiVPU = getById('miVPU'); _pmiWU = getById('miWU'); _pmiIU = getById('miIU'); _pmiTUU = getById('miTUU'); _pmiLTU = getById('miLTU'); _pmiAMU = getById('miAMU');
	_pmiVPHO = getById('miVPHO'); _pmiWHO = getById('miWHO'); _pmiIHO = getById('miIHO'); _pmiTUHO = getById('miTUHO'); _pmiLTHO = getById('miLTHO'); _pmiAMHO = getById('miAMHO'); _pmiVHO = getById('miVHO'); _pmiPHO = getById('miPHO'); _pmiKHO = getById('miKHO');
	_pmiVPH = getById('miVPH'); _pmiWH = getById('miWH'); _pmiIH = getById('miIH'); _pmiTUH = getById('miTUH'); _pmiLTH = getById('miLTH'); _pmiAMH = getById('miAMH'); _pmiKH = getById('miKH'); _pmiKHM = getById('miKHM'); _pmiB15mH = getById('miB15mH'); _pmiB1hH = getById('miB1hH'); _pmiB24hH = getById('miB24hH'); _pmiVH = getById('miVH'); _pmiPH = getById('miPH'); _pmiHOH = getById('miHOH'); _pmiHH = getById('miHH'); _pmiOH = getById('miOH')
	//alert(_pcpbody.id);

	if (_pMnuCopy.disabled == undefined) _pMnuCopy.disabled = false;

	if (_pmiVPU.disabled == undefined) _pmiVPU.disabled = false;
	if (_pmiWU.disabled == undefined) _pmiWU.disabled = false;
	if (_pmiIU.disabled == undefined) _pmiIU.disabled = false;
	//if (_pmiTUU.disabled == undefined) _pmiTUU.disabled = false;
	if (_pmiLTU.disabled == undefined) _pmiLTU.disabled = false;
	if (_pmiAMU.disabled == undefined) _pmiAMU.disabled = false;

	if (_pmiVPHO.disabled == undefined) _pmiVPHO.disabled = false;
	if (_pmiWHO.disabled == undefined) _pmiWHO.disabled = false;
	if (_pmiIHO.disabled == undefined) _pmiIHO.disabled = false;
	//if (_pmiTUHO.disabled == undefined) _pmiTUHO.disabled = false;
	if (_pmiLTHO.disabled == undefined) _pmiLTHO.disabled = false;
	if (_pmiAMHO.disabled == undefined) _pmiAMHO.disabled = false;
	if (_pmiVHO.disabled == undefined) _pmiVHO.disabled = false;
	if (_pmiPHO.disabled == undefined) _pmiPHO.disabled = false;
	if (_pmiKHO.disabled == undefined) _pmiKHO.disabled = false;

	if (_pmiVPH.disabled == undefined) _pmiVPH.disabled = false;
	if (_pmiWH.disabled == undefined) _pmiWH.disabled = false;
	if (_pmiIH.disabled == undefined) _pmiIH.disabled = false;
	//if (_pmiTUH.disabled == undefined) _pmiTUH.disabled = false;
	if (_pmiLTH.disabled == undefined) _pmiLTH.disabled = false;
	if (_pmiAMH.disabled == undefined) _pmiAMH.disabled = false;
	if (_pmiKH.disabled == undefined) _pmiKH.disabled = false;
	if (_pmiKHM.disabled == undefined) _pmiKHM.disabled = false;
	if (_pmiB15mH.disabled == undefined) _pmiB15mH.disabled = false;
	if (_pmiB1hH.disabled == undefined) _pmiB1hH.disabled = false;
	if (_pmiB24hH.disabled == undefined) _pmiB24hH.disabled = false;
	if (_pmiVH.disabled == undefined) _pmiVH.disabled = false;
	if (_pmiPH.disabled == undefined) _pmiPH.disabled = false;
	if (_pmiHOH.disabled == undefined) _pmiHOH.disabled = false;
	if (_pmiHH.disabled == undefined) _pmiHH.disabled = false;
	if (_pmiOH.disabled == undefined) _pmiOH.disabled = false;

	_pwndChat.onmousedown = onMouseDown;
	_pwndChat.oncontextmenu = cmenuShow;
	_pcpbody.onmousedown = onMouseDown;
	_pcpbody.oncontextmenu = cmenuShow;

	//debugOutput("meObj TypeOf: " + typeof(ouserMe), "iniContextMenu");
	updateLVIMenu();
}
//---- </menu>

//---- < UI >
var pBtnWhisp = null, pBtnIgnore = null, pBtnTag = null, pBtnViewProfile = null, pBtnSend = null, pBtnAction = null;

function UpdateBtnImage(pbtn, imgsrc) {
	//alert(imgsrc);
	pbtn.src = imgsrc;
}

function iniUIObjects() {
	pBtnWhisp = getById('btnWhisp');
	pBtnIgnore = getById('btnIgnore');
	pBtnTag = getById('btnTag');
	pBtnViewProfile = getById('btnViewProfile');
	//    pBtnSend = getById('btnWhisp');
	//    pBtnAction = getById('btnWhisp');

	pBtnWhisp.disable = true;
	pBtnIgnore.disable = true;
	pBtnTag.disable = true;
	pBtnViewProfile.disable = true;
}

function UpdateUI(puser) {
	//Update(12-Feb-2014): var for image location. --Duke
	//view profile menuitem
	if (puser.nick.indexOf(">") == 0 || puser.nick.charAt(0) == '^') {
		pBtnViewProfile.disable = true;
		UpdateBtnImage(pBtnViewProfile, imgBtnProfileDisabled);
	}
	else {
		pBtnViewProfile.disable = false;
		UpdateBtnImage(pBtnViewProfile, imgBtnProfileEnabled);
	}

	//whisper button
	if ((Modes[0].indexOf("w") >= 0 || Is_m_Mode == true || Is_x_Mode == true) && (ouserMe.ilevel < IsHelpOp && (ouserMe.voice == false || puser.voice == false) && puser.ilevel < IsHelpOp)) {
		pBtnWhisp.disable = false;
		UpdateBtnImage(pBtnWhisp, imgBtnWhispEnabled);
	}
	else if ((Modes[0].indexOf("W") >= 0) && (ouserMe.nick.charAt(0) == ">" || puser.nick.charAt(0) == ">") && (ouserMe.ilevel < IsHelpOp && puser.ilevel < IsHelpOp)) {
		pBtnWhisp.disable = true;
		UpdateBtnImage(pBtnWhisp, imgBtnWhispDisabled);
	}
	else {
		pBtnWhisp.disable = false;
		UpdateBtnImage(pBtnWhisp, imgBtnWhispEnabled);
	}

	//ignore button
	if (puser.ilevel > IsSuperOwner && staffIgnore.indexOf(puser.nick) <= -1) {
		pBtnIgnore.disable = true;
		UpdateBtnImage(pBtnIgnore, imgBtnIgnoreDisabled);
	}
	else {
		pBtnIgnore.disable = false;
		UpdateBtnImage(pBtnIgnore, imgBtnIgnoreEnabled);
	}

	//tag button
	UpdateBtnImage(pBtnTag, imgBtnTagEnabled);
	pBtnTag.disable = false;
}

function onBtnViewProfile() {
	fnViewProfile();
}

function onBtnWhisp() {
	OpenWhisperTab();
}

function onBtnIgnore() {
	fnIgnore();
}

function onBtnTag() {
	fnTag();
}

function onBtnAction() {
	if (ptxSend.value.length > 0) {
		if (IsSendable()) {
			fnAction(ptxSend.value);
			fnNewInputMessage(ptxSend.value);
			ptxSend.value = ""; idxInputMessages = null;
		}
	}
}

var idxInputMessages = null;
var sTmpInputMsg = '', IsTempMsgActive = false;
function onTxSendKeypress(ev) {
	if (ev == null) ev = window.event;
	var bLoadBlankText = false, bWasNull = false;

	try {
		if (stkInputMessages.length > 0) {
			if (idxInputMessages == null) {
				idxInputMessages = (stkInputMessages.length - 1);
				bWasNull = true;
			}

			if (ev.keyCode == KEY_DOWN) {
				if (idxInputMessages < (stkInputMessages.length - 1)) {
					idxInputMessages++;
				}
				else {
					bLoadBlankText = true;
					idxInputMessages = null;
				}
			}
			else if (ev.keyCode == KEY_UP) {
				if (idxInputMessages > 0 && IsTempMsgActive) idxInputMessages--;
				else {
					if (!bWasNull && idxInputMessages == 0) return false;
				}
				if (idxInputMessages == (stkInputMessages.length - 1) && !IsTempMsgActive) {
					sTmpInputMsg = ptxSend.value;
					IsTempMsgActive = true;
				}
			}
			else return false;

			if (!bLoadBlankText) ptxSend.value = stkInputMessages[idxInputMessages];
			else {
				ptxSend.value = sTmpInputMsg;
				IsTempMsgActive = false;
			}
		}
	}
	catch (ex) {
		debugOutput(ex, 'onTxSendKeypress');
	}

	return false;
}

function showGuestLoginDialog() {


	if (pwndGLD.style.display != 'block') {
		ptxGLN.value = langr.l_enternickname;
		strGuestPass = flashObj.GetGuestuserPass();
		//ppwGuest.value = flashObj.GetGuestuserPass();
		//fnAppendText(ppwGuest.value);
		ptxGLDErrorMessage.value = "";

		var cwidth = 200;
		var cheight = 100;
		var LeftPosition = (screen.width) ? (screen.width - cwidth) / 2 : 0;
		var TopPosition = (screen.height) ? (screen.height - cheight) / 2 : 0;

		pwndGLD.style.left = LeftPosition + 'px';
		pwndGLD.style.top = TopPosition + 'px';
		pwndGLD.style.display = 'block';
	}
}

function onGuestLoginDialogReturn() {
	var sGNick = ptxGLN.value;

	if (sGNick.length > 2) {
		pwndGLD.style.display = 'none';
		if (sGNick[0] != '>') sGNick = '>' + sGNick;
		flashObj.SetGuestInfo(sGNick, strGuestPass);
		IsGuestInfoSet = true;
		fnConnect();
	}
	else {
		ptxGLDErrorMessage.innerHTML = langr.l_nickmorethan2chrs;
	}
}
//---- </ UI >
function WhispViewProfile(user) {
	if (user) {
		if (user.indexOf(">") == 0) { }
		else {
			var cmdGetProfile = "PID " + user;
			flashObj.sendToServer(cmdGetProfile);
		}
	}
}
//---- Misc.
function fnViewProfile() {
	//debugger;
	//debugOutput("cmnuSelMe: " + cmnuSelMe, "fnViewProfile");
	if (cmnuSelMe == false) {
		if (pBtnViewProfile.disable != true) {
			if (olvUsers.selectedUser() == null) return;
			var cmdGetProfile = "PID " + olvUsers.selectedUser().nick;
			flashObj.sendToServer(cmdGetProfile);
		}
	}
	else {
		var cmdGetProfile = "PID " + ouserMe.nick;
		flashObj.sendToServer(cmdGetProfile);
	}
}

var asaIgnoreHashTbl = new Array();

function fnAddIdentToIgnoreHash(ident) {
	asaIgnoreHashTbl[ident] = 1;
}

function fnRemIdentFromIgnoreHash(ident) {
	delete asaIgnoreHashTbl[ident];
}

function fnProcessUserIdentIngnore(plvi) {

	if (asaIgnoreHashTbl[plvi.pUser.ident] == 1) {
		plvi.pUser.ignore = true;
		formatUserLabel(plvi.pUser, plvi.pLabel);
		updateUserIcon(plvi.pUser, plvi.pIco, plvi.pLabel, plvi.pIggy);
	}
}
function fnIgnore() {
	if (pBtnIgnore.disable != true) {
		var plvi = olvUsers.selectedLVI();
		if (plvi == null) return;

		if (plvi.pUser.ignore == false) {
			plvi.pUser.ignore = true;
			fnAddIdentToIgnoreHash(plvi.pUser.ident);
			var ignoretext = langr.l_nowignoring;
		}
		else {
			plvi.pUser.ignore = false;
			fnRemIdentFromIgnoreHash(plvi.pUser.ident);
			var ignoretext = langr.l_nolongerignoring;
		}
		formatUserLabel(plvi.pUser, plvi.pLabel);
		updateUserIcon(plvi.pUser, plvi.pIco, plvi.pLabel, plvi.pIggy);
		fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + ignoretext + plvi.pUser.nick + "</span></span>");
	}
}
// Update 3/26/2017 Mike Manual Ignore User
function fnIgnoreManual(sender) {
	var plvi = olvUsers.getItemByName(sender);
	if (plvi == null) return;
	if (plvi.pUser.ignore == false) {
		plvi.pUser.ignore = true;
		fnAddIdentToIgnoreHash(plvi.pUser.ident);
		var ignoretext = langr.l_nowignoring;
	}
	else {
		plvi.pUser.ignore = false;
		fnRemIdentFromIgnoreHash(plvi.pUser.ident);
		var ignoretext = langr.l_nolongerignoring;
	}
	formatUserLabel(plvi.pUser, plvi.pLabel);
	updateUserIcon(plvi.pUser, plvi.pIco, plvi.pLabel, plvi.pIggy);
	fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + ignoretext + plvi.pUser.nick + "</span></span>");
}
function fnTag() {
	//debugger;
	if (cmnuSelMe == false) {
		var plvi = olvUsers.selectedLVI();
		if (plvi == null) return;

		if (plvi.pUser.tagged == false) {
			plvi.pUser.tagged = true;
			addTag(plvi.pUser.nick);
		}
		else {
			plvi.pUser.tagged = false;
			removeTag(plvi.pUser.nick);
		}

		formatUserLabel(plvi.pUser, plvi.pLabel);
		updateUserIcon(plvi.pUser, plvi.pIco, plvi.pLabel, plvi.pIggy);
	}
	else {
		if (ouserMe.tagged == false) {
			ouserMe.tagged = true;
			addTag(ouserMe.nick);
		}
		else {
			ouserMe.tagged = false;
			removeTag(ouserMe.nick);
		}

		formatUserLabel(ouserMe, plbMe);
		var nothing = '';
		updateUserIcon(ouserMe, puicoMe, plbMe, nothing);
	}
}

var wndChatOptions = null;


function OpenChatOptionsWnd() {
	$('#optionsPane').attr('src', sFUIDIR2 + 'nbchatoptions.htm?v2');
	$('.pwindows').css('z-index', '200');
	$('#optionsContainer').css('z-index', '201');
	$('#optionsContainer').fadeIn();
}
// Mike Addon Modes
function OpenModesOptionsWnd() {
	if (ouserMe.ilevel >= IsSuperOwner) {
		$('#modesPane').attr('src', sFUIDIR2 + 'nbchatmodes.htm');
		$('.pwindows').css('z-index', '200');
		$('#modesContainer').css('z-index', '201');
		$('#modesContainer').fadeIn();
	}
	else {
		fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorslevel + "</span></span>");
	}
	closeAllMenus();
}
// Mike Addon Access
function OpenAccessOptionsWnd() {
	if (ouserMe.ilevel >= IsSuperOwner) {
		$('#accessPane').attr('src', sFUIDIR2 + 'nbchataccess.htm');
		$('.pwindows').css('z-index', '200');
		$('#accessContainer').css('z-index', '201');
		$('#accessContainer').fadeIn();
	}
	else {
		fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorslevel + "</span></span>");
	}
	closeAllMenus();
}
// Mike Addon Room Props Addon
function OpenPropsOptionsWnd() {
	if (ouserMe.ilevel >= IsSuperOwner) {
		$('#propsPane').attr('src', sFUIDIR2 + 'nbchatprops.htm');
		$('.pwindows').css('z-index', '200');
		$('#propsContainer').css('z-index', '201');
		$('#propsContainer').fadeIn();
	}
	else {
		fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorslevel + "</span></span>");
	}
	closeAllMenus();
}
// helper functions
function IsNum(v0) {
	try {
		var v1 = new String(v0);
		var regex = /[^0-9]/;

		return !regex.test(v1);
	}
	catch (ex) {
		debugOutput(ex);
	}
}

//---- Test
function fnStat() {
	alert('loopcount: ' + loopcount);
}

function fnUpdate() {
	try {
		//        var ptxRNum = getById('txRNum');
		//        var ptxNN = getById('txNewNick');

		//        var val = ptxRNum.value;
		//        var val2 = ptxNN.value;
		//        //debugOutput(pWndWhisp.name);
		//        //wndWhisp.pwnd.CrossWindowMessage('my message');

		////        if (IsNum(val)) olvUsers.removeItemById(val);
		////        else olvUsers.removeItemByName(val);

		//    _pcpbody.style.fontSize = val;
		//    alert(_pcpbody.style.fontSize);

		alert(ChatPane.document.body.scrollHeight);
		//        switch (val)
		//        {
		//            case 'large':
		//                //_pcpbody.fontSize = 'large';
		//                break;
		//        }
	}
	catch (ex) {
		debugOutput(ex, 'fnUpdate()');
	}
}
function popupwindow(url, title, w, h) {
	var left = (screen.width / 2) - (w / 2);
	var top = (screen.height / 2) - (h / 2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}
function LoadDummyUsers() {
	try {
		ouserMe = { nick: null, ident: null, host: null, ilevel: IsStaff, iprofile: NoProfile, away: false, awaymsg: "", voice: false };
		onAddUser({ nick: '^Staff', ident: null, host: null, ilevel: IsStaff, iprofile: NoProfile, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'SuperOwner', ident: null, host: null, ilevel: IsSuperOwner, iprofile: NoProfile, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'Owner', ident: null, host: null, ilevel: IsOwner, iprofile: NoProfile, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'Host', ident: null, host: null, ilevel: IsHost, iprofile: NoProfile, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'HelpOp', ident: null, host: null, ilevel: IsHelpOp, iprofile: NoProfile, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'NoProfile', ident: null, host: null, ilevel: 0, iprofile: NoProfile, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'NoGender', ident: null, host: null, ilevel: 0, iprofile: NoGender, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'NoGenderWPic', ident: null, host: null, ilevel: 0, iprofile: NoGenderWPic, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'Female', ident: null, host: null, ilevel: 0, iprofile: Female, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'FemaleWPic', ident: null, host: null, ilevel: 0, iprofile: FemaleWPic, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'Male', ident: null, host: null, ilevel: 0, iprofile: Male, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'MaleWPic', ident: null, host: null, ilevel: 0, iprofile: MaleWPic, away: false, awaymsg: "", voice: false });
		onAddUser({ nick: 'MaleWPica', ident: null, host: null, ilevel: 0, iprofile: MaleWPic, away: true, awaymsg: "", voice: false });
	}
	catch (ex) {
		debugOutput(ex, 'LoadDummyUsers()');
	}
}


var pStatusPane = null;
function getStatusBody() {
	if (isIE) return StatusPane.document.body;
	else return pStatusPane.contentDocument.body;
}
var iLastAutoStatusScrollVal = 0;
var bStatusAutoScroll = true;
var bSkipStatusScrollCall = false;
function autoStatusScroll(stb) {
	if (bStatusAutoScroll) {
		stb.scrollTop = stb.scrollHeight;
		iLastAutoStatusScrollVal = stb.scrollTop;
	}
}
function ScrollFixs() {
	var stb = getStatusBody();
	stb.scrollTop = stb.scrollHeight;
	iLastAutoStatusScrollVal = stb.scrollTop;
	bStatusAutoScroll = true;
}
var sScrollCallEnabled = true;
function UserScrolleds() {
	var stb = getStatusBody();
	var sScrollOffset = 20;

	if ((stb.scrollTop + sScrollOffset) < iLastAutoStatusScrollVal) bStatusAutoScroll = false;
	else bStatusAutoScroll = true;

	sScrollCallEnabled = true;
}
var bSkipStatusScroll = false;
function OnStatusScroll() {
	var stb = getStatusBody();
	if (!bSkipStatusScroll) {
		if (sScrollCallEnabled) {
			bStatusAutoScroll = sScrollCallEnabled = false;
			setTimeout(UserScrolleds, 1000);
		}
	}
	else bSkipStatusScroll = false;
}

function removeFromStatus(wid) {
	var sc = parseInt($('#statuscount').text());
	$("#StatusPane").contents().find("#" + wid).parent().remove();
	var scs = sc - 1;
	$('#statuscount').text(scs);
}

function sendTostatus(sstr) {
	bSkipStatusScroll = true;
	var nd = new Date();
	var ts = "<span class='timestamp'>[" + FormatTimeNums(TwelveHour(nd.getHours())) + ":" + FormatTimeNums(nd.getMinutes()) + "" + amPm(nd.getHours()) + "]</span>&nbsp;";
	sstr = ts + sstr;
	if ($('#statuswindowholder').is(':visible')) { }
	else {
		var sc = parseInt($('#statuscount').text());
		var scs = sc + 1;
		$('#statuscount').text(scs);
	}
	//$("#StatusPane").contents().find("#statusbody").append('<div>' + sstr + '</div>');
	if (isIE) {
		StatusPane.document.body.insertAdjacentHTML('beforeEnd', '<div class="linebreakindenter" style="overflow: hidden; position: relative;">' + sstr + '</div>');
		if (bSkipStatusScrollCall == false) autoStatusScroll(StatusPane.document.body);
	}
	else {
		var oSpan = document.createElement('div');
		oSpan.innerHTML = '<div class="linebreakindenter" style="overflow: hidden; position: relative;">' + sstr + '</div>';
		pStatusPane.contentDocument.body.appendChild(oSpan);
		if (bSkipStatusScrollCall == false) { autoStatusScroll(pStatusPane.contentDocument.body); }
	}



}
function clearStatusPane() {
	pStatusPane.contentDocument.body.innerHTML = '';
	$('#statuscount').text('0');
}
function OpenInNewTab(url) {
	var win = window.open(url, '_blank');
	win.focus();
}
// Whisper Tabs
var WhisperTabs = new Array();
var nMaxWhispTabs = 10;
var bInComingWhispTabsMaxed = false;
// Get Hex ID
function getNewTabId(sNick) {
	//ToDo: optimizations, fix potential glitch
	var tid = '';
	var smatch = false;
	if (WhisperTabs.length == 0) return getHash(sNick + '__' + Math.floor(Math.random() * 1001));
	for (var i = 0; i < WhisperTabs.length; i++) {
		tid = getHash(sNick + '__' + Math.floor(Math.random() * 1001));
		smatch = false;
		for (var j = 0; j < WhisperTabs.length; j++) {
			if (WhisperTabs[j].whsptid == tid) smatch = true;
		}
		if (smatch == false) return tid;
	}
	//glitch, it can return existing whspid in rare cases.
	return tid;
}
// Find Tab
function FindTab(sNick) {
	for (var i = 0; i < WhisperTabs.length; i++) {
		if (WhisperTabs[i].receiver.nick == sNick) return i;
	}
	return -1;
}
function FindTabbyID(tid) {
	for (var i = 0; i < WhisperTabs.length; i++) {
		if (WhisperTabs[i].whsptid == tid) return i;
	}
	return -1;
}
// Whisper Tab Manager
function WhisperTabManager(sNickFrom, sChan, sNickTo, sMessage, type) {
	var ret = FindTab(sNickFrom);
	//ToDo: Open whisper window for staff without max limit.
	if (ret == -1 && WhisperTabs.length <= nMaxWhispTabs) {
		if (type == WHISP_OUT) {
			//create new window
			var tabWhisp = preCreateWhispTab(olvUsers.getItemByName(sNickFrom).pUser, type);
			if (tabWhisp.tabisloaded == false) tabWhisp.tmpmessages += FormatFromByNick(sNickFrom) + ParseTextMessage(sMessage);
			else RenderWhisp2(olvUsers.getItemByName(sNickFrom).pUser, sMessage, tabWhisp.whsptid);
		}
		else {
			var puser = olvUsers.getItemByName(sNickFrom).pUser;
			if (bWhispOff == false || puser.ilevel >= IsStaff) {
				//create new window
				var tabWhisp = preCreateWhispTab(puser, type);
				// Mike Update 3/25/2017 No emoticons in Accept Decline Whisper Update 3/26/2017 Added Ignore User
				str123 = "<div class='whispreq' id='" + tabWhisp.whsptid + "'><div id='abc123' style='color: #8b0000'><span class='cpnickuser'>" + getUserLabel(sNickFrom) + "</span> " + langr.l_whisperacceptdecline_a + " (<a href='javascript:;' onclick='subacceptWhispertab(\"" + tabWhisp.whsptid + "\", this);'>" + langr.l_whisperacceptdecline_b + "</a> | <a href='javascript:;' onclick='subdeclineWhispertab(\"" + tabWhisp.whsptid + "\", this);'>" + langr.l_whisperacceptdecline_c + "</a> | <a href='javascript:;' onclick='subdeclineandIgnoreWhispertab(\"" + tabWhisp.whsptid + "/" + sNickFrom + "\", this);'>" + langr.l_whisperacceptdecline_e + "</a>).</div><div><span style='color: #8b0000'>" + langr.l_whisperacceptdecline_d + "</span> " + ParseTextMessage2(sMessage) + "</div></div>";
				var nd = new Date();
				var tnd = "<span class='timestamp'>[" + FormatTimeNums(TwelveHour(nd.getHours())) + ":" + FormatTimeNums(nd.getMinutes()) + "" + amPm(nd.getHours()) + "]</span>&nbsp;";
				sendTostatus("<span id='" + tabWhisp.whsptid + "' class='status-whisper'>" + langr.l_whisperattempt_a + " <b>" + getUserLabel(sNickFrom) + "</b>. " + langr.l_whisperattempt_b + " " + ParseTextMessage2(sMessage) + "</span>");
				fnAppendText(str123);
				tabWhisp.inmsgs = sMessage;
				tabWhisp.inmsgscount = 0;
				tabWhisp.inmsgscount++;
				flashObj.sendToServerQue("DATA " + m_sChan + " " + sNickFrom + " CMWHISP :WHISPACCEPTNEEDED");
			}
			else {
				flashObj.sendToServerQue("DATA " + m_sChan + " " + sNickFrom + " CMWHISP :WHISPOFF");
			}
		}
		if ($('#chatwindowholder').is(':visible')) { }
		else {
			clearInterval(chatflash);
			chatflash = setInterval(function () { $("#chattab").toggleClass("blinktab"); }, 600);
		}
		if (bSndWhisp != false && bWhispOff == false) flashObj.playWhispSnd();
	}
	else {
		if (ret >= 0) {
			//render message to the window
			if (WhisperTabs[ret].isloaded == true) {
				if (WhisperTabs[ret].tabisloaded == false) {
					var puser = olvUsers.getItemByName(sNickFrom).pUser;
					if (puser.ilevel >= IsHelpOp) { WhisperTabs[ret].tmpmessages += '<img unselectable="on" src="' + fnGetIco(puser) + '" border="0" class="lvuitemico" />' + FormatFromByNick(sNickFrom) + ParseTextMessage(sMessage); }
					else { WhisperTabs[ret].tmpmessages += '<span class="cpblankicospace"></span>' + FormatFromByUser(puser) + ParseTextMessage(str); }
				}
				else { RenderWhisp2tab(WhisperTabs[ret].receiver, sMessage, WhisperTabs[ret].whsptid); }
			}
			else {
				//render message to the main window
				// Mike Update 3/25/2017 Turned off whisper to main window without accept or decline
				//fnAppendText("<font face='Tahoma' color='#660099'><b>" + getUserLabel(sNickFrom) + " " + langr.l_whispered + "</b></font>" + ParseTextMessage(sMessage));
			}
		}
	}
}
function OpenWhisperTab() {
	if (pBtnWhisp.disable != true) {
		preCreateWhispTab(olvUsers.selectedUser(), WHISP_OUT);
	}
}
// Create Tab
function preCreateWhispTab(puserTo, type) {
	if (WhisperTabs.length < nMaxWhispTabs) {
		var i = FindTab(puserTo.nick);
		if (i < 0) {
			var tabWhisp = new Object();
			tabWhisp.receiver = puserTo;
			tabWhisp.isloaded = false;
			tabWhisp.tabisloaded = false;
			tabWhisp.scrolled = false;
			tabWhisp.type = type;
			tabWhisp.whsptid = getNewTabId(puserTo.nick);
			WhisperTabs.push(tabWhisp);
			if (type == WHISP_OUT) {
				createWhispTab(tabWhisp, type);
			}
			return tabWhisp;
		}
		else {
			createWhispTab(WhisperTabs[i], type);
			flashObj.sendToServerQue("DATA " + m_sChan + " " + WhisperWindows[i].receiver.nick + " CMWHISP :WHISPACCEPTED");
			//var pnode = getByIdFromCP(WhisperTabs[i].whsptid);
			//if (pnode != null) {
			//    remWhispRequest(pnode);
			//}
		}
	}
	else {
		// Update Mike 3/26/2017 error flood protection
		if (!waiterror) {
			fnAppendText("<font face='Tahoma' color='#FF3300'>" + langr.l_whispermax + "</font>");
			waiterror = true;
			setTimeout(function () {
				waiterror = false;
			}, 3000);
		}

		bInComingWhispTabsMaxed = true;
	}
}
// Create Whisper Tab
function createWhispTab(tabWhisp, type) {
	try {
		if (WhispTabIsLoaded(tabWhisp) == 1) return tabWhisp;
		var bTabWhispCreateError = false;
		DebugWhisp('CreatingWhisperWindow', '');
		DebugWhisp('CreatingWhisperWindowInstance', '');
		try {
			tabWhisp.pwnd = "whispertab_" + tabWhisp.whsptid;
			$('#statusholder').append("<div id='whispertab_" + tabWhisp.whsptid + "' class='activewtab'><span id='whispernick_" + tabWhisp.whsptid + "'>" + tabWhisp.receiver.nick + "</span><span class='tabx'><a id='whisperclose_" + tabWhisp.whsptid + "' href='#'><img src='" + sFUIDIR + "/images/xclose.gif' alt='' /></a></span></div><span id='whisperspace_" + tabWhisp.whsptid + "'>&nbsp;</span>");
			$('#whisperwindowadd').append("<div style='display:none;' class='whisperwindowholder' id='whisperwindowholder_" + tabWhisp.whsptid + "'><a title='minimize' class='whisperminibtn' id='whispermini_" + tabWhisp.whsptid + "' href='#'><img src='" + sFUIDIR + "/images/minimize.gif' alt='' /></a><a title='close' class='whisperboxclose' id='whispercloseb_" + tabWhisp.whsptid + "' href='#'><img src='" + sFUIDIR + "/images/xclose.gif' alt='' /></a><div class='whisperareawho'><span id='whisperdrag_" + tabWhisp.whsptid + "'><img style='margin-top:-3px;margin-bottom:-3px;' src='" + sFUIDIR + "/images/dragable.gif' alt='' /></span> Whispering: <span>" + tabWhisp.receiver.nick + "</span></div><div class='whisperarea' id='" + tabWhisp.whsptid + "'><iframe class='WhisperPane' id='WhisperPane_" + tabWhisp.whsptid + "' name='WhisperPane' frameborder='0' scrolling='yes' src='" + sFUIDIR + "/nbchatwhisperpane.htm?wnick=" + tabWhisp.whsptid + "' ></iframe></div><div class='whispersendIntputDivb'><input class='whispersendinput' id='whisperSend_" + tabWhisp.whsptid + "' type='text' value='' /></div><div class='sendbuttonsb'><a title='send whisper' id='whisperSendbutton_" + tabWhisp.whsptid + "'><img src='" + sFUIDIR + "/images/button_send_normal.png' /></a></div></div>");
			tabWhisp.tabisloaded = true;
			if (tabWhisp.pwnd) DebugWhisp('WhisperWindowInstanceCreationSuccessful', '');
			else bTabWhispCreateError = true;
			whisperzindex++;
			whisperoffset = whisperoffset + 20;
			var whisperoffsetcss = whisperoffset + "px";
			$("#whisperwindowholder_" + tabWhisp.whsptid).css({ 'position': 'absolute', 'top': whisperoffsetcss, 'left': '30%', 'z-index': whisperzindex });
			$("#whisperwindowholder_" + tabWhisp.whsptid).fadeIn();
			$("#whisperwindowholder_" + tabWhisp.whsptid).draggable({
				containment: '#whisperwindowadd',
				cursor: 'move',
				drag: function () {
					zWhispWin('on');
				},
				stop: function () {
					zWhispWin('off');
				}
			});
			$("#whisperwindowholder_" + tabWhisp.whsptid).resizable({
				containment: '#whisperwindowadd',
				resize: function () {
					zWhispWin('on');
				},
				stop: function () {
					zWhispWin('off');
				}
			});

		}
		catch (ex) {
			bTabWhispCreateError = true;
		}
		if (bTabWhispCreateError == true) {
			DebugWhisp('WhisperWindowInstanceCreationFailed', '');
			fnAppendText("<span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorwhisper + "</span></span>");
			return null;
		}
		DebugWhisp('Setting WhisperWindow Variables', '');
		if (tabWhisp.type == WHISP_IN) {
			tabWhisp.tmpmessages = tabWhisp.inmsgs;
		}
		tabWhisp.isloaded = true;
		tabWhisp.tabisloaded = false;
		return tabWhisp;
	}
	catch (ex) {
		debugOutput(ex, 'createWhispWindow');
	}
}

function zWhispWin(op) {
	if (op == 'on') { $("#whisperwindowadd").css('z-index', '100'); }
	else { $("#whisperwindowadd").css('z-index', ''); }
}
function acceptWhispertab(whsptid, sender) {
	for (var i = 0; i < WhisperTabs.length; i++) {
		if (WhisperTabs[i].whsptid == whsptid) {
			createWhispTab(WhisperTabs[i], null);
			//WHISPACCEPTED
			flashObj.sendToServerQue("DATA " + m_sChan + " " + WhisperTabs[i].receiver.nick + " CMWHISP :WHISPACCEPTED");
			removeFromStatus(whsptid);
			sender.parentNode.parentNode.parentNode.parentNode.removeChild(sender.parentNode.parentNode.parentNode);
		}
	}
}
function declineWhispertab(whsptid, sender) {
	for (var i = 0; i < WhisperTabs.length; i++) {
		if (WhisperTabs[i].whsptid == whsptid) {
			//WHISPDECLINED
			flashObj.sendToServerQue("DATA " + m_sChan + " " + WhisperTabs[i].receiver.nick + " CMWHISP :WHISPDECLINED");
			RemoveWhisperTab(i);
			removeFromStatus(whsptid);
			sender.parentNode.parentNode.parentNode.parentNode.removeChild(sender.parentNode.parentNode.parentNode);
		}
	}
}
function declineandIgnoreWhispertab(whsptid, sender) {
	for (var i = 0; i < WhisperTabs.length; i++) {
		if (WhisperTabs[i].whsptid == whsptid) {
			//WHISPDECLINED
			flashObj.sendToServerQue("DATA " + m_sChan + " " + WhisperTabs[i].receiver.nick + " CMWHISP :WHISPDECLINED");
			RemoveWhisperTab(i);
			removeFromStatus(whsptid);
			sender.parentNode.parentNode.parentNode.parentNode.removeChild(sender.parentNode.parentNode.parentNode);
		}
	}
}
function RemoveWhisperTab(idx) {
	if (idx >= 0 && WhisperTabs[idx]) {
		if (WhisperTabs[idx].isloaded == true) {

		}
		WhisperTabs.splice(idx, 1);
	}
}


function WhispTabIsLoaded(tabWhisp) {
	try {
		if (typeof (tabWhisp.pwnd) != 'undefined' && tabWhisp.pwnd != null && tabWhisp.isloaded == true) {
			if (tabWhisp.pwnd.closed == true) return 0;
			return 1;
		}
	}
	catch (ex) {
		debugOutput(ex, 'WhispWndIsLoaded');
	}
	return -1;
}
function RenderWhisper2tabalt(puser, str) {
	var ret = FindTab(puser);
	if (ret >= 0) {

		var wts = '';
		if (bTimeStampOn == true) {
			var dtTms = new Date();
			// Update by Mike for timestamp added 21-Nov-2014
			var tms = "<span class='timestamp'>[" + FormatTimeNums(TwelveHour(dtTms.getHours())) + ":" + FormatTimeNums(dtTms.getMinutes()) + "" + amPm(dtTms.getHours()) + "]</span>&nbsp;&nbsp;";
			wts = tms;
		}
		$("#WhisperPane_" + WhisperTabs[ret].whsptid).contents().find("#whisperbody").append("<div>" + wts + str + "</div>");
		$("#WhisperPane_" + WhisperTabs[ret].whsptid)[0].contentWindow.updateScroll();
	}
}
function RenderWhisp2tab(puser, str, tid) {
	var wts = '';
	if (bTimeStampOn == true) {
		var dtTms = new Date();
		// Update by Mike for timestamp added 21-Nov-2014
		var tms = "<span class='timestamp'>[" + FormatTimeNums(TwelveHour(dtTms.getHours())) + ":" + FormatTimeNums(dtTms.getMinutes()) + "" + amPm(dtTms.getHours()) + "]</span>&nbsp;";
		wts = tms;
	}
	if (puser.ilevel >= IsHelpOp) {
		$("#WhisperPane_" + tid).contents().find("#whisperbody").append("<div>" + wts + "<img unselectable='on' src='" + fnGetIco(puser) + "' border='0' class='lvuitemico' />" + FormatFromByUser(puser) + ParseTextMessage(str) + "</div>");
	}
	else {
		$("#WhisperPane_" + tid).contents().find("#whisperbody").append("<div>" + wts + "<span class='cpblankicospace'></span>" + FormatFromByUser(puser) + ParseTextMessage(str) + "</div>");
	}
	$("#WhisperPane_" + tid)[0].contentWindow.updateScroll();
	checkFlashtab(WhisperTabs[idf].whsptid);
}
function closeWhispTab(WhispTabNick) {
	var idx = FindTab(WhispTabNick);
	RemoveWhisperTab(idx);
	if (idx >= 0) {
		var userLeft = false;
		try {
			if (typeof (WhisperTabs[i].userLeft) != "undefined") {
				if (WhisperTabs[i].userLeft == true) userLeft = true;
			}
		}
		catch (ex) {
		}
		//WHISPWNDCLOSED
		if (userLeft != true) flashObj.sendToServerQue("DATA " + m_sChan + " " + WhispTabNick + " CMWHISP :WHISPWNDCLOSED");
	}
}
function RemoveWhisperTab(idx) {
	if (idx >= 0 && WhisperTabs[idx]) {
		if (WhisperTabs[idx].isloaded == true) {
			var deltab = WhisperTabs[idx].whsptid;
			$('#whispertab_' + deltab).remove();
			$('#whisperwindowholder_' + deltab).remove();
			$('#whisperspace_' + deltab).remove();
			whisperoffset = whisperoffset - 20;
		}
		WhisperTabs.splice(idx, 1);
	}
}

function TabWhisperSendMessage(str, tid) {
	if (str.charAt(0) != '/') {
		var whispertabnick = $('#whispernick_' + tid).text();
		var wts = '';
		if (bTimeStampOn == true) {
			var dtTms = new Date();
			var tms = "<span class='timestamp'>[" + FormatTimeNums(TwelveHour(dtTms.getHours())) + ":" + FormatTimeNums(dtTms.getMinutes()) + "" + amPm(dtTms.getHours()) + "]</span>&nbsp;";
			wts = tms;
		}
		if (ouserMe.ilevel >= IsHelpOp) { $("#WhisperPane_" + tid).contents().find("#whisperbody").append("<div>" + wts + "<img unselectable='on' src='" + fnGetIco(ouserMe) + "' border='0' class='lvuitemico' />" + GetFormattedNickMe() + " : " + ParseTextMessage(FormatSendTextMessage(str)) + "</div>"); }
		else { $("#WhisperPane_" + tid).contents().find("#whisperbody").append("<div>" + wts + "<span class='cpblankicospace'></span>" + GetFormattedNickMe() + " : " + ParseTextMessage(FormatSendTextMessage(str)) + "</div>"); }
		flashObj.sendToServer("WHISPER " + m_sChan + " " + whispertabnick + " :" + FormatSendTextMessage(str));
		$("#WhisperPane_" + tid)[0].contentWindow.updateScroll();
		return true;
	}
	else {
		if (fnWhispWndCommands(str.substring(1), tid) == true) return true;
		$("#WhisperPane_" + tid).contents().find("#whisperbody").append("<div><span class='msgfrmtparent'><span class='errortype1'>" + langr.l_errorwhisperinvalidcommand + "</span></span></div>");
		$("#WhisperPane_" + tid)[0].contentWindow.updateScroll();
		return false;
	}
	return false;
}
function fnWhispWndCommands(sCmd, tid) {
	switch (sCmd.split(" ", 1)[0].toUpperCase()) {
		case "?":
			$("#WhisperPane_" + tid).contents().find("#whisperbody").append("<div><span class='msgfrmtparent'><span class='msgfrmt2'>" + langr.l_errorwhispercommandlines + " " + sanitizeHtml("Not Available") + ".</span></span></div>");
			$("#WhisperPane_" + tid)[0].contentWindow.updateScroll();
			return true;
	}
	return false;
}
function EndTabs(sNick) {
	var ret = FindTab(sNick);
	if (ret >= 0) {
		var str = "<span class='whisper-hasleft'>" + getUserLabel(sNick) + " " + langr.l_userhasleft + ".</span>";
		if (WhisperTabs[ret].isloaded == true) {
			RenderWhisper2tabalt(sNick, str);
			WhisperTabs[ret].userLeft = true;
		}
		else {
			RemoveWhisperTab(ret);
		}
	}
}
function iframeLoaded(tid) {
	idf = FindTabbyID(tid);
	WhisperTabs[idf].tabisloaded = true;
	if (pageFontsize != '') {
		$("#WhisperPane_" + WhisperTabs[idf].whsptid).contents().find("#whisperbody").css("font-size", pageFontsize);
	}
	setFontswhisper();

	if (WhisperTabs[idf].tmpmessages) {
		RenderWhisp2tab(WhisperTabs[idf].receiver, WhisperTabs[idf].tmpmessages, WhisperTabs[idf].whsptid);
	}
}
function FindBlink(tid) {
	for (var i = 0; i < BlinkTabs.length; i++) {
		if (BlinkTabs[i].tid == tid) return i;
	}
	return -1;
}
var BlinkTabs = new Array();
var waitwhispersound = false;
function checkFlashtab(tid) {
	if (!waitwhispersound) {
		if (bSndWhisp != false && bWhispOff == false) { flashObj.playWhispSnd(); }
		waitwhispersound = true;
		setTimeout(function () {
			waitwhispersound = false;
		}, 1000);
	}
	if ($('#whisperSend_' + tid).is(':focus')) { }
	else {
		var bi = FindBlink(tid);
		if (bi >= 0) { }
		else {
			var tabBlink = new Object();
			tabBlink.tid = tid;
			tabBlink.si = setInterval(function () {
				$("#whispertab_" + tid).toggleClass("blinkwtab");
				$("#whisperwindowholder_" + tid).toggleClass("blinkborder");
			}, 600);
			BlinkTabs.push(tabBlink);
		}
	}
}
function closeAllWhispTabs() {
	for (var i = 0; i < WhisperTabs.length; i++) RemoveWhisperTab(i);
}
function whispTabClosed(nick) {
	var i = FindTab(nick);
	if (i >= 0) {
		var str = '';
		if (WhisperTabs[i].isloaded == true) {
			str = "<div style='display:inline' class='whispreq'><span class='cpnickuser'>" + getUserLabel(nick) + "</span> " + langr.l_whisperclose + "</div>";
			RenderWhisper2tabalt(nick, str);
		}
	}
}
function setFontswhisper() {
	if (sendFontfamily != null) { $('.whispersendinput').css('font-family', sendFontfamily); }
	else { $('.whispersendinput').css('font-family', 'Tahoma'); }
	if (sendFontcolor != null) { $('.whispersendinput').css('color', sendFontcolor); }
	else { $('.whispersendinput').css('color', '#000000'); }
	if (sendFontweight != null) { $('.whispersendinput').css('font-weight', sendFontweight); }
	else { $('.whispersendinput').css('font-weight', 'normal'); }
	if (sendFontstyle != null) { $('.whispersendinput').css('font-style', sendFontstyle); }
	else { $('.whispersendinput').css('font-style', 'normal'); }
}
function setFontsizewhisper(fsize) {
	for (var i = 0; i < WhisperTabs.length; i++) {
		$("#WhisperPane_" + WhisperTabs[i].whsptid).contents().find("#whisperbody").css("font-size", fsize);
	}
}
function selectNickInNicklist(nicktosel) {
	var gnickline = '';
	var gnickline = olvUsers.getItemByName(nicktosel);
	if (gnickline != '') {
		$('.lvuitemlb').removeClass('lvuitemlbSelected');
		$('.lvuitemlb:eq(' + gnickline.id + ')').addClass("lvuitemlbSelected");
	}
}
$(document).ready(function () {


	$('#viewemotes').on("click", function () {
		$("#emotesContainer").toggle("clip");
		return false;
	});

	$('#closeawaymsg').on("click", function () {
		$('#wndSetAwayMsgContainer').hide('fast');
		return false;
	});
	$('#saveawaymsg').on("click", function () {
		$('#wndSetAwayMsgContainer').fadeOut();
		sAwayMsg = $('#txAwayMsg').val();
		flashObj.SaveSingleOption('awaymsg', sAwayMsg);
		return false;
	});
	$('#openawaymsg').on("click", function () {
		$('#txAwayMsg').val(sAwayMsg);
		$('#wndSetAwayMsgContainer').show('fast');
		return false;
	});
	$('#statustab').on("click", function () {
		$('.activewtab').switchClass("activewtab", "inactivewtab");
		$('.activetab').switchClass("activetab", "inactivetab");
		$('#statustab').switchClass("inactivetab", "activetab");
		$('#statuscount').text('0');
		$('#statuswindowholder').show('fast');
		$('#chatwindowholder').hide('fast');
		$('[id^="whisperwindowholder_"]').hide('fast');
		ScrollFixs();
		return false;
	});
	$('#chattab').on("click", function () {
		clearInterval(chatflash);
		$('.activewtab').switchClass("activewtab", "inactivewtab");
		$('.activetab').switchClass("activetab", "inactivetab");
		$('#chattab').switchClass("blinktab", "inactivetab");
		$('#chattab').switchClass("inactivetab", "activetab");
		$('#chatwindowholder').show('fast');
		$('#statuswindowholder').hide('fast');
		$('[id^="whisperwindowholder_"]').hide('fast');
		ScrollFix();
		return false;
	});
	$('#clearstatusbtn').on("click", function () {
		clearStatusPane();
		return false;
	});
	$('#btn_sendmsg').on("click", function () {
		fnCPAppendText();
		return false;
	});
	$('#btn_sendaction').on("click", function () {
		onBtnAction();
		return false;
	});
	$('#btn_whisperuser').on("click", function () {
		onBtnWhisp();
		return false;
	});
	$('#btn_ignoreuser').on("click", function () {
		onBtnIgnore();
		return false;
	});
	$('#btn_taguser').on("click", function () {
		onBtnTag();
		return false;
	});
	$('#btn_viewprofile').on("click", function () {
		onBtnViewProfile();
		return false;
	});
	$(document).on('click', '[id^="whispertab_"]', function (event) {
		var getid = $(this).attr("id").split("_");
		var tid = getid[1];
		var bi = FindBlink(tid);
		if (bi >= 0) { clearInterval(BlinkTabs[bi].si); BlinkTabs.splice(bi, 1); }
		$('#whispertab_' + tid).switchClass("inactivewtab", "activewtab");
		whisperzindex++;
		$('#whisperwindowholder_' + tid).css('z-index', whisperzindex);
		$('#whisperwindowholder_' + tid).show('fast');
		return false;
	});
	$(document).on('focus', '[id^="whisperSend_"]', function (event) {
		var getid = $(this).attr("id").split("_");
		var tid = getid[1];
		var bi = FindBlink(tid);
		if (bi >= 0) { clearInterval(BlinkTabs[bi].si); BlinkTabs.splice(bi, 1); }
		$('#whispertab_' + tid).switchClass("blinkwtab", "activewtab");
		$('#whisperwindowholder_' + tid).switchClass("blinkborder", "whisperwindowholder");
		return false;
	});

	$(document).on('click', '[id^="whispermini_"]', function (event) {
		var getid = $(this).attr("id").split("_");
		var tid = getid[1];
		$('#whisperwindowholder_' + tid).hide();
		$('#whispertab_' + tid).switchClass("activewtab", "inactivewtab");

		return false;
	});
	$(document).on('click', '[id^="whisperwindowholder_"]', function (event) {
		var getid = $(this).attr("id").split("_");
		var tid = getid[1];
		whisperzindex++;
		$('#whisperwindowholder_' + tid).css('z-index', whisperzindex);
	});
	$(document).on('click', '[id^="whisperclose_"]', function (event) {
		var getid = $(this).attr("id").split("_");
		var tid = getid[1];
		var bi = FindBlink(tid);
		if (bi >= 0) { clearInterval(BlinkTabs[bi].si); BlinkTabs.splice(bi, 1); }
		var wnick = $('#whispernick_' + tid).text();
		closeWhispTab(wnick);
		ScrollFix();
		return false;
	});
	$(document).on('click', '[id^="whispercloseb_"]', function (event) {
		var getid = $(this).attr("id").split("_");
		var tid = getid[1];
		var bi = FindBlink(tid);
		if (bi >= 0) { clearInterval(BlinkTabs[bi].si); BlinkTabs.splice(bi, 1); }
		var wnick = $('#whispernick_' + tid).text();
		closeWhispTab(wnick);
		ScrollFix();
		return false;
	});
	$(document).on('keypress', '[id^="whisperSend_"]', function (event) {
		var getid = $(this).attr("id").split("_");
		var tid = getid[1];
		if (event.which == 13) {
			var wchr = $(this).val().length;
			if (wchr > 0) {
				TabWhisperSendMessage($(this).val(), tid);
				$(this).val('');
			}
			return false;
		}
	});
	$(document).on('click', '[id^="whisperSendbutton_"]', function () {
		var getid = $(this).attr("id").split("_");
		var tid = getid[1];
		var wchr = $('#whisperSend_' + tid).val().length;
		if (wchr > 0) {
			TabWhisperSendMessage($('#whisperSend_' + tid).val(), tid);
			$('#whisperSend_' + tid).val('');
		}
		return false;
	});
	$("#optionsContainer").draggable({
		containment: '#whisperwindowadd',
		cursor: 'move',
		handle: '#optionsheader',
		drag: function () {
			zWhispWin('on');
		},
		stop: function () {
			zWhispWin('off');
		}
	});
	$("#modesContainer").draggable({
		containment: '#whisperwindowadd',
		cursor: 'move',
		handle: '#modesheader',
		drag: function () {
			zWhispWin('on');
		},
		stop: function () {
			zWhispWin('off');
		}
	});
	$("#accessContainer").draggable({
		containment: '#whisperwindowadd',
		cursor: 'move',
		handle: '#accessheader',
		drag: function () {
			zWhispWin('on');
		},
		stop: function () {
			zWhispWin('off');
		}
	});
	$("#propsContainer").draggable({
		containment: '#whisperwindowadd',
		cursor: 'move',
		handle: '#propsheader',
		drag: function () {
			zWhispWin('on');
		},
		stop: function () {
			zWhispWin('off');
		}
	});
	$('.topMenuAction').on("click", function () {
		if ($("#openCloseIdentifier").is(":hidden")) {
			$("#slider").animate({
				marginTop: "-341px"
			}, 600);
			$("#openCloseIdentifier").show();
		} else {
			$("#slider").animate({
				marginTop: "0px"
			}, 600);
			$("#openCloseIdentifier").hide();
			var emotstatus = $('#wndFEmotsstatus').text();
			if (emotstatus == '0') {
				$('#wndFEmots').attr('src', emotsWndURI);
				$('#wndFEmotsstatus').text('1');
			}
		}
		return false;
	});

});
function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}

function mifPassport() {
	if (cmnuSelMe == false) { var selUserL = olvUsers.selectedUser(); }
	else { var selUserL = ouserMe; }
	if (selUserL.ident != null) {
		setTimeout(fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + selUserL.nick + "'s Passport: " + selUserL.ident + "</span></span>"), 1000);
	}
	else {
		var sIRCCMD = "USERHOST " + selUserL.nick;
		flashObj.sendToServer(sIRCCMD);
		setTimeout(function () {
			fnAppendText("<span class='msgfrmtparent'><span class='msgfrmt4'>" + selUserL.nick + "'s Passport: " + selUserL.ident + "</span></span>")
		}, 1000);
	}
	closeAllMenus();
}
function mifAddAccess(atype) {
	if (cmnuSelMe == false) { var selUserL = olvUsers.selectedUser(); }
	else { var selUserL = ouserMe; }
	if (selUserL.ident != null) {
		flashObj.sendToServer("ACCESS " + m_sChan + " ADD " + atype + " " + selUserL.ident + " 0 :Webchat Access for" + selUserL.nick);
	}
	else {
		var sIRCCMD = "USERHOST " + selUserL.nick;
		flashObj.sendToServer(sIRCCMD);
		setTimeout(function () {
			flashObj.sendToServer("ACCESS " + m_sChan + " ADD " + atype + " " + selUserL.ident + " 0 :Webchat Access for " + selUserL.nick);
		}, 1000);
	}
	closeAllMenus();
}


//alert(JSON.stringify(WhisperTabs))
