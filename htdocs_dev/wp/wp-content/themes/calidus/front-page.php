<?php get_header();?>
<!-- FV -->
<section id="fv">
    <div class="keyimg"></div>
    <div class="inner txtArea">
        <img src="<?php echo get_template_directory_uri(); ?>/img/logo.svg" class="logo" alt="Calidus｜カリダス">
        <p><span>温かいお弁当</span>を20秒で瞬時に提供<br>自動販売機の<span>新体験</span>をあなたの街に</p>
        <a href="#contact" class="btn">導入についてのお問い合わせ</a>
        <img src="<?php echo get_template_directory_uri(); ?>/img/key_img.png" class="main" alt="Calidus｜カリダス">
    </div>
</section>
<!-- News：最新記事 -->
<section id="news_new">
    <div class="inner">
        <?php
        $args = array(/* 配列（$args）に複数の引数を追加 */
        'post_type' => 'post', /* 表示する投稿タイプを指定 */
        'posts_per_page' => 1, /* 一覧に表示するページ数 */
        );
        ?>
        <?php query_posts( $args ); ?><!-- メインの WordPress ループを変更するタグ -->
        <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
        <div class="new">
            <p class="date">
                <?php the_time('Y.m.d'); ?><span>New</span>
            </p>
            <p class="txtArea"><a href="<?php the_permalink(); ?>">
            <?php
                if(mb_strlen($post->post_title)>41) {
                  $title= mb_substr($post->post_title,0,41) ;
                    echo $title . '...';
                  } else {
                    echo $post->post_title;
                  }
                ?></a>
            </p>
        </div>
    </div>
    <?php endwhile; ?>
</section>
<!-- ABOUT：Calidus：カリダスについて -->
<section id="about">
    <div class="inner">
        <div class="imgArea">
            <img src="<?php echo get_template_directory_uri(); ?>/img/about_img_pc.png" class="change" alt="Calidus：カリダスについて">
        </div>
        <div class="txtArea">

            <h2>About<span>Calidus：カリダスについて</span></h2>
            <p>Calidus：カリダスは、<span>できたてのような温かいお弁当</span>を20秒以内に提供できる、<span>「温蔵式自動販売機サービス」</span>です。</p>
            <ul>
                <li><img src="<?php echo get_template_directory_uri(); ?>/img/about01.png" alt="タッチパネルで選択">タッチパネルで<br class="for_pc">選択</li>
                <li><img src="<?php echo get_template_directory_uri(); ?>/img/about02.png" alt="クレジット・QR等キャッシュレス決済">クレジット・QR等<br>キャッシュレス決済</li>
                <li><img src="<?php echo get_template_directory_uri(); ?>/img/about03.png" alt="20秒以内にお弁当受け取り">20秒以内に<br>お弁当受け取り</li>
            </ul>
            <p>毎日を忙しく過ごす街の人々に、<span>すぐに食べられる温かいお弁当を届け</span>ます。<br>Calidus：カリダスは<span>街の人と飲食店の新たな関係を提案</span>します。</p>
        </div>
    </div>
</section>
<!-- Value：Calidus：カリダスが提供する価値 -->
<section id="value">
    <div class="inner">
        <h2>Value<span>Calidus：カリダスが提供する価値</span></h2>
        <ul class="contentsArea">
            <li class="list">
                <div class="txtArea">
                    <h3>地域活性化</h3>
                    <p class="for"><span>FOR</span>ディベロッパー・施設管理者・場所提供者</p>
                    <ul>
                        <li>
                            <dl>
                                <dt>利便性向上</dt>
                                <dd>ビジネス街やベッドタウンに新たな「食」の場所を</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>人流創出</dt>
                                <dd>中身を定期的に入れ替え、利用者にいつも違う「新たな楽しみ」を</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="imgArea">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/value01.png" alt="地域活性化">
                </div>
            </li>
            <li class="list">
                <div class="txtArea">
                    <h3>販路拡大</h3>
                    <p class="for"><span>FOR</span>店舗運営・食品製造者</p>
                    <ul>
                        <li>
                            <dl>
                                <dt>低投資で販売エリア拡大可能</dt>
                                <dd>店舗が入れないスペースでも販売可能</dd>
                                <dd>出店候補地の事前需要確認のツールとして活用</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>人手不足の”解決策”</dt>
                                <dd>商品提供の自動化で人手不足のお悩みも解消</dd>
                                <dd>シフト組が難しいピークタイム対応も自販機なら簡単</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="imgArea">
                   <img src="<?php echo get_template_directory_uri(); ?>/img/value02.png" alt="販路拡大">
                </div>
            </li>
            <li class="list">
                <div class="txtArea">
                    <h3>地域連携</h3>
                    <p class="for"><span>FOR</span>ディベロッパー・施設管理者・場所提供者・店舗運営、食品製造者</p>
                    <ul>
                        <li>
                            <dl>
                                <dt>地域連携</dt>
                                <dd>その土地で愛されている個人飲食店などともコラボレーション可能</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>人流創出</dt>
                                <dd>期間と場所を限定したイベント設計ができるため、場所提供者、飲食店の双方にとって取り組みやすい</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="imgArea">
                    <img src="<?php echo get_template_directory_uri(); ?>/img/value03.png" alt="地域連携">
                </div>
            </li>
        </ul>
        <img src="<?php echo get_template_directory_uri(); ?>/img/value_txt.svg" class="value_txt" alt="Value：Calidus：カリダスが提供する価値">
    </div>
</section>
<!-- Case Study：導入事例 -->
<section id="casestudy">
    <div class="inner">
        <div class="contentsArea">
            <div class="txtArea">
                <h2>Case study<span>導入事例</span></h2>
                <p>香港の街中、駅、学校、工事現場などで<span>40台以上のCalidus：カリダスが稼働中</span>です。<br>外食チェーン様や鉄道会社様と協業し、日々<span>提供場所とメニューを増やしながら成長</span>しています。</p>
            </div>
            <div class="imgArea">
                <img src="<?php echo get_template_directory_uri(); ?>/img/casestudy_img_pc.png" class="change" alt="導入事例">
            </div>
        </div>
        <h3>設置場所例</h3>
        <ul>
            <li><img src="<?php echo get_template_directory_uri(); ?>/img/casestudy01.png" alt="コワーキングスペース">コワーキング<br>スペース</li>
            <li><img src="<?php echo get_template_directory_uri(); ?>/img/casestudy02.png" alt="駅">駅</li>
            <li><img src="<?php echo get_template_directory_uri(); ?>/img/casestudy03.png" alt="ショッピングモール">ショッピング<br>モール</li>
            <li><img src="<?php echo get_template_directory_uri(); ?>/img/casestudy04.png" alt="企業や学校の食堂">企業や学校の食堂</li>
            <li><img src="<?php echo get_template_directory_uri(); ?>/img/casestudy05.png" alt="病院">病院</li>
            <li><img src="<?php echo get_template_directory_uri(); ?>/img/casestudy06.png" alt="建設現場">建設現場</li>
        </ul>
    </div>
</section>
<!-- Flow：導入までの流れ -->
<section id="flow">
    <div class="inner">
    <h2>Flow<span>導入までの流れ</span></h2>
        <ul>
            <li>
                <img src="<?php echo get_template_directory_uri(); ?>/img/flow_num01.svg" class="num" alt="no.1"><img src="<?php echo get_template_directory_uri(); ?>/img/flow01.png" alt="流れ0
                1"><p><a href="#contact">お問い合わせフォーム</a><br>からご連絡ください</p>
            </li>
            <li>
                <img src="<?php echo get_template_directory_uri(); ?>/img/flow_num02.svg" class="num" alt="no.2"><img src="<?php echo get_template_directory_uri(); ?>/img/flow02.png" alt="流れ02"><p>営業担当から設置場所・<br>販売予定の食品・実施希望時期<br>等に関するヒアリングを実施</p>
            </li>
            <li>
                <img src="<?php echo get_template_directory_uri(); ?>/img/flow_num03.svg" class="num" alt="no.3"><img src="<?php echo get_template_directory_uri(); ?>/img/flow03.png" alt="流れ03"><p>販売メニューに関するご相談や<br>届け出関連のサポートを実施</p>
            </li>
            <li>
                <img src="<?php echo get_template_directory_uri(); ?>/img/flow_num04.svg" class="num" alt="no.4"><img src="<?php echo get_template_directory_uri(); ?>/img/flow04.png" alt="流れ04"><p>Caidus：カリダス設置後、<br>販売スタート</p>
            </li>
        </ul>
    </div>
</section>
<!-- Contact：お問い合わせ -->
<section id="contact">
    <div class="inner">
        <div class="contentsArea">
            <h2>Contact<span>お問い合わせ</span></h2>
            <?php echo do_shortcode('[contact-form-7 id="fe24716" title="お問い合わせフォーム"]'); ?>
        </div>
        <img src="<?php echo get_template_directory_uri(); ?>/img/contact_txt.svg" class="contact_txt" alt="お問い合わせ">
    </div>
</section>
<!-- News：ニュース -->
<section id="top_news">
    <h2>News<span>お知らせ</span></h2>
    <ul class="inner">
        <?php
            $args = array(/* 配列（$args）に複数の引数を追加 */
            'post_type' => 'post', /* 表示する投稿タイプを指定 */
            'posts_per_page' => 5, /* 一覧に表示するページ数 */
            );
        ?>
        <?php query_posts( $args ); ?><!-- メインの WordPress ループを変更するタグ -->
        <?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
        <li>
            <dl>
                <dt><?php the_time('Y.m.d'); ?><span><?php $category = get_the_category(); $cat_name = $category[0]->cat_name; echo $cat_name; ?></span></dt>
                <dd><a href="<?php the_permalink(); ?>">
                <?php
                    if(mb_strlen($post->post_title)>81) {
                      $title= mb_substr($post->post_title,0,81) ;
                        echo $title . '...';
                      } else {
                        echo $post->post_title;
                      }
                    ?></a></dd>
            </dl>
        </li>
        <?php endwhile; ?>
    </ul>
   <a href="<?php echo home_url(); ?>/news/" class="btn sub_btn">もっと見る</a>
</section>
<!-- Company：運営会社 -->
<section id="company">
    <div class="inner">
        <div class="ttlArea">
            <h2>Company<span>運営会社</span></h2>
        </div>
        <div class="contentsArea">
            <div class="company first">
                <h3>運営会社</h3>
                <p>和田フードテック株式会社</p>
                <table>
                    <tr>
                        <th>所在地</th>
                        <td>大阪市北区角田町1番12号 阪急ファイブアネックスビル GVH#5</td>
                    </tr>
                    <tr>
                        <th>代表者</th>
                        <td>ジェイソン・チェン</td>
                    </tr>
                    <tr>
                        <th>事業概要</th>
                        <td>日本国内に於けるホットチェーン自動販売機プラットフォームの展開</td>
                    </tr>
                </table>
            </div>
            <div class="company">
                <h3>共同運営会社</h3>
                <p>原田産業株式会社</p>
                <table>
                    <tr>
                        <th>所在地</th>
                        <td>大阪府大阪市中央区南船場二丁目10番14号</td>
                    </tr>
                    <tr>
                        <th>代表者</th>
                        <td>原田 暁</td>
                    </tr>
                    <tr>
                        <th>事業概要</th>
                        <td>導体、液晶、情報通信、医療、介護、造船、建築、環境、食品、コンシューマープロダクト等の業界向け機器・資材の輸出入及び国内販売</td>
                    </tr>
                    <tr>
                        <th>HP</th>
                        <td><a href="https://www.haradacorp.co.jp/" target="_blank">https://www.haradacorp.co.jp/</a></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</section>
<!-- =============================== footer =============================== -->
<?php get_footer();?>