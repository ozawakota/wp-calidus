<?php get_header(); ?>
<div class="ttlArea">
	<div class="inner"><h2>News<span>お知らせ</span></h2></div>
</div>

<!-- =============================== contents area =============================== -->
<section id="news">
	<div class="inner">
		<div id="main">
			<ul>
				<?php
                $args = array(/* 配列（$args）に複数の引数を追加 */
                    'post_type' => 'post', /* 表示する投稿タイプを指定 */
                    'posts_per_page' => 15, /* 一覧に表示するページ数 */
                    'paged' => $paged,
                );
                ?>
				<?php query_posts($args); ?>
				<!-- メインの WordPress ループを変更するタグ -->
				<?php if (have_posts()) while (have_posts()) : the_post(); ?>
				<li class="detail_category">
					<dl>
						<?php $category = get_the_category();

                            $cat_name = $category[0]->cat_name;
                            $cat_slug = $category[0]->slug;
                            // var_export($category);
                            ?>
						<dt><?php the_time('Y.m.d'); ?><a
								href="<?php echo home_url(); ?>/category/<?php echo $cat_slug; ?>">

								<?php
                                    echo $cat_name; ?></a>
						</dt>
						<dd><a href="<?php the_permalink(); ?>">
								<?php
                                    if (mb_strlen($post->post_title) > 79) {
                                        $title = mb_substr($post->post_title, 0, 79);
                                        echo $title . '...';
                                    } else {
                                        echo $post->post_title;
                                    }
                                    ?></a></dd>
					</dl>
				</li>
				<?php endwhile; ?>
			</ul>
			<div class="pagination">
				<?php
                echo paginate_links(array(
                    'type' => 'list',
                    'prev_text' => '<img src="' . get_template_directory_uri() . '/img/arrow_l.png">',
                    'next_text' => '<img src="' . get_template_directory_uri() . '/img/arrow.png">'
                ));
                ?>
			</div>
		</div>
		<div id="side">
			<div class="ttl">カテゴリー</div>
			<ul class="cat-list">
				<li><a href="<?php echo home_url(); ?>/news/">全ての記事</a></li>
				<?php
                $args = array(
                    'title_li' => '',
                    'echo'     => 0,
                );
                $categories = wp_list_categories($args);

                $cat_serch   = array('"cat-item', 'children');             // 変換前の文字列.
                $cat_replace = array('"cat-list__item', 'cat-list-child'); // 変換後の文字列.
                $categories  = str_replace($cat_serch, $cat_replace, $categories);

                echo $categories;
                ?>
			</ul>
		</div>
	</div>
</section>
<!-- =============================== footer =============================== -->
<?php get_footer(); ?>