<!DOCTYPE HTML>
<html lang = "en">
<head>
  <title>World creation</title>
  <style type="text/css">
    #limit {
     max-width: 500px;
    }
    #maxBuildHeight{
      max-width: 150px;
    }
    #maxViewDistance{
      max-width: 150px;
    }
    #opPermissionLevel{
      max-width: 150px;
    }
    #maxPlayers{
      max-width: 150px;
    }
 
     .buttonSet{
    -khtml-user-select: none;
     -moz-user-select: -moz-none;
     -webkit-user-select: none; 
      font-size: .6em;
    }

    .elementLabel{
      float:left;
      padding-right: 10px;
    }


    </style>
  <meta charset = "UTF-8" />
  <meta http-equiv="Content-Type" content="text/html">
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html">
  <link rel="stylesheet" type="text/css" media="all" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/base/jquery-ui.css">
  <link rel="stylesheet" type="text/css" media="all" href="http://fonts.googleapis.com/css?family=Acme">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

  <script type="text/javascript">
$(function(){
  $('#maxBuildHeight').slider({ 
    max: 256,
    min: 64,
    value: 256,
    animate:true,
    step:16,
    slide: function(e,ui) {
      $('#maxBuildHeightSliderValue').html(ui.value);
    }
    ,change: function(e,ui) {
      $('#maxBuildHeightInputValue').attr('value', ui.value);
    }
  });
});


$(function(){
  $('#maxViewDistance').slider({ 
    max: 15,
    min: 3,
    value: 10,
    step:1,
    animate:true,
    slide: function(e,ui) {
      $('#maxViewDistanceSliderValue').html(ui.value);
    }
    ,change: function(e,ui){
      $('#maxViewDistanceInputValue').attr('value',ui.value);
    }
  });
});

$(function(){
  $('#opPermissionLevel').slider({ 
    max: 4,
    min: 1,
    value: 4,
    step:1,
    animate:true,
    slide: function(e,ui) {
      $('#currentPermissionLevel').html(ui.value);
    }
  });
});

$(function(){
  $('#maxPlayers').slider({ 
    max: 50,
    min: 2,
    value: 25,
    step:1,
    animate:true, 
    slide: function(e,ui) {
      $( "#maxPlayersSliderValue" ).html(ui.value);
    }
    ,change: function(e,ui){
      $( "#maxPlayersInputValue").attr('value',ui.value);
    }
  });
});
$(function(){
  $( '#defaultGamemode' ).buttonset();
  $( "#defaultGamemode" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#levelType').buttonset();
  $( "#levelType" ).find("label").unbind("mouseup");
})

$(function(){
  $( '#difficulty' ).buttonset();
  $( "#difficulty" ).find("label").unbind("mouseup");
})

$(function(){
  $( '#allowFlight' ).buttonset();
  $( "#allowFlight" ).find("label").unbind("mouseup");
})

$(function(){
  $( '#enableWhiteList' ).buttonset();
  $( "#enableWhiteList" ).find("label").unbind("mouseup");
})

$(function(){
  $( '#enableAnnounce' ).buttonset();
  $( "#enableAnnounce" ).find("label").unbind("mouseup");
})

$(function(){
  $( '#enableCommandBlock' ).buttonset();
  $( "#enableCommandBlock" ).find("label").unbind("mouseup");
})

$(function(){
  $( '#forceGamemode' ).buttonset();
  $( "#forceGamemode" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enableQuery' ).buttonset();
  $( "#enableQuery" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enableDebug' ).buttonset();
  $( "#enableDebug" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enableRcon' ).buttonset();
  $( "#enableRcon" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enableSnooper' ).buttonset();
  $( "#enableSnooper" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enableHardcore' ).buttonset();
  $( "#enableHardcore" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enablePvp' ).buttonset();
  $( "#enablePvp" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#generateStructures' ).buttonset();
  $( "#generateStructures" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enableSpawnAnimals' ).buttonset();
  $( "#enableSpawnAnimals" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enableSpawnMonsters' ).buttonset();
  $( "#enableSpawnMonsters" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#enableSpawnNpcs' ).buttonset();
  $( "#enableSpawnNpcs" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#allowNether' ).buttonset();
  $( "#allowNether" ).find("label").unbind("mouseup");
})
$(function(){
  $( '#onlineMode' ).buttonset();
  $( "#onlineMode" ).find("label").unbind("mouseup");
})
</script>
  
</head>
<body>
  <div id="limit">
  <form action="/start" method="post">
    <fieldset>
     <legend>Gamemode settings</legend>

     <!--gamemode-->

    <p>
     <label class="elementLabel" for="buttonSet">Default gamemode</label>
   <div class="buttonSet" id="defaultGamemode">
    <input type = "radio" id="survival" value = "0" name = "gamemode" checked="checked">
    <label for ="survival">Survival</label>

    <input type = "radio" id="creative" value = "1" name = "gamemode">
    <label for ="creative">Creative</label>
   
    <input type = "radio" id="adventure" value = "2" name = "gamemode">
    <label for ="adventure">Adventure</label>
    </div>
    </p>
    

    <!--force-gamemode-->
  <p>
    <label class="elementLabel" for="buttonSet">Force gamemode</label>
   <div class="buttonSet" id="forceGamemode">
    <input type = "radio" id="forceGamemodeYes" value = "true" name = "force-gamemode">
    <label for ="forceGamemodeYes">Yes</label>

    <input type = "radio" id="forceGamemodeNo" value = "false" name = "force-gamemode" checked="checked">
    <label for ="forceGamemodeNo">No</no>
  
    </div>
  </p>
  
  </fieldset>     
 
  <!--external settings-->
 
  <fieldset>
   <legend>External settings</legend>

   <!--enable-query-->
  <p>
    <label class="elementLabel" for="buttonSet">Enable query</label>
   <div class="buttonSet" id="enableQuery">
    <input type = "radio" id="enableQueryYes" value = "true" name = "enable-query">
    <label for ="enableQueryYes">Yes</label>

    <input type = "radio" id="enableQueryNo" value = "false" name = "enable-query" checked="checked">
    <label for ="enableQueryNo">No</no>
  
    </div>
  </p>
  
  <!--query.port-->
 
  <p>
   <input type="text" name="query.port" placeholder="Query port"><br />
 </p>

 <!--enable-rcon-->

   <p>
    <label class="elementLabel" for="buttonSet">Enable Rcon</label>
   <div class="buttonSet" id="enableRcon">
    <input type = "radio" id="enableRconYes" value = "true" name = "enable-rcon">
    <label for ="enableRconYes">Yes</label>

    <input type = "radio" id="enableRconNo" value = "false" name = "enable-rcon" checked="checked">
    <label for ="enableRconNo">No</no>
  
    </div>
  </p>

<!--rcon.port-->

<p>
 <input type="text" name="rcon.port" placeholder="Rcon port"><br />
</p>

<!--rcon.password-->

<p>
 <input type="text" name="rcon.password" placeholder="Rcon password"><br />
</p>

<!--snooper-enabled-->

 <p>
    <label class="elementLabel" for="buttonSet">Enable snooper</label>
   <div class="buttonSet" id="enableSnooper">
    <input type = "radio" id="enableSnooperYes" value = "true" name = "snooper-enabled">
    <label for ="enableSnooperYes">Yes</label>

    <input type = "radio" id="enableSnooperNo" value = "false" name = "snooper-enabled" checked="checked">
    <label for ="enableSnooperNo">No</no>
    </div>
  </p>
</fieldset>
<fieldset>
  <legend>Gameplay settings</legend>

  <!--hardcore-->

   <p>
    <label class="elementLabel" for="buttonSet">Enable hardcore</label>
   <div class="buttonSet" id="enableHardcore">
    <input type = "radio" id="enableHardcoreYes" value = "true" name = "hardcore">
    <label for ="enableHardcoreYes">Yes</label>

    <input type = "radio" id="enableHardcoreNo" value = "false" name = "hardcore" checked="checked">
    <label for ="enableHardcoreNo">No</no>
    </div>
  </p>

  <!--pvp-->

   <p>
    <label class="elementLabel" for="buttonSet">Enable pvp</label>
   <div class="buttonSet" id="enablePvp">
    <input type = "radio" id="enablePvpYes" value = "true" name = "pvp">
    <label for ="enablePvpYes">Yes</label>

    <input type = "radio" id="enablePvpNo" value = "false" name = "pvp" checked="checked">
    <label for ="enablePvpNo">No</no>
    </div>
  </p>

  <!--difficulty-->	

   <p>
     <label class="elementLabel" for="buttonSet">Default gamemode</label>

   <div class="buttonSet" id="difficulty">
    <input type = "radio" id="hard" value = "3" name = "difficulty">
    <label for ="hard">Hard</label>

    <input type = "radio" id="normal" value = "2" name = "difficulty" checked="checked">
    <label for ="normal">Normal</label>
   
    <input type = "radio" id="easy" value = "1" name = "difficulty">
    <label for ="easy">Easy</label>

    <input type = "radio" id="peaceful" value = "0" name = "difficulty">
    <label for ="peaceful">Peaceful</label>
    </div>
   </p>

</fieldset>

<fieldset>
  <legend>World settings</legend>

<!--level-type-->

  <p>
    
   <label class="elementLabel" for="levelType">Level type</label>

  <div class="buttonSet" id="levelType">
  <input type = "radio" id="default" value = "DEFAULT" name = "level-type" checked="checked">
  <label for ="default">Default</label>

  <input type = "radio" id="largeBiomes" value = "LARGEBIOMES" name = "level-type">
  <label for ="largeBiomes">Large biomes</label>
 
  <input type = "radio" id="amplified" value = "AMPLIFIED" name = "level-type">
  <label for ="amplified">Amplified</label>
  
  <input type = "radio" id="flat" value = "FLAT" name = "level-type">
  <label for ="flat">Flat</label>
  </div>
  </p>
   
    <!--generator-settings-->

  <p>
   <input type="text" name="generator-settings" placeholder="Generator settings"><br />
 </p>

 <!--level-seed-->

 <p>
   <input type="text" name="level-seed" placeholder="Level seed"><br />
 </p>
 
 <!--resource-pack-->

<p>
   <input type="text" name="resource-pack" placeholder="Resource pack"><br />
</p>

 <!--generate-structures-->

   <p>
    <label class="elementLabel" for="buttonSet">Generate structures</label>
   <div class="buttonSet" id="generateStructures">
    <input type = "radio" id="generateStructuresYes" value = "true" name = "generate-structures"checked="checked">
    <label for ="generateStructuresYes">Yes</label>

    <input type = "radio" id="generateStructuresNo" value = "false" name = "generate-structures">
    <label for ="generateStructuresNo">No</no>
    </div>
  </p>

<!--spawn-animals-->

   <p>
    <label class="elementLabel" for="buttonSet">Spawn animals</label>
   <div class="buttonSet" id="enableSpawnAnimals">
    <input type = "radio" id="enableSpawnAnimalsYes" value = "true" name = "spawn-animals"checked="checked">
    <label for ="enableSpawnAnimalsYes">Yes</label>

    <input type = "radio" id="enableSpawnAnimalsNo" value = "false" name = "spawn-animals">
    <label for ="enableSpawnAnimalsNo">No</no>
    </div>
  </p>

<!--spawn-monsters-->

  <p>
    <label class="elementLabel" for="buttonSet">Spawn monsters</label>
   <div class="buttonSet" id="enableSpawnMonsters">
    <input type = "radio" id="enableSpawnMonstersYes" value = "true" name = "spawn-monsters"checked="checked">
    <label for ="enableSpawnMonstersYes">Yes</label>

    <input type = "radio" id="enableSpawnMonstersNo" value = "false" name = "spawn-monsters">
    <label for ="enableSpawnMonstersNo">No</no>
    </div>
  </p>

<!--spawn-npcs-->    

  <p>
    <label class="elementLabel" for="buttonSet">Spawn NPCS</label>
   <div class="buttonSet" id="enableSpawnNpcs">
    <input type = "radio" id="enableSpawnNpcsYes" value = "true" name = "spawn-npcs"checked="checked">
    <label for ="enableSpawnNpcsYes">Yes</label>

    <input type = "radio" id="enableSpawnNpcsNo" value = "false" name = "spawn-npcs">
    <label for ="enableSpawnNpcsNo">No</no>
    </div>
  </p>
<!--allow-nether-->    
 
  <p>
    <label class="elementLabel" for="buttonSet">Allow nether</label>
   <div class="buttonSet" id="allowNether">
    <input type = "radio" id="allowNetherYes" value = "true" name = "allow-nether"checked="checked">
    <label for ="allowNetherYes">Yes</label>

    <input type = "radio" id="allowNetherNo" value = "false" name = "allow-nether">
    <label for ="allowNetherNo">No</no>
    </div>
  </p>

<!--max-build-height-->
 
 <p>
  <label for = "maxBuildHeightSliderValue">Max build height: <span id="maxBuildHeightSliderValue">256 </span></label>
  <div id="maxBuildHeight"></div>
  <input id="maxBuildHeightInputValue" name="max-build-height" style="display: none"/>
</p>

<!--view-distance-->

<p>
  <label for = "maxViewDistanceSliderValue">Max view distance: <span id="maxViewDistanceSliderValue">10 </span></label>
  <div id="maxViewDistance"></div>
  <input id="maxViewDistanceInputValue" name="view-distance" style="display: none"/>
</p>

</fieldset>
<fieldset>
  <legend>Server settings</legend>

<!--level-name-->

<p>
 <input type="text" name="level-name" placeholder="World name"><br />
</p>

<!--motd-->

<p>
 <input type="text" name="motd" placeholder="World description"><br />
</p>

<!--server-ip-->

<p>
 <input type="text" name="server-ip" placeholder="Server IP"><br />
</p>

<!--server-port-->

<p>
 <input type="text" name="server-port" placeholder="Server port"><br />
</p>

<!--online-mode-->    

  <p>
    <label class="elementLabel" for="buttonSet">Online mode</label>
   <div class="buttonSet" id="onlineMode">
    <input type = "radio" id="onlineModeYes" value = "true" name = "online-mode"checked="checked">
    <label for ="onlineModeYes">Yes</label>

    <input type = "radio" id="onlineModeNo" value = "false" name = "online-mode">
    <label for ="onlineModeNo">No</no>
    </div>
  </p>

<!--max-players-->

<p>
  <label for = "maxPlayersSliderValue">Player limit: <span id="maxPlayersSliderValue">25 </span></label>
  <div id="maxPlayers"></div>
  <input id="maxPlayersInputValue" name="max-players" style="display: none"/>

</p>

</fieldset>
<fieldset>
  <legend>Admin settings</legend>

<!--op-permission-level-->    

 <p>
  <label for = "opPermissionLevel">Op permission level: 
  <span id="currentPermissionLevel">3 </span></label>
  <div id="opPermissionLevel"></div>
</p>

<!--allow-flight-->    
  
<p>
     <label class="elementLabel" for="buttonSet">Allow flight</label>

   <div class="buttonSet" id="allowFlight">
    <input type = "radio" id="allowFlightYes" value = "true" name = "allow-flight">
    <label for ="allowFlightYes">Yes</label>

    <input type = "radio" id="allowFlightNo" value = "false" name = "allow-flight" checked="checked">
    <label for ="allowFlightNo">No</no>
  
    </div>
</p>

<!--white-list-->    

  <p>
    <label class="elementLabel" for="buttonSet">Enable white list</label>
   <div class="buttonSet" id="enableWhiteList">
    <input type = "radio" id="whiteListYes" value = "true" name = "white-list">
    <label for ="whiteListYes">Yes</label>

    <input type = "radio" id="whiteListNo" value = "false" name = "white-list" checked="checked">
    <label for ="whiteListNo">No</no>
  
    </div>
</p>


<!--announce-player-achievements-->

  <p>
    <label class="elementLabel" for="buttonSet">Announce players achievements</label>
   <div class="buttonSet" id="enableAnnounce">
    <input type = "radio" id="announceYes" value = "true" name = "announce-player-achievements"checked="checked">
    <label for ="announceYes">Yes</label>

    <input type = "radio" id="announceNo" value = "false" name = "announce-player-achievements" >
    <label for ="announceNo">No</no>
  
    </div>
</p>

<!--enable-command-block-->
  
  <p>
    <label class="elementLabel" for="buttonSet">Enable command block</label>
   <div class="buttonSet" id="enableCommandBlock">
    <input type = "radio" id="commandBlockYes" value = "true" name = "enable-command-block"checked="checked">
    <label for ="commandBlockYes">Yes</label>

    <input type = "radio" id="commandBlockNo" value = "false" name = "enable-command-block" >
    <label for ="commandBlockNo">No</no>
  
    </div>
</p>

<!--debug-->

  <p>
    <label class="elementLabel" for="buttonSet">Enable debug</label>
   <div class="buttonSet" id="enableDebug">
    <input type = "radio" id="debugYes" value = "true" name = "debug">
    <label for ="debugYes">Yes</label>

    <input type = "radio" id="debugNo" value = "false" name = "debug" checked="checked">
    <label for ="debugNo">No</no>
  
    </div>
</p>

<!--player-idle-timeout-->

<p>
 <input type="text" name="player-idle-timeout" placeholder="Player idle timeout"><br />
</p>
</fieldset>
<p>

<input type="submit" id="createWorldButton" value="Create world" />

</p>

</form>
</body>


</html>
