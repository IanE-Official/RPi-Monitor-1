var animate;
var shellinabox;
var shellinaboxport;
var statusautorefresh;
var refreshTimerId;
var clickId;
var firstload=true;

function SetProgressBarAnimate(){
  $('#animate').attr('checked', animate );
  if ( animate ) {
    $('.progress').addClass('active');
  }
  else{
    $('.progress').removeClass('active');
  }
}

function SetShellinaboxMenu(){
  $('#shellinabox').attr('checked', shellinabox );
  if ( shellinabox ) {
    $('#shellinaboxmenu').removeClass('hide');
    $('#shellinaboxport').val(shellinaboxport);
    $('#shellinaboxport').attr('disabled',false);
  }
  else{
    $('#shellinaboxmenu').addClass('hide');
    $('#shellinaboxport').val('');
    $('#shellinaboxport').attr('disabled',true);
  }

}

function ShowFriends(friend){
  if ( friend ) { 
    $('#friends').empty();
    for (var i = 0; i < friend.length; i++) {
      details=friend[i].split('=');
      $('#friends').append('<li><a href="http://'+details[0]+'">'+details[1]+'</a></li>');
    }
    $('#divfriends').removeClass('hide');
  }
}

$(function () {

  var dialogs="";

  function AddConfigurationDialog(){
      dialogs+=
        '<div id="Configuration" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
          '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
            '<h3 id="myModalLabel">Configuration</h3>'+
          '</div>'+
          '<div class="modal-body">'+
            '<p><label class="checkbox"><input type="checkbox" id="animate">Animate progress bar</label></p>'+
            '<p><form class="form-inline">'+
              '<label class="checkbox"><input type="checkbox" id="shellinabox">Show shellinabox menu</label> '+
              '<input type="text" placeholder="Listen Port" id="shellinaboxport" class="input-small" >'+
            '</form></p>'+
            '<p><label class="checkbox"><input type="checkbox" id="statusautorefresh">Auto refresh status page</label></p>'+
          '</div>'+
          '<div class="modal-footer">'+
            '<button class="btn" data-dismiss="modal" aria-hidden="true" id="closeconfiguration">Close</button>'+
          '</div>'+
        '</div>';
  }

  function AddLicenseDialog(){
    dialogs+=
      '<div id="License" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '<div class="modal-header">'+
          '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
          '<h3 id="myModalLabel">License</h3>'+
        '</div>'+
        '<div class="modal-body">'+
          'This program is free software: you can redistribute it and/or modify<br>'+
          'it under the terms of the GNU General Public License as published<br>'+ 
          'by the Free Software Foundation, either version 3 of the License, or<br>'+
          '(at your option) any later version.<br>'+
          '<br>'+
          'This program is distributed in the hope that it will be useful,i but<br>'+
          'WITHOUT ANY WARRANTY; without even the implied warranty of<br>'+
          'MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.<br>'+
          'See the GNU General Public License for more details.<br>'+
          '<br>'+
          'You should have received a copy of the GNU General Public License<br>'+
          'along with this program.  If not, see <a href="http://www.gnu.org/licenses/">http://www.gnu.org/licenses/</a>.'+
          '</p>'+
          '<hr>'+
          '<b>RPi-Monitor</b> is using third party software hava there own license.<br>'+
          'Ref. <a href="#About" data-dismiss="modal" data-toggle="modal">About</a> to have the list of software used by <b>RPi-Monitor</b>. '+
        '</div>'+
        '<div class="modal-footer">'+
          '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'+
        '</div>'+
      '</div>';
  }

  function AddAboutDialog(){
    dialogs+=
      '<div id="About" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '<div class="modal-header">'+
          '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
          '<h3 id="myModalLabel">About</h3>'+
        '</div>'+
        '<div class="modal-body">'+
          '<p><b>Version</b>: {DEVELOPMENT} '+
          '<b>by</b> Xavier Berger <a href="http://rpi-experiences.blogspot.fr/">Blog</a> <a href="https://github.com/XavierBerger/RPi-Monitor">GitHub</a></p>'+
          '<hr>'+
          '<p><b>RPi-Monitor</b> is free software developped on top of other open source '+
            'tools : <a href="http://twitter.github.io/bootstrap/">bootstrap</a>, <a href="http://jquery.com/">jquery</a>, <a href="https://code.google.com/p/jsqrencode/">jsqrencode</a> and <a href="http://javascriptrrd.sourceforge.net/">javascriptrrd</a>.<br>'+
          '<p><b>Raspberry Pi</b> and Raspberry Pi logo are properties of <a href="http://www.raspberrypi.org/">Raspberry Pi Fundation</a>.</p>'+
        '</div>'+
        '<div class="modal-footer">'+
          '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'+
        '</div>'+
      '</div>';
  }

  function AddDialogs(){
     $('#dialogs').html(dialogs);
  }

  function AddTopmenu(){
    var current_path = window.location.pathname.split('/').pop();
    topmenu=
        '<div class="navbar navbar-inverse navbar-fixed-top">'+
          '<div class="navbar-inner">'+
            '<div class="container">'+
              '<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
              '</button>'+
              '<a class="brand" href="index.html"><img src="img/logo.png"> RPi-Monitor</a>'+
              '<div class="nav-collapse collapse">'+
                '<ul class="nav">';

    status_active = '';
    statistics_active = '';
    shellinabox_active = '';
    var index=true;
    if (current_path == 'status.html'){
      status_active = 'class="active"';
      index=false;
    }
    if(current_path == 'statistics.html') {
      statistics_active = 'class="active"';
      index=false;
    }
    if(current_path == 'shellinabox.html') {
      shellinabox_active = 'class="active"';
      index=false;
    }

    if ( index==false ) {
      topmenu+=
                  '<li ' + status_active + '><a href="status.html">Status</a></li>'+
                  '<li ' + statistics_active + '><a href="statistics.html">Statistics</a></li>'+
                  '<li ' + shellinabox_active + ' id="shellinaboxmenu" class="hide"><a href="shellinabox.html">Shellinabox</a></li>'+
                  '<li><a href="#Configuration" data-toggle="modal">Configuration</a></li>';
      AddConfigurationDialog();
    }

    topmenu+=
                  '<li class="dropdown">'+
                    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">About <b class="caret"></b></a>'+
                    '<ul class="dropdown-menu">'+
                      '<li class="nav-header">RPi-Monitor</li>'+
                      '<li><a href="#License" data-toggle="modal">License</a></li>'+
                      '<li><a href="#About" data-toggle="modal">About</a></li>'+
                      '<li class="divider"></li>'+
                      '<li class="nav-header">Related links</li>'+
                      '<li><a href="http://rpi-experiences.blogspot.fr/">RPi-Experiences</a></li>'+
                      '<li><a href="https://github.com/XavierBerger/RPi-Monitor">RPi-Monitor</a></li>'+
                    '</ul>'+
                  '</li>'+
                '</ul>'+
              '</div><!--/.nav-collapse -->'+
              '<div class="navbar-inner pull-right hide" id="divfriends">'+
                '<ul class="nav">'+
                  '<li class="dropdown">'+
                    '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Friends <b class="caret"></b></a>'+
                    '<ul class="dropdown-menu" id="friends">'+
                    '</ul>'+
                  '</li>'+
                '</ul>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>';

    AddLicenseDialog();
    AddAboutDialog();

    $('#topmenu').html(topmenu);

  }

  function AddFooter(){
    $('#footer').html(
        '<div class="container">'+
          '<p class="muted credit"><small>Follow RPi-Monitor news in <a href="http://rpi-experiences.blogspot.fr/">RPi-Experiences</a> blog '+
          'and <a href="https://github.com/XavierBerger/RPi-Monitor">GitHub</a>. '+
          'Raspberry Pi brand and Raspberry Pi logo are properties of <a href="http://www.raspberrypi.org/">Raspberry Pi Fundation</a></small></p>'+
        '</div>'
    );
  }


  animate=(localStorage.getItem('animate') === 'true');
  shellinabox=(localStorage.getItem('shellinabox') === 'true');
  shellinaboxport=(localStorage.getItem('shellinaboxport') || '4200');
  statusautorefresh=(localStorage.getItem('statusautorefresh') === 'true');

  AddTopmenu();
  AddDialogs();
  AddFooter();
  SetShellinaboxMenu();
  $('#statusautorefresh').attr('checked', statusautorefresh );

  $('#animate').click(function(){
    animate = $('#animate').is(":checked");
    localStorage.setItem('animate', animate);
    SetProgressBarAnimate();
  });


  $('#shellinabox').click(function(){
    shellinabox = $('#shellinabox').is(":checked");
    localStorage.setItem('shellinabox', shellinabox);
    SetShellinaboxMenu();
  });

  $('#shellinaboxport').keyup(function(){
    shellinaboxport = $('#shellinaboxport').val();
    localStorage.setItem('shellinaboxport', shellinaboxport);
  });
  
  
  $('#statusautorefresh').click(function(){
    statusautorefresh = $('#statusautorefresh').is(":checked");
    localStorage.setItem('statusautorefresh', statusautorefresh);
    if ( statusautorefresh ) {
      UpdateStatus(); 
      refreshTimerId = setInterval( UpdateStatus , 10000 ) 
      clockId=setInterval(clock,1000);
    }
    else {
      clearInterval(refreshTimerId);
      clearInterval(clockId);
    };
  });

});