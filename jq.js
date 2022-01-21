jQuery(document).ready(function($) {
    $('body').on('click touch touchstart', '#user_buy_chap', function(event) {
        var post_id = $('#data').data('id');
        var redirect = $('#data').data('redirect');
        $.ajax({
            type: "post",
            dataType: "html",
            url: ajaxurl,
            data: {
                action: "user_buy_chap",
                post_id: post_id,
                redirect: redirect,
            },
            beforeSend: function() {
                $('#user_buy_chap').html('');
                $('#show_user_buy_chap').html('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');
            },
            success: function(response) {
                $('.reading').html(response);
                var flag = $('#r-u-b-c').data('flag');
                if (flag == '2') {
                    $('#success-hidden').html('');
                } else if (flag == '1') {
                    var reason = $('#r-u-b-c').data('reason');
                    switch (reason) {
                    case 'Tác Giả':
                        reason = 'Đây là chương VIP. Chỉ có bạn và thành viên đồng quản lý của truyện ( >= level 2) mới xem được xem miễn phí chương này. ';
                        break;
                    case 'Quản Lý':
                        reason = 'Đây là chương VIP. Bạn được xem miễn phí chương này vì là đồng quản lý của truyện';
                        break;
                    case 'Dịch':
                        reason = 'Đây là chương VIP. Chỉ có thành viên đăng chương này (bạn) mới có quyền xem miễn phí';
                        break;
                    case 'Paid':
                        reason = 'Bạn được xem chương này miễn phí vì đã mua từ trước đó';
                        break;
                    default:
                    }
                    $('#success-hidden').html('');
                    $('#reading-notify').prepend('<div class="alert alert-info text-center" role="alert"><i class="fa fa-info" aria-hidden="true"></i> ' + reason + '</div>');
                } else if (flag == '0') {
                    $('#show_user_buy_chap').html('');
                    $('#user_buy_chap').html('<span class="btn btn-primary color-white"><i class="fa fa-eye" aria-hidden="true"></i> Xem Chương</span>');
                    var reason = $('#r-u-b-c').data('reason');
                    switch (reason) {
                    case 'Tài khoản của bạn không đủ để mua chương này.':
                        reason = reason + ' <a href="/user/deposit/#h1"><i class="fa fa-money" aria-hidden="true"></i> Nạp Tiền</a>';
                        break;
                    case 'Bạn chưa đăng nhập':
                        reason = 'Test <a href="/user/dang-nhap?redirect=' + redirect + '"><i class="fa fa-sign-in" aria-hidden="true"></i> Đăng Nhập</a>';
                        break;
                    default:
                    }
                    if (reason == 'Tài khoản của bạn không đủ để mua chương này.') {
                        reason = reason + ' <a href="/user/deposit/#h1"><i class="fa fa-money" aria-hidden="true"></i> Nạp Tiền</a>';
                    }
                    $('#myModal .modal-body').html('<div class="alert alert-danger" role="alert"><i class="fa fa-info" aria-hidden="true"></i> Helo: ' + reason + '</div>');
                    $('#myModal').modal('show');
                }
            },
        });
    });
    $('html').on('click', 'body', function(event) {
        var text = "";
        if (typeof window.getSelection != "undefined") {
            text = window.getSelection().toString();
        } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
            text = document.selection.createRange().text;
        }
        if (text) {
            var reading = $('.reading').html();
            console.log(reading);
            if (reading) {
                $('.reading').html('<div class="alert alert-danger text-center" role="alert"><i class="fa fa-info" aria-hidden="true"></i> Vui lòng không nhấp chuột vào màn hình. Tải lại trang để tiếp tục đọc truyện</div>');
            }
        }
    });
});
