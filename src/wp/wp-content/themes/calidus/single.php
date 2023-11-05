<?php get_header();?>
<!-- =============================== contents area =============================== -->
<section id="news">
	<div class="inner">
		<div id="main">
			<?php $category = get_the_category();
			$cat_name = $category[0]->cat_name;
			$cat_slug = $category[0]->slug;
			// var_export($category);
			?>
			<div class="tag">
				<?php the_time('Y.m.d'); ?><a href="<?php echo home_url(); ?>/category/<?php echo $cat_slug; ?>">
				<?php echo $cat_name; ?></a>
			</div>
			<h2><?php the_title(); ?></h2>
			<div class="txtArea">
				<?php the_content(); ?>
			</div>
			<div class="green_btn"><a href="<?php echo home_url(); ?>/news/" class="btn sub_btn">一覧へ戻る</a></div>
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
            $categories = wp_list_categories( $args );

            $cat_serch   = array( '"cat-item', 'children' );             // 変換前の文字列.
            $cat_replace = array( '"cat-list__item', 'cat-list-child' ); // 変換後の文字列.
            $categories  = str_replace( $cat_serch, $cat_replace, $categories );

            echo $categories;
            ?>
			</ul>
		</div>
	</div>
</section>
<!-- =============================== footer =============================== -->
<?php get_footer();?>