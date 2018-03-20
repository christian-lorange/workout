jQuery(document).ready(function ($) {

    const RESTURL = 'http://cross.orangehousellc.com//wp-json/'

    var app = {
        
        init : function() {
            
            this.getSiteData()
            this.loadblog()
            this.loadannouncement()
            this.loadabout()
            this.loadActions()
    
            
        },
        
        loadActions : function() {
            
            $( '#blog' ).on( 'click', '.blog-post h3', this.loadblogpost )
            $( '#blog' ).on( 'click', '.blog-post .thumbnail', this.loadblogpost )
            $( '#announcement' ).on( 'click', '.blog-post h3', this.loadannouncementpost )
            $( '#announcement' ).on( 'click', '.blog-post p', this.loadannouncementpost )

            
        },
        
        getSiteData : function() {
            
            $.get( RESTURL )
                .done( function( response ) {
                    $( '.site-title' ).html( response.name )
                    $( '.description' ).html( response.description )
                })
                .fail( function() {
                    alert( 'Oh no! We are struggling to get the latest data. Lets try that again. Please make sure you have a data connection.' )
                })

        },
        
           
        
        

        loadblog : function() {

               var url = RESTURL + 'wp/v2/posts?_embed&categories=2'

                $.get( url )
                .done( function( response ) {
                    
                    var posts = {
                        posts: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output_posts = $( '#blog' )
                                        
                    var result = Mustache.to_html( template, posts )
                    output_posts.append( result)
                    
                })
                .fail( function() {
                    alert( 'Oh no! We are struggling to get the latest data. Lets try that again. Please make sure you have a data connection.' )
                })
            
        },
        
        
        

        loadblogpost : function() {
            
            var id2 = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            var url = RESTURL + 'wp/v2/posts/' + id2 + '?_embed'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-post-template' ).html()
                    var output_posts = $( '#blog' )
                                        
                    var result = Mustache.to_html( template, response )
                    output_posts.html( result )

                    $(document).ready(function(){
                    $(this).scrollTop(0);
});

                    
                })
                .fail( function() {
                    alert( 'Oh no! We are struggling to get the latest data. Lets try that again. Please make sure you have a data connection.' )
                })
            
        },

         loadannouncement : function() {

               var url = RESTURL + 'wp/v2/posts?categories=3'

                $.get( url )
                .done( function( response ) {
                    
                    var announce = {
                        announce: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output_posts = $( '#announcement' )
                                        
                    var result = Mustache.to_html( template, announce )
                    output_posts.append( result)
                    
                })
                .fail( function() {
                    alert( 'Oh no! We are struggling to get the latest data. Lets try that again. Please make sure you have a data connection.' )
                })
            
        },
        
        
        

        loadannouncementpost : function() {
            
            var id2 = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            var url = RESTURL + 'wp/v2/posts/' + id2 + '?_embed'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-announcement-template' ).html()
                    var output_posts = $( '#announcement' )
                                        
                    var result = Mustache.to_html( template, response )
                    output_posts.html( result )

                    $(document).ready(function(){
                    $(this).scrollTop(0);
});

                    
                })
                .fail( function() {
                    alert( 'Oh no! We are struggling to get the latest data. Lets try that again. Please make sure you have a data connection.' )
                })
            
        },


                loadabout : function() {

               var url = RESTURL + 'wp/v2/pages?_embed&include=54'

                $.get( url )
                .done( function( response ) {
                    
                    var about = {
                        about: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output_posts = $( '#about' )
                                        
                    var result = Mustache.to_html( template, about )
                    output_posts.append( result)
                    
                })
                .fail( function() {
                    alert( 'Oh no! We are struggling to get the latest data. Lets try that again. Please make sure you have a data connection.' )
                })
            
        }
   
        
    }

    app.init();

});



