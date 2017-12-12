$(document).ready(function() {
   
    // run functions on init;
    postCreator();
    // handle creation of new posts
    var csrf_token = $('meta[name="_csrf"]').attr('content');
    axios.defaults.headers.common['X-CSRF-Token'] = csrf_token;
    axios.defaults.baseURL = 'http://localhost:3000/api/';
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
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
            // $.ajax({
            //     type: "POST",
            //     beforeSend: function(request) {
            //       request.setRequestHeader('X-CSRF-Token', csrf_token);
            //     },
            //     url: "/api/posts/",
            //     data: JSON.stringify({data : dataToSend }),
            //     processData: false,
            //     success: function(msg) {
            //       console.log(msg);
            //     },
            //     error : function(msg){
            //         console.log(msg);
            //     }
            //   });
            
        })
    }




});