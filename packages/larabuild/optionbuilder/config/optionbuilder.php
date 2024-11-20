<?php

return [

    /*
     |
     | Settings for configuring the Option Builder.
     |
     */
    'layout'                                => 'layouts.builder',                   // default layout name 
    'section'                               => 'content',                       // default section variable name 
    'style_var'                             => 'styles',                        // push style variable for style css
    'script_var'                            => 'scripts',                       // push scripts variable for custom js and scripts files
    'db_prefix'                             => 'optionbuilder__',
    'url_prefix'                            => '',                              // like admin if you are using it in admin panel
    'route_middleware'                      => [],                              // route middlewares like auth, role etc
    'developer_mode'                        =>  'yes',                          // yes/no to enable developer mode 
    
    // assets publishing
    'add_bootstrap'                         => 'yes',                            // yes/no to add/remove bootstrap assets from the package 
    'add_jquery'                            => 'yes',                            // yes/no to add/remove jquery js from the package
    'add_select2'                           => 'yes',                            // yes/no to add/remove select assets from the package
    
];   