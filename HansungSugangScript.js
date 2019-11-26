

// 사용법
// 자바 스크립트 디버깅 사용
// 1. 해당 과목이 수강 신청 목록에 나와있어야 함
// 2. userConfig의 변수들 자신한테 맞게 설정할 것
var userConfig = {
    year : '4',
    code : 'U122038',
    bunban : 'A',
    track : '1' // 교양일 경우 X 전공일 경우 트랙 입력    
}

var globalConfig = {
    count : 0
}

async function start() 
{
    f_reload_middle();

    // Start Search SugangTitle
    var targetArr = $('.divSugangTitle');

    //    1. Start Search SugangTitle by code
    for(var i = 0; i < targetArr.length; ++i)
    {
        if(targetArr[i].textContent.search(userConfig.code) != -1)
        {
            break;
        }
    }
    targetArr[i].textContent += globalConfig.count++;

    var target = targetArr[i].nextElementSibling.getElementsByTagName("tr")[1].getElementsByTagName("td")[3];
    var value = target.textContent;

    if(value != "0")
    {
      $("#div_bottom").load('h_sugang_sincheong_i02_s_20160128.jsp?&gwamok=' + userConfig.code +'&bunban='+ userConfig.bunban + '&year=' + userConfig.year + '&track=' + userConfig.track, 
      function( response, status, xhr ) 
      {
          if ( status == "error" ) 
          {
            var msg = "오류 :  ";
            $( "#div_bottom" ).html( msg + xhr.status + " " + xhr.statusText );
          }
          else 
          {
            f_reload_middle();
            f_reload_bottom();
            if(_trim(response) != '')	
                alert(_trim(response));
          }
      });
    }

    var interval = Math.floor(Math.random() * 1000) + 500;
    setTimeout(start, interval);
}

start();