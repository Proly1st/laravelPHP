$(function (){

    axios({
        'method':'GET',
        'url':'get-api'
    }).then(function(response){
        if(response.data.status ===200){
            console.log(response.data.data.data)
            let data='';
            for(const v of response.data.data.data){


               data+=`
                <div class="list-post">
                <div class="post-info">
                        <img src="${'storage/images/admin.jpg'}" alt="avatar">
                        <div class="post-detail">
                            <span class="name">${v.name}</span>
                            <span class="time">${v.created_at}</span>

                        </div>
                    </div>
                    <div class="post-content">
                        <p>${v.jwt_token} </p>
                    </div>

                    <div class="horizontal-line"></div>
                    <ul class="post-feel">
                        <li>
                            <a href="#"><i class="fa-solid fa-eye"></i></a>
                            <a href="#"><i class="fa-solid fa-heart"></i></a>
                            <a href="#"><i class="fa-brands fa-rocketchat"></i></a>
                            <a href="#"><i class="fa-solid fa-share"></i></a>
                        </li>
                    </ul>  </div>`

            }

            $('.post1').html(data);
        }else{
            console.log(response.data.message)
        }

    })
})
