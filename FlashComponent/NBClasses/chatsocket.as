/* $File: chatsocket.as $
 * $Author: Nucleus $
 * $Date: 1/2/2006 17:06:28 $
 * $Revision: 1.0.0.3 $
 *
 * Copyright (C) 2006  Net-Bits.Net
 *
 * Contact: nucleusae@gmail.com
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307  USA.
 */
 
class NBClasses.chatsocket extends XMLSocket {
	var _sStartChannel, _sHost, _nPort, _sUsername, _sUserPass, _sAuthPass, sStartChannel;
	var _sServer, iIdleCount;
	
	var onWrite:Function, onJoin:Function, onQuit:Function, onPart:Function,
		onPrivmsg:Function, onPrivmsgPr:Function, onChanPrivmsg:Function, onNameslist:Function, onEndofNamesList:Function, onUserMode:Function,
		onChanMode:Function, onChanModeWParams:Function, on324:Function, onNick:Function, onWhisper:Function,
		on821Chan:Function, on822Chan:Function, on821Pr:Function, on822Pr:Function, on332:Function, onAccessNRelatedReplies:Function, onPropReplies:Function;
	var onNoticeChanBroadcast:Function, onNoticePrivate:Function, onNotice:Function,
		onNoticeServerMessage:Function, onNoticeServerBroadcast:Function, onKick:Function, on341:Function,
		onInvite:Function, onKnock:Function, onDataIRC:Function, onDataIRC2:Function, on301:Function, on302:Function, onSetNick:Function,
		onProp:Function, onErrorReplies:Function;
		
	var DebugArray:Array = new Array();
	
	//
	var ClearReconnectTimer:Function, SetReconnectTimer:Function;
	
	//Privates
	private var _bIsConnected:Boolean, _bConnectionRegistered:Boolean = false, _bIsKicked:Boolean = false;
	private var m_serverName:String;
	private var _IsAuthRequestSent:Boolean = false;
	
	function chatsocket()
	{
		iIdleCount = 0
	}
	
	//** Properties Begin
	function set IsConnected(bStatus:Boolean)
	{
		_bIsConnected = bStatus;
	}
	function get IsConnected()
	{
		return _bIsConnected;
	}
	
	function get IsKicked()
	{
		return _bIsKicked;
	}
	
	function set Channel(sChannel:String) 
	{
		this._sStartChannel = sChannel;
	}
	function get Channel():String
	{
		return this._sStartChannel;
	}
	// End property
	
	function set Host(sHost:String)
	{
		this._sHost = sHost;
	}
	function get Host():String
	{
		return this._sHost;
	}
	// End property
	
	function set Port(nPort:Number) 
	{
		this._nPort = nPort;
	}
	function get Port():Number 
	{
		return this._nPort;
	}
	// End property
	
	function set UserName(sUsername:String)
	{
		this._sUsername = sUsername;
	}
	function get UserName():String 
	{
		return this._sUsername;
	}
	// End property
	
	function set UserPass(sUserPass:String) 
	{
		this._sUserPass = sUserPass;
	}
	function get UserPass():String
	{
		return this._sUserPass;
	}
	// End property
	
	function set AuthPass(sAuthPass:String) 
	{
		this._sAuthPass = sAuthPass;
	}
	function get AuthPass():String
	{
		return this._sAuthPass;
	}
	// End property
	
	function set ServerName(sSrvName:String)
	{
		m_serverName = sSrvName;
	}
	function get ServerName():String
	{
		return m_serverName;
	}
	
	//** Properties End
	
	//** Socket Events Begin
	function onConnect(success)
	{
		if (success) 
		{
			Write("<font color='#006600'>Connected!</font>");
			this.IsConnected = true;
			
			//NICK >Guest
			//USER anon \"anon.com\" \"0.0.0.0\" :anon
			if (_global.gsLoginType == "auto") this.UserName + random(20000);
			else 
			{
				if (this.UserName.substr(0, 1) != ">") this.UserName = ">" + this.UserName;
			}
			onSetNick(this.UserName);
			IRCSend("ISFLASHSOCKET\r\nAUTHTYPE ircwx1\r\nCLIENTMODE CD1"); //ToDo: change it to IRCWX2
			IRCSend("NICK " + this.UserName);
			IRCSend("USER anon \"anon.com\" \"0.0.0.0\" :anon");
		}
		else 
		{
			Write("<font color='#FF0000'>Couldn't connect.</font>");
			SetReconnectTimer();
		}
		// end if
	}
	
	function onData(raw) 
	{
		//Write("raw@onData: " + raw); //Note: flash socket is not getting messages ending with /, perhaps use binary sockets.
		
		if (raw.length > 0) 
		{
			iIdleCount = 0;
			
			var sIrcArray = raw.split("\r\n");
			
			for (var i=0; i<sIrcArray.length; i++)
			{
				this.parseString(sIrcArray[i]);
			}
		}
		// End if
	}
	
	function onClose()
	{
		Write("<font color='#FF0000'>Connection closed by the server.</font>");
		_bConnectionRegistered = false;
		this.IsConnected = false;
		if (!_bIsKicked) SetReconnectTimer();
	}
	//** End of Socket Event
	
	function CSocketConnectCallback()
	{
		CSocketConnect(undefined, undefined);
	}
	
	function CSocketConnect(sHost, nPort) 
	{
		ClearReconnectTimer();
		
		if (sHost != undefined && nPort != undefined) 
		{
			this.connect(sHost, nPort);
			this.Host = sHost;
			this.Port = nPort;
		}
		else 
		{
			this.connect(this.Host, this.Port);
		}
		// end if
		
		_bConnectionRegistered = false;
		Write("<font color='#0000CC'>Connecting to " + this.Host + ":" + this.Port + "</font>");
	}
	
	function CSocketReconnect()
	{
		if (this.IsConnected == true) 
		{
			close();
			_bConnectionRegistered = false;
			this.IsConnected = false;
		}
		CSocketConnect();
	}
	// End of the function
	
	function AddtoDebugArray(str:String)
	{
		DebugArray.push(str);
		
		if (DebugArray.length > 50) DebugArray.splice(0, 1);
	}
	
	function DebugArrayPrint()
	{
		for (var i=0; i<DebugArray.length; i++) Write(DebugArray[i]);
	}
	
	function parseString(raw) 
	{
		
		if (raw.length > 0)
		{
			var toks = [];
			var ircmsg = (raw.charAt(0) == ":")?raw.substr(1):raw;
			
			//trace incoming
			//Write("received: " + ircmsg);
			AddtoDebugArray("<<:" + ircmsg);
			
			toks = ircmsg.split(" ");
			
			//if (toks.length > 4) Write("toks[4](u): " + toks[4]);
			
			switch (toks[0].toLowerCase()) 
			{
			case "error" :
				handleError(toks.join(" "));
				return;
				
			case "ping" :
				PingReply(toks.slice(1));
				return;
			}
			// End of switch
			
			switch (toks[1].toLowerCase()) 
			{
			case "001" : //Welcome to the Internet Relay Network
				ServerName = toks[0];
				this.UserName = toks[2];
				onSetNick(this.UserName);
				_bConnectionRegistered = true;
				GotoRoom();
				break;
			
			case "251" :
				onNoticeServerMessage(toks.slice(3).join(" ").substr(1));
				break;
				
			case "265" :
				onNoticeServerMessage(toks.slice(3).join(" ").substr(1));
				break;
				
			case "join" :
				parseJoin(toks[0], toks[2], toks[3]);
				break;
				
			case "quit" :
				onQuit(getNick(toks[0]));
				break;
				
			case "part" :
				onPart(getNick(toks[0]), toks[2]);
				break;
				
			case "notice" :
				if (toks[0] == ServerName)
				{
					//Server Message
					if (!_bIsKicked)
					{
						if (toks[2] == "WARNING" && raw.indexOf("join a chatroom") > 0) GotoRoom();
					}
					
					onNoticeServerMessage(toks.slice(2).join(" "));
				}
				else if (toks[3].indexOf("%") == 0)
				{
					//channel broadcast
					onNoticeChanBroadcast(getNick(toks[0]), toks[3], strip(toks.slice(4).join(" ")));
				}
				else if (toks[2].indexOf("%") < 0)
				{
					//server broadcast
					if (_bConnectionRegistered == true) onNoticeServerBroadcast(getNick(toks[0]), strip(toks.slice(3).join(" ")));
					else onNoticeServerMessage(toks.slice(2).join(" "));
				}
				else if (toks[4].indexOf(":") == 0)
				{
					//private notice
					onNoticePrivate(getNick(toks[0]), toks[2], strip(toks.slice(4).join(" ")));
				}
				else
				{
					//normal notice
					onNotice(getNick(toks[0]), toks[2], strip(toks.slice(3).join(" ")));
				}
				break;
			
			case "kick" :
				if (toks[3].toLowerCase() == this.UserName.toLowerCase()) _bIsKicked = true; //use same case because server is case-insensitve for nicks.
				//Write("MeKicked: KickedNick: " + toks[3] + "; clientNick: " + this.UserName + "; KickedFlag: " + _bIsKicked);
				onKick(getNick(toks[0]), toks[2], toks[3], strip(toks.slice(4).join(" ")));
				break;
				
			case "privmsg" :
				if (toks[0].charAt(0) == "%") onChanPrivmsg(toks[0], toks[2], strip(toks.slice(3).join(" ")));
				else if (toks[3].charAt(0) == ":") onPrivmsg(getNick(toks[0]), toks[2], toks.slice(3).join(" ").substr(1));
				else onPrivmsgPr(getNick(toks[0]), toks[2], toks[3], toks.slice(4).join(" ").substr(1));
				break;
				
			case "whisper" :
			//Format> (:)>Test!0092132f753fba195ff8ce4f53704f74c8@masked WHISPER %#Test >Test2 :message
				onWhisper(getNick(toks[0]), toks[2], toks[3], toks.slice(4).join(" ").slice(1));
				break;
				
			case "821" : //unaway message
			/*
				Formats>
					Personal> 	(:)<user> 821 :User unaway
					Channel> 	(:)<user> 821 <chan> :User unaway
			*/
			
				if (toks[2].indexOf("%") == 0) on821Chan(getNick(toks[0]), toks[2], toks.slice(3).join(" ").slice(1));
				else on821Pr(getNick(toks[0]), toks.slice(2).join(" ").slice(1));
				break;
				
			case "822" : //away message
			/*
				Formats>
					Personal> 	(:)<user> 822 :<user message>
					Channel> 	(:)<user> 822 <chan> :<user message>
			*/
				if (toks[2].indexOf("%") == 0) on822Chan(getNick(toks[0]), toks[2], toks.slice(3).join(" ").slice(1));
				else on822Pr(getNick(toks[0]), toks.slice(2).join(" ").slice(1));
				break;
				
			case "301":
				on301(toks[3], toks.slice(4).join(" ").slice(1));
				break;
				
			case "302":
				on302(toks[2], toks[3].slice(1));
				break;
				
			case "353" : //names list reply
				parseNamesList(ircmsg);
				break;
				
			case "366" : //names list end reply
				onEndofNamesList();
				break;
				
			case "324"	: //channel modes reply
				parse324(toks[3], toks[4], toks[5], toks);
				break;
				
			case "433" : //nick already in use error
			//Format> (:)ChatDriveIrcServer.1 433 >Test >Test :Nickname is already in use
				onErrorReplies(toks[1], toks[2], toks[3], strip(toks.slice(4).join(" ")));
				if (UserName.length < 40) UserName = UserName + random(20000);
				else
				{
					UserName = UserName.substr(0, 32);
					UserName = UserName + random(20000);
				}
				if (_bConnectionRegistered == false) onSetNick(UserName);
				
				IRCSend("NICK " + UserName);
				
				if (_IsAuthRequestSent) sendAuthInfo();
				break;
				
			case "nick" :
			//Format> (:)>Test!0092132f753fba195ff8ce4f53704f74c8@masked NICK :>Test10555
				onNick(getNick(toks[0]), strip(toks[2]));
				break;
				
			case "authuser" :
				_IsAuthRequestSent = true;
				
				sendAuthInfo();
				break;
				
			case "mode" :
				//parseMode(sFrom, sChan, sModes, sParam, aModes)
				//printToks(toks);
				parseMode(getNick(toks[0]), toks[2], toks[3], toks[4], toks);
				break;
				
			case "341" : //invite confirmation
				on341(toks[2], toks[3], toks[4]);
				break;
				
			case "invite" :
				onInvite(getNick(toks[0]), toks[2], strip(toks[3]));
				break;
				
			case "data" :
			/*
				:<servername> DATA <nickby> <type> :<message>
				:<servername> DATA <nickby> PID :<nickof> <pid>
				:user@masked DATA <channel> <userto> <tag> :<message>
			*/
				onDataIRC(toks[2], toks[3], strip(toks.slice(4).join(" ")));
				onDataIRC2(getNick(toks[0]), toks[2], toks[3], toks[4], strip(toks.slice(5).join(" ")));
				break;
				
			case "knock" :
				onKnock(toks[0], toks[2], strip(toks.slice(3).join(" ")));
				break;
				
			case "prop" :
				onProp(getNick(toks[0]), toks[2], toks[3], strip(toks.slice(4).join(" ")));
				break;
				
			case "332" :
				on332(toks[3], strip(toks.slice(4).join(" ")));
				break;
				
			case "801": //IRCRPL_ACCESSADD
            case "802": //IRCRPL_ACCESSDELETE
            case "803": //IRCRPL_ACCESSSTART
            case "804": //IRCRPL_ACCESSLIST
            case "805": //IRCRPL_ACCESSEND
            case "820": //IRCRPL_ACCESSEND
            case "903": //IRCERR_BADLEVEL
            case "913": //IRCERR_NOACCESS
            case "914": //IRCERR_DUPACCESS
            case "915": //IRCERR_MISACCESS
            case "916": //IRCERR_TOOMANYACCESSES
				onAccessNRelatedReplies(toks[1], ircmsg);
				break;
				
			case "900": //IRCERR_BADCOMMAND
            case "901": //IRCERR_TOOMANYARGUMENTS
            case "925": //IRCERR_TOOMANYARGUMENTS
               	onAccessNRelatedReplies(toks[1], ircmsg);
            	break;
			
			case "818":
            case "819":
				onPropReplies(toks[1], toks[3], ircmsg);
				break;
				
			default :
				if (isNaN(toks[1]) == false) 
				{
					if (toks[1] == "432" && _bConnectionRegistered)
					{
						if (this.UserName[0] != ">") break;
					}
					onErrorReplies(toks[1], toks[2], toks[3], strip(toks.slice(4).join(" ")));
				}
				
				//unhandledCommand(ircmsg);
				break;
			}
			// End of switch
		}
		// end if
	}
	// End of the function
	
	function printToks(atoks)
	{
		for(var i=0; i<atoks.length; i++)
		{
			Write("tok[" + i + "]: " + atoks[i]);
		}
	}
	
	function sendAuthInfo() {
		
		if (UserPass == "T") {
			IRCSend("UTICKET " + AuthPass);
		}
		else if (UserPass == "T2") {
			IRCSend("UTICKET2 " + AuthPass);
		}
		else {
			IRCSend("LOGIN guest " + AuthPass);
			//IRCSend("NICK " + UserName);
			//IRCSend("USER anon \"anon.com\" \"0.0.0.0\" :anon");
		}
		
	}
	
	function getNick(dat) 
	{
		return (dat.slice(0, dat.indexOf("!")));
	}
	// End of the function
	
	function getHost(dat) 
	{
		var idxHostStart = dat.indexOf("@") + 1;
		return (dat.substr(idxHostStart));
	}
	// End of the function
	
	function strip(dat) 
	{
		return (dat.charAt(0, 1) == ":") ? dat.substr(1) : dat;
	}
	
	function stripChr(chr:String, str:String):String
	{
		//keep it for later use
		var sTmp:String = "", idx:Number = -1;
		
		return sTmp;
	}
	// End of the function
	
	private function parseJoin(userstr, flags, chan)
	{
		var oUser:Object = {nick:null, fullident:null, ident:null, host:null, ilevel:0, iprofile:0, away:false, awaymsg:"", voice:false, ignore:false};
		var pos1:Number = -1, pos2:Number = -1;
		
		pos1 = userstr.indexOf("!");
		oUser.nick = userstr.substr(0, pos1);
		pos1++;
		pos2 = userstr.indexOf("@", pos1);
		oUser.fullident = userstr.substr(pos1, (pos2-pos1));
		pos1 = oUser.fullident.lastIndexOf(".")+1;
		oUser.ident = oUser.fullident.substr(pos1);
		pos2++;
		oUser.host = userstr.substr(pos2);
		
		oUser.ilevel = 0;
		
		switch(flags.charAt(0))
		{
			case "A":
				oUser.away = true;
				break;
			case "U":
				oUser.away = false;
				break;
		}
					
		switch(flags.substr(1, 2))
		{
			case "UN":
				oUser.iprofile = _global.NoProfile;
				break;
			case "UP":
				oUser.iprofile = _global.NoGenderWPic;
				break;
			case "FN":
				oUser.iprofile = _global.Female;
				break;
			case "MN":
				oUser.iprofile = _global.Male;
				break;
			case "FP":
				oUser.iprofile = _global.FemaleWPic;
				break;
			case "MP":
				oUser.iprofile = _global.MaleWPic;
				break;
		}
		
		switch(flags.charAt(3))
		{
			case "V":
				oUser.voice = true;
				break;
			case "N":
				oUser.voice = false;
				break;
		}
		
		if (oUser.nick.charAt(0) == "^") oUser.ilevel = _global.IsStaff;
		onJoin(oUser, chan.substr(1)); //strip colon before channel name
	}
	// End of the function
	
	private function parse324(sChan, sModes, sParam, aModes)
	{
		var sNModes:String = "", s_l_Mode:String = undefined, s_k_Mode:String = undefined;
		//Write("sModes: " + sModes);
		//Write("sParam: " + sParam);
		if ((sParam == undefined) || (sParam.length == 0))
		{
			//test these operations for performance
			sModes = sModes.split("l").join(""); 
			sModes = sModes.split("k").join("");
			//Write("sModes.1: " + sModes);
			if (sModes.length > 1) on324(sChan, sModes.substr(1), undefined, undefined);
			else on324(sChan, "", undefined, undefined)
			return;
		}
		else
		{
			for (var i:Number = 0; i<sModes.length; i++)
			{
				switch (sModes.charAt(i))
				{
					case "l":
						if (aModes[5] != undefined) s_l_Mode = aModes[5];
						break;
					case "k":
						if (aModes[6] != undefined) s_k_Mode = aModes[6];
						break;
					default:
						sNModes += sModes.charAt(i);
						break;
				}
			}
			//Write("sModes.2: " + sModes);
			if (sNModes.length > 1) on324(sChan, sNModes.substr(1), s_l_Mode, s_k_Mode);
			else on324(sChan, "", s_l_Mode, s_k_Mode);
		}
	}
	
	private function parseMode(sFrom, sChan, sModes, sParam, aModes)
	{
		var bIsChanModeWParams:Boolean = false;
		
		if (sModes == "-k")
		{
			var modeoplist:Array = new Array();
			var oModeParams:Object = {op:null, mode:null, param:null};
			
			oModeParams.op = "-";
			oModeParams.mode = "k";
			modeoplist.push(oModeParams);
			
			onChanModeWParams(sFrom, modeoplist, sChan);
			return;
		}
		else if ((sParam == undefined) || (sParam.length == 0))
		{
			//Write("onChanMode #1");
			//Write("sParam: " + sParam);
			onChanMode(sFrom, sModes, sChan);
			return;
		}
		else
		{
			for (var i:Number = 0; i<sModes.length; i++)
			{
				if ((sModes.charAt(i) == "l") || (sModes.charAt(i) == "k"))
				{
					bIsChanModeWParams = true;
					break;
				}
			}
			
			//
			var m:Number = 0, i:Number = 4;
			var bSignAdd:Boolean = true;
			var modeoplist:Array = new Array();
			
			if (bIsChanModeWParams == false)
			{
				while((i < aModes.length) || (m < sModes.length))
				{
					var oModeParams:Object = {op:null, mode:null, param:null};
					
					switch(sModes.charAt(m))
					{
						case "-":
							bSignAdd = false;
							break;
						case "+":
							bSignAdd = true;
							break;
						default:
							oModeParams.op 		= (bSignAdd == true) ? "+" : "-";
							oModeParams.mode 	= sModes.charAt(m);
							oModeParams.param 	=  aModes[i];
							modeoplist.push(oModeParams);
							i++;
							break;
					}
					
					m++;
				}
				
				//Write("onUserMode #1");
				onUserMode(sFrom, modeoplist, sChan);
			}
			else
			{
				while((i < aModes.length) || (m < sModes.length))
				{
					var oModeParams:Object = {op:null, mode:null, param:null};
					
					switch(sModes.charAt(m))
					{
						case "-":
							bSignAdd = false;
							break;
						case "+":
							bSignAdd = true;
							break;
						default:
							oModeParams.op 		= (bSignAdd == true) ? "+" : "-";
							oModeParams.mode 	= sModes.charAt(m);
							oModeParams.param 	=  aModes[i];
							modeoplist.push(oModeParams);
							i++;
							break;
					}
					
					m++;
				}
				
				onChanModeWParams(sFrom, modeoplist, sChan);
			}
		}
	}
	
	private function parseNotice(sFrom, sTo, sMessage) 
	{
		//ToDo:
	}
	// End of the function
	
	private function parsePrivmsg(sFrom, sTo, sMessage) 
	{
		if (sMessage.charAt(0) == ":") sMessage = sMessage.substr(1);
		onPrivmsg(sFrom, sTo, sMessage);
	}
	// End of the function
	
	private function parseNamesList(str)
	{
		var ArrayNLpre:Array, ArrayNLpost:Array = new Array();
		
		ArrayNLpre = str.substr(str.indexOf(":", 2)+1).split(" ");
		
		//NB NamesList Protocol Formant: UFPN,'nickname :: [ (U|A)(F|M|U)(P|N)(N|Y),(+|%|@|.|'|^)nickname ]
		for (var i:Number = 0; i < ArrayNLpre.length; i++)
		{
			var oUser:Object = {nick:null, ident:null, host:null, ilevel:0, iprofile:0, away:false, awaymsg:"", voice:false, ignore:false};
			
			if (ArrayNLpre[i].length > 0) 
			{
				switch(ArrayNLpre[i].charAt(0))
				{
					case "A":
						oUser.away = true;
						break;
					case "U":
						oUser.away = false;
						break;
				}
				
				switch(ArrayNLpre[i].substr(1, 2))
				{
					case "UN":
						oUser.iprofile = _global.NoProfile;
						break;
					case "UP":
						oUser.iprofile = _global.NoGenderWPic;
						break;
					case "FN":
						oUser.iprofile = _global.Female;
						break;
					case "MN":
						oUser.iprofile = _global.Male;
						break;
					case "FP":
						oUser.iprofile = _global.FemaleWPic;
						break;
					case "MP":
						oUser.iprofile = _global.MaleWPic;
						break;
				}
				
				switch(ArrayNLpre[i].charAt(3))
				{
					case "V":
						oUser.voice = true;
						break;
					case "N":
						oUser.voice = false;
						break;
				}
				
				switch(ArrayNLpre[i].charAt(5))
				{
					case "^":
						oUser.ilevel = _global.IsStaff;
						break;
					case "'":
						oUser.ilevel = _global.IsSuperOwner;
						break;
					case ".":
						oUser.ilevel = _global.IsOwner;
						break;
					case "@":
						oUser.ilevel = _global.IsHost;
						break;
					case "%":
						oUser.ilevel = _global.IsHelpOp;
						break;
					case "+":
						oUser.voice = true;
						break;
					default:
						oUser.ilevel = 0;
				}
				
				oUser.nick = (oUser.ilevel > 0) ? ArrayNLpre[i].substr(6) : ArrayNLpre[i].substr(5);
				if (oUser.nick.charAt(0) == "^") oUser.ilevel = _global.IsStaff;
				
				ArrayNLpost.push(oUser);
			}
		}
		
		onNameslist(ArrayNLpost);
	}
	
	function GotoRoom() 
	{
		if (Channel.length > 0) 
		{
			IRCSend("CREATE " + Channel);
		}
		// end if
	}
	// End of the function
	
	function handleError(sError) 
	{
		Write("<font color='#FF0000'>Error: " + sError + "</font>");
	}
	// End of the function
	
	function unhandledCommand(sCmd) 
	{
		Write("Unhandled Command:" + sCmd);
	}
	
	function handleError2(sError) 
	{
		Write(sError);
	}
	
	function PingReply(sData)
	{
		IRCSend("PONG " + sData.toString());
	}
	// End of the function
	
	function sendToChan(chan, msg) 
	{
		IRCSend("PRIVMSG " + chan + " :" + msg);
	}
	// End of the function
	
	function IRCSend(sMsg)
	{
		try
		{
			send(sMsg + "\r\n");
			AddtoDebugArray(">>:" + sMsg);
			//Write("sent: " + sMsg);
		}
		finally
		{
			
		}
	}
	
	function Write(str)
	{
		onWrite(str);
	}
}
// End of Class
