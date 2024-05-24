<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Profile</title>
    <!-- CSS -->
    <link href="{{ asset('asset/css/style.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<header class="header">
    <div class="logo">
        <img src="{{ asset('asset/images/logo.png') }}" alt="Logo">
    </div>
    <div class="nav">
        <div class="search">

            <input type="text" placeholder="Search People, Pages, Group etc" class="search-input">

            <button class="search-button">
                <i class="fas fa-search"></i>
            </button>

        </div>
        <span class="page-name">Timeline</span>
        <ul class="sub-nav">
            <li><a>
                    <i class="fa-solid fa-house"></i>
                </a></li>
            <li><a>
                    <span style="background-color:#E44A3C ">5</span>
                    <i class="fa-solid fa-user-group">
                    </i></a></li>
            <li><a>
                    <span style="background-color:#7650f8 ">7</span>
                    <i class="fa-solid fa-bell"></i>
                </a></li>
            <li><a>
                    <span style="background-color:#3BA9FB ">7</span>
                    <i class="fa-regular fa-message"></i>
                </a></li>
            <li><a>
                    <span>EN</span>
                    <i class="fa-solid fa-globe"></i>
                </a></li>
            <li><a> <i class="fa-regular fa-circle-question"></i></a></li>
        </ul>
    </div>
    <div class="profile">
        <i class="fa-solid fa-braille"></i>

        <h5 class="user-img">Jack Carter</h5>
        <img src="{{ asset('asset/images/admin.jpg') }}" alt="user-img">
        <i class="fa-solid fa-gear"></i>
    </div>
</header>

<div class="main">
    <div class="left">
        <i style="background-color: #30305B ; color: #fff" class="fa-solid fa-bars"></i>
        <i class="fa-solid fa-store"></i>
        <i class="fa-brands fa-forumbee"></i>
        <i class="fa-regular fa-user"></i>
        <i class="fa-solid fa-star-of-life"></i>
        <i class="fa-regular fa-message"></i>
        <i class="fa-solid fa-bell"></i>
        <i class="fa-solid fa-chart-line"></i>
        <i class="fa-regular fa-circle-question"></i>
        <i class="fa-regular fa-lightbulb"></i>
    </div>

    <div class="content">
        <div class="content-top">
            <img class="profile-background" src="{{asset('asset/images/profile-image.jpg')}}" alt="profile-image">
            <img class="avatar" src="{{asset('asset/images/author.jpg')}}" alt="author">
            <div class="star">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i style="color: #C9C9C9" class="fa-solid fa-star"></i>
                <span> 4.7/5</span>
            </div>

            <div class="profile-control">
                <a style="background-color: #FA6341"> <i class="fa-solid fa-user-plus"></i></a>
                <a style="background-color: #7650F8"> <i class="fa-solid fa-star"></i></a>
                <a style="background-color: #3BA9FB"> <i class="fa-solid fa-comment"></i></a>
                <a style="background-color: #847EC2"> <i class="fa-solid fa-grip"></i></a>
            </div>

            <div class="profile-section">
                <div class="info">
                    <h4 class="name">Jack Carter</h4>
                    <p class="country">Ontario, CA</p>
                </div>

                <div class="profile-menu">
                    <a style="color: #FA6341" href="#">Timeline </a>
                    {{--<i class="caret-up fa-solid fa-caret-up"></i>--}}
                    <a href="#">About</a>
                    <a href="#">Friends</a>
                    <a href="#">Photo</a>
                    <a href="#">Videos</a>
                    <i class="etc fa-solid fa-ellipsis"></i>

                </div>

                <div class="follow-detail">
                    <span>Posts<ins>101</ins></span>

                    <span>Followers<ins>1.3K</ins></span>

                    <span>Following<ins>22</ins></span>

                </div>
            </div>
        </div>

        <div class="content-bottom">

            <div class="user-badges">

                <h4 class="badges-title">User Badges <a href="#"> See All</a></h4>

                <div class="list-badges">

                    <a href="#">
                        <img src="{{ asset('asset/images/badge2.png') }}" alt="img">
                    </a>
                    <a href="#">
                        <img src="{{ asset('asset/images/badge2.png') }}" alt="img">
                    </a>
                    <a href="#">
                        <img src="{{ asset('asset/images/badge2.png') }}" alt="img">
                    </a>
                    <a href="#">
                        <img src="{{ asset('asset/images/badge2.png') }}" alt="img">
                    </a>
                    <a href="#">
                        <img src="{{ asset('asset/images/badge2.png') }}" alt="img">
                    </a>
                    <a href="#">
                        <img src="{{ asset('asset/images/badge2.png') }}" alt="img">
                    </a>
                    <a href="#">
                        <img src="{{ asset('asset/images/badge2.png') }}" alt="img">
                    </a>
                    <a href="#">
                        <img src="{{ asset('asset/images/badge2.png') }}" alt="img">
                    </a>

                </div>
            </div>

            <div class="content-center">
                <div class="create-post">
                    <span>Create Post</span>
                    <div class="horizontal-line"></div>
                    <div class="write-post">
                        <img src="{{ asset('asset/images/admin.jpg') }}" alt="user-img">
                        <input type="text" placeholder="Share some what you are thinking?" class="search-input">

                    </div>
                    <ul class="post-icon">
                        <li>
                            <a href="#"><i class="fa-solid fa-location-dot"></i></a>
                            <a href="#"><i class="fa-solid fa-music"></i></a>
                            <a href="#"><i class="fa-solid fa-image"></i></a>
                            <a href="#"><i class="fa-solid fa-camera-retro"></i></a>
                            <a href="#"><i class="fa-solid fa-camera-retro"></i></a>
                        </li>
                    </ul>

                    <p class="post-submit">Post</p>

                </div>

                <div class="post1">

                </div>





            </div>

            <div class="your-page">
                <div class="sub-page">
                    <h4>Your Page</h4>

                    <div class="my-page">
                        <img src="{{asset('asset/images/friend-avatar9.jpg')}}" alt="friend">
                        <ul>
                            <li><a class="title" href="#">My Creative Page</a></li>
                            <li><i class="fa-regular fa-message"></i> <a href="#">Messages </a></li>
                            <li><i class="fa-solid fa-bell"></i> <a href="#">Notifications </a></li>
                        </ul>
                    </div>
                    <div class="horizontal-line"></div>
                    <ul class="your-page-icon">
                        <li>
                            <i class="fa-solid fa-image"></i>
                            <a href="#">Publish</a>
                        </li>
                        <li>
                            <i class="fa-solid fa-image"></i>
                            <a href="#">Photo</a>
                        </li>
                        <li>
                            <i class="fa-solid fa-image"></i>
                            <a href="#">Live</a>
                        </li>
                        <li>
                            <i class="fa-solid fa-image"></i>
                            <a href="#">Invite</a>
                        </li>
                    </ul>
                    <div class="horizontal-line"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="right">
        <img src="{{ asset('asset/images/side-friend1.jpg') }}" alt="side-friend1">
        <img src="{{ asset('asset/images/side-friend2.jpg') }}" alt="side-friend2">
        <img src="{{ asset('asset/images/side-friend3.jpg') }}" alt="side-friend3">
        <img src="{{ asset('asset/images/side-friend4.jpg') }}" alt="side-friend4">
        <img src="{{ asset('asset/images/side-friend5.jpg') }}" alt="side-friend5">
        <img src="{{ asset('asset/images/side-friend6.jpg') }}" alt="side-friend6">
        <img src="{{ asset('asset/images/side-friend7.jpg') }}" alt="side-friend7">
        <img src="{{ asset('asset/images/side-friend8.jpg') }}" alt="side-friend8">
        <img src="{{ asset('asset/images/side-friend9.jpg') }}" alt="side-friend9">
        <img src="{{ asset('asset/images/side-friend10.jpg') }}" alt="side-friend10">
        <img src="{{ asset('asset/images/side-friend8.jpg') }}" alt="side-friend8">

    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/2.0.7/js/dataTables.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script src="{{asset("asset/api-layout-b1.js")}}"></script>

</body>
</html>

