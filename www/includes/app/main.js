jQuery(document).ready(function ($) {

    const RESTURL = 'https://csademo.orangehousellc.com/wp-json/'

    var app = {
        
        init : function() {
            
            this.getSiteData()
            this.loadPosts()
            this.loadPosts2()
            */ this.loadCategories() /*
            this.loadEvents()
            
        },
        
        loadEvents : function() {
            
            $( '#main-content' ).on( 'click', '.blog-post h3', this.loadSinglePost )
            $( '#main-content' ).on( 'click', '.blog-post .thumbnail', this.loadSinglePost )
            $( '#main-content2' ).on( 'click', '.blog-post h3', this.loadSinglePost2 )
            $( '#main-content2' ).on( 'click', '.blog-post .thumbnail', this.loadSinglePost2 )
            
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
        
        loadPosts : function() {
            
            var url = RESTURL + 'wp/v2/pages?_embed'
            
            $.get( url )
                .done( function( response ) {
                    
                    var veggies = {
                        veggies: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output = $( '#main-content' )
                                        
                    var result = Mustache.to_html( template, veggies )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load posts' )
                })

        },

        loadPosts2 : function() {

               var url = RESTURL + 'wp/v2/posts?_embed'

                $.get( url )
                .done( function( response ) {
                    
                    var posts = {
                        posts: response
                    }
                    
                    var template = $( '#blog-post-template' ).html()
                    var output_posts = $( '#main-content2' )
                                        
                    var result = Mustache.to_html( template, posts )
                    output_posts.append( result)
                    
                })
                .fail( function() {
                    alert( 'cannot load posts' )
                })
            
        },
        
       /* loadCategories : function() {
            
            var url = RESTURL + 'wp/v2/categories'
            
            $.get( url )
                .done( function( response ) {
                    
                    var categories = {
                        categories : response
                    }
                    
                    var template = $( '#blog-categories-template' ).html()
                    var output = $( '#categories' )
                                        
                    var result = Mustache.to_html( template, categories )
                    output.append( result )
                    
                })
                .fail( function() {
                    alert( 'cannot load categories' )
                })
            

            var url2 = RESTURL + 'wp/v2/categories'
            
            $.get( url2 )
                .done( function( posts_response ) {
                    
                    var categories = {
                        categories : posts_response
                    }
                    
                    var template2 = $( '#blog-categories-template' ).html()
                    var output2 = $( '#categories' )
                                        
                    var result2 = Mustache.to_html( template2, categories )
                    output2.append( result2 )
                    
                })
                .fail( function() {
                    alert( 'cannot load categories' )
                })
        },*/
        
        loadSinglePost : function() {
            
            var id = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            var url = RESTURL + 'wp/v2/pages/' + id + '?_embed'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-post-template' ).html()
                    var output = $( '#main-content' )
                                        
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


        loadSinglePost2 : function() {
            
            var id2 = Math.abs( $( this ).parent( '.blog-post' ).data( 'id' ) )
            var url = RESTURL + 'wp/v2/posts/' + id2 + '?_embed'
            
            $.get( url )
                .done( function( response ) {

                    
                    var template = $( '#single-post-template' ).html()
                    var output_posts = $( '#main-content2' )
                                        
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



