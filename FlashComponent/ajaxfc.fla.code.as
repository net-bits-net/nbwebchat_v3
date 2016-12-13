//Note: This is code from ajaxfc.fla put in this file to make it easier to read on git directly.
//Updated: 14-Dec-2016

import flash.external.ExternalInterface;
import NBClasses.chatsocket;

//Security.allowDomain("*");
//System.security.loadPolicyFile("irc.ircwx.com:843");

var XmlNullChar:String = '$1a2XMLNULL2a1$';

_global.IsStaff = 128;
_global.IsSuperOwner = 64; _global.IsOwner = 32;
_global.IsHost = 16; _global.IsHelpOp = 8;

_global.NoProfile = 0; _global.NoGender = 1; _global.NoGenderWPic = 2;
_global.Female = 3; _global.FemaleWPic = 4;
_global.Male = 5; _global.MaleWPic = 6;

var uMe:Object = {nick:null, ident:null, host:null, ilevel:0, iprofile:0, away:false, awaymsg:"", voice:false};
ExternalInterface.call("onIniLocalUser", uMe);

var bInitialPropChange:Boolean = true;
var bNewNamesList:Boolean = true;
var loadingCallID:Number = 0;
var bReadyForLaoadingCall:Boolean = false, bLoadingCallMade:Boolean = false;

var bInviteFlood:Boolean = false;

var SendQue:Array = new Array();
var SendTimerId:Number = 0;

var ConCheckTimerId:Number = 0, bpPingPending:Boolean = false;
var _fnReconnectIntervelId:Number = 0;

var CSocket:chatsocket = new chatsocket();

var sndInvt:Sound = new Sound();
var sndJoin:Sound = new Sound();
var sndKick:Sound = new Sound();
var sndTag:Sound = new Sound();
var sndWhsp:Sound = new Sound();
sndInvt.attachSound("ChatInvt.wav");
sndJoin.attachSound("ChatJoin.wav");
sndKick.attachSound("ChatKick.wav");
sndTag.attachSound("ChatTag.wav");
sndWhsp.attachSound("ChatWhsp.wav");

var oEventSndOptions:Object = {bArrival:true, bKick:true, bTagged:true, bInvite:true, bWhisp:true};

var aaTagged:Array = new Array();

//<User List>

function addTag(nick)
{
	aaTagged[nick] = true;
}
ExternalInterface.addCallback("addTag", this, addTag);

function removeTag(nick)
{
	if (aaTagged[nick]) delete aaTagged[nick];
}
ExternalInterface.addCallback("removeTag", this, removeTag);

function AddUser(user)
{
	ExternalInterface.call("onAddUser", user);
}

//
function ClearUserList()
{
	bNewNamesList = true;
	ExternalInterface.call("onClearUserList");
	/*
	txtUserCount.text = 0;
	MUserList.removeAll();
	*/
}
//</User List>

//<Connection>

var arHosts:Array;

function RandomAssaignHost()
{
	CSocket.Host = arHosts[Math.floor((Math.random()*arHosts.length))];
}

function setupConnection(sUserName, sPass, sPassType)
{
	/*
	fvServer = "localhost"; //irc.flashirc.info localhost
	fvPort = 6667;
	fvRoom = "%#Dubai\\bChat";
	*/
	
	arHosts = fvServer.split(",");
	
	//System.security.allowDomain(fvServer);
	//if (fvSiteURL.length > 0) System.security.loadPolicyFile(fvSiteURL + '/crossdomain.xml');
	
    //CSocket.Host = fvServer;
	RandomAssaignHost();
    CSocket.Port = fvPort;
    CSocket.Channel = EncodeRoomName(fvRoom);
    CSocket.UserName = sUserName;
    CSocket.UserPass = sPassType;
    CSocket.AuthPass = sPass;
	CSocket.ClearReconnectTimer = PClearReconnectTimer;
	CSocket.SetReconnectTimer = PSetReconnectTimer;

    CSocket.CSocketConnect();
}

function Reconnect()
{
	PClearReconnectTimer();
	ClearUserList();
	RandomAssaignHost();
	CSocket.CSocketReconnect();
}

function ManualLogin()
{
    if (_global.gsUserName.length > 1)
    {
        setupConnection(_global.gsUserName, _global.gsUserPass, "N");
    } 
} 

function AutoLogin()
{
	fvTicket = escape(fvTicket);
	
	if (fvAuthMode == "tk2") setupConnection(">Guest", fvTicket, "T2");
	else setupConnection(">Guest", fvTicket, "T");
}

function PClearReconnectTimer()
{
	clearInterval(_fnReconnectIntervelId);
	_fnReconnectIntervelId = 0;
}
function PSetReconnectTimer()
{
	if (_fnReconnectIntervelId == 0) 
	{
		_fnReconnectIntervelId = setInterval(Reconnect, 8192);
		AppendText("<font color='#0000CC'>Trying to reconnect in few seconds...</font>");
	}
}
ExternalInterface.addCallback("PSetReconnectTimer", this, PSetReconnectTimer);

function fnCheckCon()
{
	CSocket.iIdleCount++;
	
	if (CSocket.iIdleCount >= 3 && CSocket.iIdleCount < 14)
	{
		if (CSocket.IsKicked == true)
		{
			clearInterval(ConCheckTimerId);
			return;
		}
		
		if ( CSocket.iIdleCount % 3 == 0 ) CSocket.IRCSend("PING :0001");
	}
	else if (CSocket.iIdleCount >= 14)
	{
		AppendText("<font color='#FF0000'>Client Debug Alert: I'm closing connection. Reason: Ping timeout.</font>");
		CSocket.iIdleCount = 0;
		PSetReconnectTimer();
	}
}
ConCheckTimerId = setInterval(fnCheckCon, 55000);

function SetGuestInfo(sNick:String, sPass:String):Void
{
	_global.gsUserName = sNick;
	_global.gsUserPass = sPass;
	
	clearInterval(loadingCallID);
}
ExternalInterface.addCallback("SetGuestInfo", this, SetGuestInfo);

function fnConnect()
{
	if (fvTicket.length > 0 && fvRoom.length > 0)
	{
		AutoLogin();
	}
	else
	{
		ManualLogin();
	}
	
	clearInterval(loadingCallID);
}
ExternalInterface.addCallback("sckConnect", this, fnConnect); 

function sckDisconnect()
{
	CSocket.close();
}
ExternalInterface.addCallback("sckDisconnect", this, sckDisconnect); 

//</Socket Object Events>

function IsChanProps()
{
	if (fvCat.length > 0) return true;
	if (fvTopic.length > 0) return true;
	if (fvWel.length > 0) return true;
	if (fvLang.length > 0) return true;
	if (fvLang2.length > 0) return true;
	
	return false;
}

function SetChanProps()
{
	if (IsChanProps() == true && bInitialPropChange == true)
	{
		if (fvCat.length > 0) SendQue.push("PROP " + CSocket.Channel + " UNLOCK :CATEGORY");
		if (fvTopic.length > 0) SendQue.push("PROP " + CSocket.Channel + " UNLOCK :TOPIC");
		if (fvWel.length > 0) SendQue.push("PROP " + CSocket.Channel + " UNLOCK :ONJOIN");
		if (fvLang.length > 0) SendQue.push("PROP " + CSocket.Channel + " UNLOCK :LANGUAGE");
		if (fvLang2.length > 0) SendQue.push("PROP " + CSocket.Channel + " UNLOCK :LANGUAGE2");
		
		setSendQueTimer();
	}
	else bInitialPropChange = false;
}


//
CSocket.onWrite = function (str)
{
	AppendText(str);
}

CSocket.onProp = function (sNickFrom, sChan, sType, sMessage)
{
	if (sNickFrom == uMe.nick && sType.toUpperCase() == "LOCKED" && bInitialPropChange == true)
	{
		var ircstr:String = "";
		
		if (fvCat.length > 0) SendQue.push("PROP " + CSocket.Channel + " CATEGORY :"+ fvCat);
		if (fvTopic.length > 0) SendQue.push("PROP " + CSocket.Channel + " TOPIC :"+ fvTopic);
		if (fvWel.length > 0) SendQue.push("PROP " + CSocket.Channel + " ONJOIN :"+ fvWel);
		if (fvLang.length > 0) SendQue.push("PROP " + CSocket.Channel + " LANGUAGE :"+ fvLang);
		if (fvLang2.length > 0) SendQue.push("PROP " + CSocket.Channel + " LANGUAGE2 :"+ fvLang2);
		
		setSendQueTimer();
		bInitialPropChange = false;
		//ToDo: add timer to lock again these props
	}
	else
	{
		if (sMessage == null) sMessage = '';
		ExternalInterface.call("onProp", sNickFrom, sChan, sType, sMessage);
	}
}

CSocket.onJoin = function (ujoined, chan)
{
	if (ujoined.nick != CSocket.UserName)
	{
		ExternalInterface.call("onJoin", ujoined, chan);
		
		if (oEventSndOptions.bArrival != false) sndJoin.start();
	}
	else
	{
		iniLUser(ujoined, chan);
	}
}

function iniLUser(user, chan)
{
	//ToDo: needs optimization and normalization
	uMe = user;
	CSocket.Channel = chan;
	ExternalInterface.call("onJoinMe", uMe, CSocket.Channel);
	CSocket.IRCSend("MODE " + CSocket.Channel); 
}

CSocket.onQuit = function (sNick)
{
	if (sNick != uMe.nick)
	{
		ExternalInterface.call("onRemoveUserByNick", sNick);
		if (oEventSndOptions.bTagged != false) if (aaTagged[sNick] == true) sndTag.start();
	}
	else
		ClearUserList();
		//add reconnect flag to avoid conflict
	
}

CSocket.onPart = function (sNick, sChan)
{
	if (sNick != uMe.nick)
	{
		ExternalInterface.call("onRemoveUserByNick", sNick);
		if (oEventSndOptions.bTagged != false) if (aaTagged[sNick] == true) sndTag.start();
	}
	else
		ClearUserList();
}

CSocket.onNotice = function (sNickFrom, sChan, sMessage)
{	
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onNotice", sNickFrom, sChan, sMessage);
	if (oEventSndOptions.bTagged != false) if (aaTagged[sNickFrom] == true) sndTag.start();
}

CSocket.onNoticePrivate = function (sNickFrom, sChan, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onNoticePrivate", sNickFrom, sChan, sMessage);
	if (oEventSndOptions.bTagged != false) if (aaTagged[sNickFrom] == true) sndTag.start();
}

CSocket.onNoticeChanBroadcast = function (sNickFrom, sChan, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onNoticeChanBroadcast", sNickFrom, sChan, sMessage);
}

CSocket.onNoticeServerBroadcast = function (sNickFrom, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onNoticeServerBroadcast", sNickFrom, sMessage);
}

CSocket.onNoticeServerMessage = function (sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onNoticeServerMessage", sMessage);
}

CSocket.onKick = function (sNickFrom, sChan, sNickTo, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onKick", sNickFrom, sChan, sNickTo, sMessage);
}

function playKickSnd()
{
	sndKick.start();
}
ExternalInterface.addCallback("playKickSnd", this, playKickSnd);

function playTagSnd()
{
	sndTag.start();
}
ExternalInterface.addCallback("playTagSnd", this, playTagSnd);

function playWhispSnd()
{
	sndWhsp.start();
}
ExternalInterface.addCallback("playWhispSnd", this, playWhispSnd);

CSocket.onPrivmsg = function (sNickFrom, sChan, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onPrivmsg", sNickFrom, sChan, sMessage);
	if (oEventSndOptions.bTagged != false) if (aaTagged[sNickFrom] == true) sndTag.start();
}

CSocket.on332 = function (sChan, sTopic)
{
	ExternalInterface.call("on332", sChan, sTopic);
}

CSocket.onChanPrivmsg = function (sChanFrom, sChan, sMessage)
{
	//this is welcome message (onjoin message)
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onChanPrivmsg", sChanFrom, sChan, sMessage);
}

CSocket.onPrivmsgPr = function (sNickFrom, sChan, sNickTo, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	
	ExternalInterface.call("onPrivmsgPr", sNickFrom, sChan, sNickTo, sMessage);
}

CSocket.onWhisper = function (sNickFrom, sChan, sNickTo, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	
	ExternalInterface.call("onWhisper", sNickFrom, sChan, sNickTo, sMessage);
}

CSocket.on301 = function (sNickFrom, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("on301", sNickFrom, sMessage);
	//if (oEventSndOptions.bTagged != false) if (aaTagged[sNickFrom] == true) sndTag.start();
}

CSocket.on302 = function (sNickFrom, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("on302", sNickFrom, sMessage);
	//if (oEventSndOptions.bTagged != false) if (aaTagged[sNickFrom] == true) sndTag.start();
}

CSocket.on822Chan = function (sNickFrom, sChan, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("on822Chan", sNickFrom, sChan, sMessage);
}

CSocket.on822Pr = function (sNickFrom, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("on822Pr", sNickFrom, sMessage);
}

CSocket.on821Chan = function (sNickFrom, sChan, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("on821Chan", sNickFrom, sChan, sMessage);
}

CSocket.on821Pr = function (sNickFrom, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("on821Pr", sNickFrom, sMessage);
}

CSocket.onEndofNamesList = function ()
{
	bNewNamesList = true;
}
							  
CSocket.onNameslist = function (aNames:Array)
{
	if (bNewNamesList)
	{
		bNewNamesList = false;
		ExternalInterface.call("onClearUserList");
	}
	
	for (var i:Number = 0; i<aNames.length; i++)
	{
		if (CSocket.UserName == aNames[i].nick)
		{
			uMe = aNames[i];
			if ((uMe.ilevel & _global.IsSuperOwner) == _global.IsSuperOwner) SetChanProps();
			ExternalInterface.call("onNameslistMe", uMe, CSocket.Channel);
			continue;
		}
		AddUser(aNames[i]);
	}
	
	ExternalInterface.call("UpdateUserCount");
}

CSocket.onSetNick = function (sIniNick:String)
{
	uMe.nick = sIniNick;
	ExternalInterface.call("onSetNick", uMe.nick);
}

CSocket.onNick = function (sOldNick, sNewNick)
{
	if (sOldNick != uMe.nick)
	{
		ExternalInterface.call("onNick", sOldNick, sNewNick);
	}
	else
	{
		CSocket.UserName = uMe.nick = sNewNick;
		ExternalInterface.call("onNickMe", uMe.nick);
	}
}

CSocket.onChanMode = function (sSender, sModes, sChan)
{
	ExternalInterface.call("onChanMode", sSender, sModes, sChan);
}

CSocket.on324 = function (sChan, sNModes, s_l_Mode, s_k_Mode)
{
	//AppendText("sNModes.3: " + sNModes);
	if (sNModes.length == 0) sNModes = XmlNullChar;
	ExternalInterface.call("on324", sChan, sNModes, s_l_Mode, s_k_Mode);
}

CSocket.onAccessNRelatedReplies = function (numeric, srv_message)
{
	ExternalInterface.call("onAccessNRelatedReplies", numeric, srv_message);
}

CSocket.onPropReplies = function(numeric, sChan, srv_message) {
	if (sChan.length == 0) sChan = XmlNullChar;
	ExternalInterface.call("onPropReplies", numeric, sChan, srv_message);
}

CSocket.onChanModeWParams = function (sSender, modeoplist, sChan)
{
	ExternalInterface.call("onChanModeWParams", sSender, modeoplist, sChan);
}

CSocket.onUserMode = function (sSender, modeoplist, sChan)
{
	ExternalInterface.call("onUserMode", sSender, modeoplist, sChan);
}

CSocket.onKnock = function (sFrom, sChan, sMessage)
{
	ExternalInterface.call("onKnock", sFrom, sChan, sMessage);
}

CSocket.onInvite = function (sNickFrom, sNickTo, sChanFor)
{
	ExternalInterface.call("onInvite", sNickFrom, sNickTo, sChanFor);
	if (oEventSndOptions.bInvite == true && bInviteFlood == false) sndInvt.start();
}

function InviteFlood(bFlooding)
{
	bInviteFlood = bFlooding;
}
ExternalInterface.addCallback("InviteFlood", this, InviteFlood);

CSocket.onDataIRC = function (sNickBy, sType, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onDataIRC", sNickBy, sType, sMessage);
}

CSocket.onDataIRC2 = function (sNickFrom, sChan, sNickTo, sTag, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onDataIRC2", sNickFrom, sChan, sNickTo, sTag, sMessage);
}

CSocket.onErrorReplies = function (nErrorNum, sNickTo, sTarget, sMessage)
{
	if (sMessage.length == 0) sMessage = XmlNullChar;
	ExternalInterface.call("onErrorReplies", nErrorNum, sNickTo, sTarget, sMessage);
}
//</Socket Object Events>

// <Utility Functions>
function GetMyDateTime():String
{
	var mydt = new Date();
	return mydt.toString();
}
ExternalInterface.addCallback("GetMyDateTime", this, GetMyDateTime);

function GenRandomPass():String
{
	var strPass:String = '';
	
	for (var i:Number = 0; i <= 16; i++)
	{
		strPass += String.fromCharCode(Math.floor(Math.random() * 100) + 33);
	}
	
	return strPass;
}

function GetGuestuserPass()
{
	//var strGuestPass:String = XmlNullChar;
	var so:SharedObject = SharedObject.getLocal("GuestuserPass");
	
	if (so.data.strGuestPass == undefined)
	{
		so.data.strGuestPass = GenRandomPass();
		so.flush();
	}
	
	return so.data.strGuestPass;
}
ExternalInterface.addCallback("GetGuestuserPass", this, GetGuestuserPass);

function SaveGuestuserPass(str:String):Void
{
	var so:SharedObject = SharedObject.getLocal("GuestuserPass");
	so.data.strGuestPass = str;
	so.flush();
}
ExternalInterface.addCallback("SaveGuestuserPass", this, SaveGuestuserPass);

function LoadChatOptions()
{
	var pCOPtions = new Object();
	
	var so:SharedObject = SharedObject.getLocal("soDspFormt");
	
	pCOPtions.sDspFrmt = so.data.sDspFrmt;
	pCOPtions.fontSize = so.data.fontSize;
	pCOPtions.corpText = so.data.corpText;
	pCOPtions.sAwayMsg = so.data.sAwayMsg;
	
	if (so.data.oEventShowNotifys != undefined) pCOPtions.oEventShowNotifys = so.data.oEventShowNotifys;

	if (so.data.oEventSndOptions != undefined) 
	{
		oEventSndOptions = so.data.oEventSndOptions;
		pCOPtions.sndArrival = oEventSndOptions.bArrival;
		pCOPtions.sndKick = oEventSndOptions.bKick;
		pCOPtions.sndTagged = oEventSndOptions.bTagged;
		pCOPtions.sndInvite = oEventSndOptions.bInvite;
		pCOPtions.sndWhisp = oEventSndOptions.bWhisp;
	}
	
	if (pCOPtions.fontSize == undefined) pCOPtions.fontSize = null;
	if (pCOPtions.corpText == undefined) pCOPtions.corpText = true;
	if (pCOPtions.sAwayMsg == undefined) pCOPtions.sAwayMsg = XmlNullChar;
	
	if (so.data.bEmotsOff != undefined) pCOPtions.bEmotsOff = so.data.bEmotsOff;
	if (so.data.bTextFrmtOff != undefined) pCOPtions.bTextFrmtOff = so.data.bTextFrmtOff;
	
	pCOPtions.bWhispOff = (so.data.bWhispOff != undefined) ? so.data.bWhispOff : false ;
	pCOPtions.bTimeStampOn = (so.data.bTimeStampOn != undefined) ? so.data.bTimeStampOn : false ;
	
	return pCOPtions;
}
ExternalInterface.addCallback("LoadChatOptions", this, LoadChatOptions);

function SaveChatOptions(pCOPtions)
{
	//Display Format
	var so:SharedObject = SharedObject.getLocal("soDspFormt");
	

	so.data.sDspFrmt = pCOPtions.sDspFrmt;
	so.data.fontSize = pCOPtions.fontSize;
	so.data.corpText = pCOPtions.corpText;
	so.data.sAwayMsg = pCOPtions.sAwayMsg;
	
	if (pCOPtions.bEmotsOff != undefined) so.data.bEmotsOff = pCOPtions.bEmotsOff;
	if (pCOPtions.bTextFrmtOff != undefined) so.data.bTextFrmtOff = pCOPtions.bTextFrmtOff;
	
	if (pCOPtions.bWhispOff != undefined) so.data.bWhispOff = pCOPtions.bWhispOff;
	if (pCOPtions.bTimeStampOn != undefined) so.data.bTimeStampOn = pCOPtions.bTimeStampOn;
	
	so.data.oEventShowNotifys = pCOPtions.oEventShowNotifys;
	
	oEventSndOptions.bArrival = pCOPtions.sndArrival;
	oEventSndOptions.bKick = pCOPtions.sndKick;
	oEventSndOptions.bTagged = pCOPtions.sndTagged;
	oEventSndOptions.bInvite = pCOPtions.sndInvite;
	oEventSndOptions.bWhisp = pCOPtions.sndWhisp;
	
	so.data.oEventSndOptions = oEventSndOptions;
	
	so.flush();
}
ExternalInterface.addCallback("SaveChatOptions", this, SaveChatOptions);

function SetExtraOptions(pExOptions) {
	var soex:SharedObject = SharedObject.getLocal("soExtraOptions");
	
	soex.data.ExOptions = pExOptions;
	
	soex.flush();
}
ExternalInterface.addCallback("SetExtraOptions", this, SetExtraOptions);

function GetExtraOptions() {
	var pExOptions = new Object();
	
	var soex:SharedObject = SharedObject.getLocal("soExtraOptions");
	
	pExOptions = soex.data.ExOptions;
	
	return pExOptions;
}
ExternalInterface.addCallback("GetExtraOptions", this, GetExtraOptions);

function GetEventSndOptionsObj()
{
	return oEventSndOptions;
}
ExternalInterface.addCallback("GetEventSndOptionsObj", this, GetEventSndOptionsObj);

function SaveSingleOption(optionName, optionVal)
{
	var so:SharedObject = SharedObject.getLocal("soDspFormt");
	
	switch(optionName)
	{
		case "awaymsg":
			so.data.sAwayMsg = (optionVal == 'null') ? null : optionVal;
			break;
	}

	so.flush();
}
ExternalInterface.addCallback("SaveSingleOption", this, SaveSingleOption);

function AppendText(str:String):Void
{
	ExternalInterface.call("fnAppendText", str);
}

function setSendQueTimer()
{
	if (SendTimerId == 0) SendTimerId = setInterval(ExeSendQue, 1200);
}
function ExeSendQue()
{
	var iCount:Number = 0;
	
	while (SendQue.length > 0 && iCount < 5)
	{
		CSocket.IRCSend(SendQue[SendQue.length - 1]);
		SendQue.pop();
		iCount++;
	}
	
	if (SendQue.length == 0)
	{
		clearInterval(SendTimerId);
		SendTimerId = 0;
	}
}

function ReplaceGuestSignInNick(nick)
{
	return (nick.charAt(0) == ">") ? "Guest_" + nick.substr(1) : nick;
}

function EncodeRoomName(str:String):String
{
	return str.split(" ").join("\\b");
}

function DecodeRoomName(str):String
{
	var sChan:String = str.slice(2);
	return sChan.split("\\b").join(" ");
}

function sendToServer(str:String):Void
{
	if (CSocket.IsConnected) CSocket.IRCSend(str);
}
ExternalInterface.addCallback("sendToServer", this, sendToServer);

function sendToServerQue(str:String):Void
{
	if (CSocket.IsConnected) 
	{
		//CSocket.IRCSend(sCmd);
		//irc ctcp flood protection
		SendQue.push(str);
		setSendQueTimer();
	}
}
ExternalInterface.addCallback("sendToServerQue", this, sendToServerQue);

function callOnLoad():Void 
{
	//belongs to connection section, but call it at the end.
	ExternalInterface.call("onFlashSocketLoad");
}

function setLoadingCallTimer()
{
	bLoadingCallMade = true;
	if (bReadyForLaoadingCall) loadingCallID = setInterval(callOnLoad, 2500);
}
ExternalInterface.addCallback("setLoadingCallTimer", this, setLoadingCallTimer);
bReadyForLaoadingCall = true;
if (bLoadingCallMade) setLoadingCallTimer();

function copyToClipboard(str)
{
	System.setClipboard(str);
}
ExternalInterface.addCallback("copyToClipboard", this, copyToClipboard);

function DebugPrint()
{
	CSocket.DebugArrayPrint();
}
ExternalInterface.addCallback("DebugPrint", this, DebugPrint);

// </Utility Functions>

//******************************************

//ManualLogin();

//

function testCom(str)
{
	txTest.text = str;
}
//ExternalInterface.addCallback("testCom", this, testCom);

//******************************************