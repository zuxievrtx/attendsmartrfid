<section class="section_padding about_us">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-5 col-md-6">
                <?php if(!empty(pagesetting('home_about_area_image'))): ?>
                    <div class="about_us_img">
                        <div class="about_us_img_inner">
                            <img src="<?php echo e(pagesetting('home_about_area_image')[0]['thumbnail']); ?>"
                                alt="<?php echo e(__('edulia.Image')); ?>">
                        </div>
                    </div>
                <?php endif; ?>
            </div>
            <div class="col-lg-6 offset-lg-1 col-md-6">
                <div class="about_us_inner about_us_home">
                    <h3><?php echo e(pagesetting('home_about_area_header')); ?></h3>
                    <p><?php echo pagesetting('home_about_area_description'); ?></p>
                    <?php if(!empty(pagesetting('home_about_area_items'))): ?>
                        <ul>
                            <?php $__currentLoopData = pagesetting('home_about_area_items'); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <li><i class="far fa-check"></i><?php echo e($item['item_heading']); ?></li>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </ul>
                    <?php endif; ?>
                    <div class="about_us_inner_call">
                        <a href="tel:+426 322 764 22">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30.957" height="31.002"
                                viewBox="0 0 30.957 31.002">
                                <g id="phone-call" transform="translate(0.154 0.502)">
                                    <path id="Path_3909" data-name="Path 3909"
                                        d="M24.031,44.254a2.951,2.951,0,0,0-2.14-.981,3.051,3.051,0,0,0-2.165.975l-2,1.994c-.165-.089-.329-.171-.488-.253-.228-.114-.443-.222-.627-.336A21.745,21.745,0,0,1,11.4,40.9a12.829,12.829,0,0,1-1.71-2.7c.519-.475,1-.969,1.469-1.444.177-.177.355-.361.532-.538a2.9,2.9,0,0,0,0-4.381L9.963,30.116c-.2-.2-.4-.4-.589-.6-.38-.393-.779-.8-1.19-1.178a3,3,0,0,0-2.121-.931,3.1,3.1,0,0,0-2.153.931l-.013.013L1.744,30.521A4.632,4.632,0,0,0,.371,33.465a11.1,11.1,0,0,0,.81,4.7,27.262,27.262,0,0,0,4.844,8.079,29.8,29.8,0,0,0,9.922,7.769,15.458,15.458,0,0,0,5.572,1.646c.133.006.272.013.4.013A4.771,4.771,0,0,0,25.57,54.1c.006-.013.019-.019.025-.032A14.393,14.393,0,0,1,26.7,52.922c.272-.26.551-.532.823-.817a3.159,3.159,0,0,0,.956-2.191,3.043,3.043,0,0,0-.975-2.172ZM26.3,50.921c-.006,0-.006.006,0,0-.247.266-.5.507-.772.772A16.647,16.647,0,0,0,24.3,52.96a3.052,3.052,0,0,1-2.381,1.007c-.095,0-.2,0-.291-.006a13.733,13.733,0,0,1-4.939-1.482A28.125,28.125,0,0,1,7.348,45.16a25.7,25.7,0,0,1-4.559-7.592A9.04,9.04,0,0,1,2.08,33.6a2.906,2.906,0,0,1,.874-1.88l2.159-2.159a1.439,1.439,0,0,1,.962-.45A1.354,1.354,0,0,1,7,29.559l.019.019c.386.361.753.734,1.14,1.133.2.2.4.405.6.614l1.729,1.729a1.208,1.208,0,0,1,0,1.963c-.184.184-.361.367-.545.545-.532.545-1.038,1.051-1.589,1.545-.013.013-.025.019-.032.032a1.291,1.291,0,0,0-.329,1.437l.019.057a13.877,13.877,0,0,0,2.045,3.337l.006.006a23.239,23.239,0,0,0,5.622,5.116,8.646,8.646,0,0,0,.779.424c.228.114.443.222.627.336.025.013.051.032.076.044a1.372,1.372,0,0,0,.627.158,1.354,1.354,0,0,0,.962-.437l2.165-2.165a1.432,1.432,0,0,1,.956-.475,1.29,1.29,0,0,1,.912.462l.013.013,3.489,3.489A1.252,1.252,0,0,1,26.3,50.921Z"
                                        transform="translate(0 -25.67)" fill="#68ca65" stroke="#68ca65"
                                        stroke-width="1" />
                                    <path id="Path_3910" data-name="Path 3910"
                                        d="M245.648,87.622a8.152,8.152,0,0,1,6.638,6.638.85.85,0,0,0,.842.709,1.131,1.131,0,0,0,.146-.013.856.856,0,0,0,.7-.988,9.857,9.857,0,0,0-8.032-8.032.86.86,0,0,0-.988.7A.846.846,0,0,0,245.648,87.622Z"
                                        transform="translate(-229.115 -80.485)" fill="#68ca65" stroke="#68ca65"
                                        stroke-width="1" />
                                    <path id="Path_3911" data-name="Path 3911"
                                        d="M262.995,13.239A16.232,16.232,0,0,0,249.769.013.854.854,0,1,0,249.49,1.7a14.5,14.5,0,0,1,11.82,11.82.85.85,0,0,0,.842.709,1.131,1.131,0,0,0,.146-.013A.839.839,0,0,0,262.995,13.239Z"
                                        transform="translate(-232.707)" fill="#68ca65" stroke="#68ca65"
                                        stroke-width="1" />
                                </g>
                            </svg><?php echo e(pagesetting('home_about_area_phone')); ?></a>
                    </div>
                    <?php if(!empty(pagesetting('home_about_area_button'))): ?>
                        <a href="<?php echo e(pagesetting('home_about_area_button_link')); ?>" class="site_btn"><?php echo e(pagesetting('home_about_area_button')); ?></a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>
<?php /**PATH C:\laragon\www\smarttend\resources\views/themes/edulia/pagebuilder/home-about-area/view.blade.php ENDPATH**/ ?>