<?php

if ( ! filter_has_var(INPUT_GET, 'data') ) {
    include __DIR__.'/templates/landing.phtml';
}
else {
    header('Content-Type: text/json');
    
    if ( $_GET['data'] === 'all' ) {
        echo file_get_contents(__DIR__.'/data/storage.json');
    }
}