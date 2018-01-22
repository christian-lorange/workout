var rootURL = "https://csademo.orangehousellc.com";
//var rootURL = "http://jv.colostate.edu";

$$.ajax({
    dataType: "json",
    url: rootURL + "/wp-json/wp/v2/pages?_embed=true",
    success: function(data) {

        var html = "<ul>";
        $$.each( data, function( key, val ) {
           var link = val.link;
           var pic = val._embedded["wp:featuredmedia"][0].source_url;

            // Main list
            html += '<div class="card demo-card-header-pic">' +
                    '<div style="background-image:url(' + pic + ')" valign="bottom" class="card-header color-white no-border"></div>' +
                    '<div class="card-content">' +
                        '<div class="card-content-inner">' +
                        '<p class="card-title">' + val.title.rendered + '</p>' +
                    '<p>'+ val.excerpt.rendered +'</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="card-footer">' +
                        '<a href="#" class="link read-blog" data-id="' + val.id + '">Read More</a>' +
                    '</div>' +
                    '</div>';
        });

        html += "</ul>";

        $$('#app').html(html);
        console.log(m)
    },
    error: function(m) {
        console.log(m)
    }
});


// Loading flag
var loading = false;

// Last loaded index
var lastIndex = $$('.list-block li').length;

// Max items to load
var maxItems = 10;




// On clicking button to read blog post
$$(document.body).on('click', '.read-blog', function(){
    var singleBlog = new Framework7();

    $$.ajax({
        dataType: "json",
        url: rootURL + "/wp-json/wp/v2/posts/" + $$(this).data('id')+"?_embed=true",
        
        success: function(msg) {
            // Dynamic page
            var mainView = singleBlog.addView('.view-main'),
                newPageContent = '<div class="page" data-page="my-page">' +
                    '<div class="page-content inner-page">' +
                        '<div class="content-block-thumbnail"><img data-src="' + msg._embedded["wp:featuredmedia"][0].source_url +  '" class="lazy lazy-fadein"></div>' +
                        '<div class="content-block-title">' + msg.title.rendered +  '</div>' +
                        '<div class="content-block content-data">' + msg.content.rendered +  '</div>' +
                    '</div>' +
                    '</div>';

            // OR using .load method if need more options
            mainView.router.load({
                content: newPageContent,
                animatePages: true
            });

            myApp.hideNavbar('.navbar');
            myApp.showToolbar('.toolbar');
            // $$('.page-content').css('padding-top', '0');
        },
        error: function(msg) {
            console.log(msg)
        }
    });
});

$$('.back').on('click', function(){
    myApp.showNavbar('.navbar');
    myApp.hideToolbar('.toolbar');
    // $$('.page-content').css('padding-top', '44px');
});