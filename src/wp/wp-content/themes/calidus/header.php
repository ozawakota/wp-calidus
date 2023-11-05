<!doctype html>
<html lang="ja">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
<?php wp_head()?>
<link href="<?php echo get_template_directory_uri(); ?>/CSS/reset.css" rel="stylesheet" type="text/css">
<link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet" type="text/css">
<link href="<?php echo get_template_directory_uri(); ?>/style_sp.css" rel="stylesheet" type="text/css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Poppins:wght@500&display=swap" rel="stylesheet">
</head>

<body>

<!--  header  -->
<header class="for_pc pc_header">
    <div class="header__inner">
         <h1><a href="<?php echo home_url(); ?>/" class="header__logo"><img src="<?php echo get_template_directory_uri(); ?>/img/logo.svg" alt="Calidus｜カリダス"></a></h1>
        <div class="header__navgroup">
            <div class="header__navitem"><a href="<?php echo esc_url( home_url( '/' ) ); ?>#about">カリダスについて</a></div>
            <div class="header__navitem"><a href="<?php echo esc_url( home_url( '/' ) ); ?>#value">カリダスが提供する価値</a></div>
            <div class="header__navitem"><a href="<?php echo esc_url( home_url( '/' ) ); ?>#casestudy">導入事例</a></div>
            <div class="header__navitem"><a href="<?php echo esc_url( home_url( '/' ) ); ?>#flow">導入までの流れ</a></div>
            <div class="header__navitem"><a href=<?php echo esc_url( home_url( '/' ) ); ?>#company>運営会社</a></div>
            <div class="header__navitem"><a href="<?php echo home_url(); ?>/news/">お知らせ</a></div>
            <div class="header__navitem con_btn"><a href="<?php echo esc_url( home_url( '/' ) ); ?>#contact" class="btn">お問い合わせ</a></div>
        </div>
    </div>
</header>
<header class="for_sp sp_header">
    <div class="logo"><a href="<?php echo home_url(); ?>/"><img src="<?php echo get_template_directory_uri(); ?>/img/common/logo.svg" alt="printio"></a></div>
    <div class="nav">
        <!-- ハンバーガー -->
        <nav class="NavMenu">
            <ul>
                <li><a href="<?php echo home_url(); ?>/"><img src="<?php echo get_template_directory_uri(); ?>/img/logo.svg" alt="Calidus｜カリダス"></a></li>
                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>#about">カリダスについて</a></li>
                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>#value">カリダスが提供する価値</a></li>
                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>#casestudy">導入事例</a></li>
                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>#flow">導入までの流れ</a></li>
                <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>#company">運営会社</a></li>
                <li>
                 <li><a href="<?php echo home_url(); ?>/news/">お知らせ</a></li>
                    <dl>
                        <dd class="contact"><a href="<?php echo esc_url( home_url( '/' ) ); ?>#contact" class="btn">お問い合わせ</a></dd>
                    </dl>
                </li>
            </ul>
        </nav>
        <!-- メニュー -->
        <div class="Toggle for_sp">
            <span class="toggle-span"></span>
            <span></span>
            <span></span>
        </div>
    </div>
</header>