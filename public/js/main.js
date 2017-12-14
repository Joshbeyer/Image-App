$(document).ready(function() {
   
    // run functions on init;
    postCreator();
    searchPosts();

    // atatch csrf token for requeusts;
    var csrf_token = $('meta[name="_csrf"]').attr('content');
    axios.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    axios.defaults.baseURL = 'http://localhost:3000/api/';
 
    function postCreator(){
        var postCreatorForm = $('.post-creator-form');

        if(postCreatorForm.length == 0){
            return;
        }

        postCreatorForm.submit(function(e){
            e.preventDefault();
            var postTitle = postCreatorForm.find('#post-title').val();
         
            var dataToSend = {
                postTitle : postTitle
            }
            axios.post('/posts', dataToSend)
            .then(function(response){
                console.log(response);
            })
            .catch(function(err){
                console.log(err);
            })  
        })
    }

    var page = 1;
    $('#getMorePosts').on('click', function(e){
        
        e.preventDefault();
        axios.get('/posts', { params : {page : page}})
        .then(function(response){
            console.log(response);
            page++;
            $('.posts-list').loadTemplate($('#post-template'), response.data.posts);
        })
        .catch(function(err){
                console.log(err);
        })  

    })


    function searchPosts(){
         var searchForm = $('.post-search-form');

         if(searchForm.length == 0){
            return;
         }

         searchForm.submit(function(e){
            console.log('we here');
            e.preventDefault();
            var postTitle = searchForm.find('#post-title').val();
            axios.get('/posts', { params : {search : {postTitle : postTitle}}})
            .then(function(response){
                console.log(response);
               
                $('.search-posts-results').loadTemplate($('#post-template'), response.data.posts);
            })
            .catch(function(err){
                    console.log(err);
            })  
         })

    }




});