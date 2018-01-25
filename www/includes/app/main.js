jQuery(document).ready(function ($) {

    const RESTURL = 'https://csademo.orangehousellc.com/wp-json/'

    var app = {
        
        init : function() {
            
            this.getSiteData()
            this.loadveggies()
            this.loadblog()
            */ this.loadCategories() /*
            this.loadEvents()
            
        },
        
        loadEvents : function() {
            
            $( '#veggie-content' ).on( 'click', '.blog-post h3', this.loadveggieposts )
            $( '#veggie-content' ).on( 'click', '.blog-post .thumbnail', this.loadveggieposts )
            $( '#blog' ).on( 'click', '.blog-post h3', this.loadblogpost )
            $( '#blog' ).on( 'click', '.blog-post .thumbnail', this.loadblogpost )
            
        },
        
        getSiteData : function() {
            
            $.get( RESTURL )
                .done( function( response ) {
                    $( '.site-title' ).html( response.name )
                    $( '.description' ).html( response.description )
                })
                .fail( function() {
                    alert( 'failed to call specified URL' )
                })

        },
        
        loadveggies : function() {
            
            var url = RESTURL + 'wp/v2/pages?_embed=true/&exclude=12, 48,2,772,1811,696,2187,2213,2180,2248'
            
            $.get( url )
                .done( function( response ) {
                    
                    var veggies = {
                        veggies: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output = $( '#veggie-content' )
                                        
                    var result = Mustache.to_html( template, veggies )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load posts' )
                })

        },

        loadblog : function() {

               var url = RESTURL + 'wp/v2/posts?_embed'

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
                    alert( 'cannot load posts' )
                })
            
        },
        
        
        loadveggieposts : function() {
            
            var id = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            var url = RESTURL + 'wp/v2/pages/' + id + '?_embed'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-post-template' ).html()
                    var output = $( '#veggie-content' )
                                        
                    var result = Mustache.to_html( template, response )
                    output.html( result )

                    $(document).ready(function(){
                    $(this).scrollTop(0);
});


                    
                })
                .fail( function() {
                    alert( 'cannot load post' )
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
                    alert( 'cannot load post' )
                })
            
        }
   
        
    }

    app.init();

});



