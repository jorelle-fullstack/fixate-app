var get_url = window.location.pathname;
var compare_url = get_url.substring(get_url.lastIndexOf('/') + 1);

console.log(compare_url);
document.querySelector("html").classList.add('js');
$("input#current_images").val("");

$('input#current_images').change(function() {
    var filename = $(this).val().split('\\').pop();
    $(this).next('label').text("file:"+filename);
})

$(document).on("click", "#submit-image", function(e){
    e.preventDefault();
    $.support.cors = true;
    $("#submit-label").html("");
    $("#addLoader").addClass("button--loading");

    var formData = new FormData();
    var fileLen = $("input#current_images")[0].files.length;

    if (fileLen == 0) {
        alert("Please select an image!");
    }
    else{
        formData.append("file", $("input#current_images")[0].files[0]);
        $.ajax({
        crossDomain: true,
        url: "https://hydra-api.dev.fixate.ai/api/auth",
        header: {"Access-Control-Allow-Headers": "*"},
        type: "post",
        data: {
            "client_id": "f6a63230358171caef1bc7bd8c47ca08",
            "client_secret": "edefd97334e4eda5d047f646235606411f0b8fd47194abb706a9db7ca275b0083751a7bdc6f52502113490ab6bfcd8b1b5afbe211fa7c6cf04cb88bc6347e335"
        },
        error: function(error) {
            alert("Error!, unexpected error has occured. page will refresh shortly");
            window.location.reload();
        },
        success: function(data){
            console.log(data);
            var token = data.token
            $.ajax({
            crossDomain: true,
            url: "https://hydra-api.dev.fixate.ai/api/image/upload?token=" + token,
            type: "post",
            headers: {
                Authorization: "bearer " + data.token
            },
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            error: function(error) {
                alert("Error! unexpected error has occured. page will refresh shortly");
                window.location.reload();
            },
            success: function(suc_res){
                console.log(suc_res);
                // alert("Image uploaded successfully!");
                $(".label").removeAttr("hidden").html("Image uploaded successfully").delay(1000).fadeOut(500);
                $("input#current_images").next('label').text("Select a file");
                $("#addLoader").removeClass("button--loading");
                $("#submit-label").html("Upload Image");
                $("input#current_images").val("");
            }       
            });
        }
        });
    }
});
