function template(name) {
    return 'assets/mustache/'+name+'.mustache';
}

$(document).on('ui:init', function() {
    $('.ui-list').each(function() {
        var target = $(this);
        var objective = target.data('template');
        var file = template(target.data('template'));
        
        Ractive.load(file).then(function(template) {
            ui[objective] = new template({
                el: target
            });
            
            $(document).trigger('ui:data:load', [target]);
        }).catch(function() {
            toast(
                'Unable to load mustache: ' + objective + '(' + file + ')', 
                undefined, 
                'red accent-4'
            );    
        });
    });
});

$(document).on('ui:data:load', function(event, target) {
    var target = $(target);
    var objective = $(target).data('template');
    
    $.getJSON('index.php', { data: target.data('query') }).done(function(data) {
        ui[objective].set(data);
    }).fail(function() {
        toast('Error: Failed to load data for `' + objective + '` !', undefined , 'red accent-4');
    });
});

$(document).ready(function() {
    ui = {};
    var init = $(this).trigger('ui:init');
});