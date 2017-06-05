/**
 * Created by 22340 on 2017/6/5.
 */
$(document).ready(function () {
    $complaints = $("#complaints");
    $emptyComplaint = $(".message");
    complaints_TypeOf(0);
});


function complaints_TypeOf(type) {
    var $title = $(".message-type");
    $complaints.empty();
    switch (type) {
        case 0:
            $title.text("超时");
            break;
        case 1:
            $title.text("未送达");
            break;
        case 2:
            $title.text("信息错误");
            break;
        case 3:
            $title.text("大小件判定");
            break;
        case 4:
            $title.text("其他");
            break;
    }

    $.ajax({
        url: "/complaints",
        type: "get",
        data: {"token": getCookie("token"), "state": type},
        success: function (result) {
            complaints = result.data;
            // console.log(JSON.stringify(complaints));
            if (result.data.length === 0) {
                $complaints.append($emptyComplaint);
                return;
            }

            //加载特效
            var _display = function (item) {
                var itemhtml =
                    '<div class="message effect4" id="' + '#tr' + item.id + '">' +
                    '<span class="message-title">申述单id: <strong>' + item.id + '</strong></span>' +
                    '<div class="message-content">提交者Id:' + item.userId + '</div>' +
                    '<div class="message-operation">' +
                    '<span onclick="popInfo(\''+item.id+'\')">操作</span>' +
                    '</div>' +
                    '</div>';
                $complaints.append(itemhtml);
            };
            var _afterdisplay = function (item) {
                $("#tr" + item.id).fadeIn(500);
            };
            beautifyDisplay(_display, _afterdisplay, result.data, "reviewsList");
        },
        error: function () {
            alert("complaints ajax请求发送失败");
        }
    })
}

function popInfo(id) {
    if(id===null) return;
    var complaint = findComplaintsById(id);
    console.log(JSON.stringify(complaint));
    alert(JSON.stringify("complaint"+complaint));
    $(".pop li").css({"min-height": "3em", "line-height": "3em"});  //todo 弹出窗口样式

    openPop();
}

function findComplaintsById(id) {
    for(var i=0;i<complaints.length;i++){
        if(complaints[i].id==id){
            return complaints[i];
        }
    }
    return null;
}


