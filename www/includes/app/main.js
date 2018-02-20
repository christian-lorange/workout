jQuery(document).ready(function ($) {

    const RESTURL = 'https://wine.orangehousellc.com/wp-json/'

    var app = {
        
        init : function() {
            
            this.getSiteData()
            this.loadwine()
            this.loadblog()
            this.loadlocations()
            this.loadgallery()
           /* this.loadCategories() */
            this.loadActions()
    
            
        },
        
        loadActions : function() {
            
            $( '#wine-content' ).on( 'click', '.blog-post h3', this.loadwineposts )
            $( '#wine-content' ).on( 'click', '.blog-post .thumbnail', this.loadwineposts )
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
        
        loadwine : function() {
            
            var url = RESTURL + 'wp/v2/product?_embed=true&per_page=25'
            
            $.get( url )
                .done( function( response ) {
                    
                    var wine = {
                        wine: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output = $( '#wine-content' )
                                        
                    var result = Mustache.to_html( template, wine )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load posts' )
                })

        },

        loadlocations : function() {
          
            var url = RESTURL + 'wp/v2/pages?_embed=true/&include=2180'
            
            $.get( url )
                .done( function( response ) {
                    
                    var wine = {
                        wine: response
                    }
                    
                    var template = $( '#locations-post-template' ).html()
                    var output = $( '#locations-content' )
                                        
                    var result = Mustache.to_html( template, wine )
                    output.append( result )

                    
                })
                .fail( function() {
                    alert( 'cannot load posts' )
                })


        },

        loadgallery : function() {
          
            var url = RESTURL + 'wp/v2/pages?_embed=true/&include=2307'
            
            $.get( url )
                .done( function( response ) {
                    
                    var wine = {
                        wine: response
                    }
                    
                    var template = $( '#gallery-post-template' ).html()
                    var output = $( '#gallery-content' )
                                        
                    var result = Mustache.to_html( template, wine )
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
        
        
        loadwineposts : function() {
            
            var id = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            var url = RESTURL + 'wp/v2/product/' + id + '?_embed'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-post-template' ).html()
                    var output = $( '#wine-content' )
                                        
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

            

        loadeventposts : function() {
            
            var id = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            var url = RESTURL + 'wp/v2/pages/' + id + '?_embed=true'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-post-template' ).html()
                    var output = $( '#events-content' )
                                        
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



