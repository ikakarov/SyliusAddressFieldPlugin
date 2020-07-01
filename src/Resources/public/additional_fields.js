$(document).ready(()=>{
    function additionalField () {
        const countrySelect = $('select[name$="[countryCode]"]');
        const addedFieldContainer = countrySelect.parents('form').find('.js-added-field-container');
        countrySelect.on('change', (event) => {
            const select = $(event.currentTarget);
            const form = select.parents('form');
            addedFieldContainer.attr('data-loading', true);
            form.addClass('loading');
            
            $.get(addedFieldContainer.attr('data-url'), {
                base_data: $(addedFieldContainer).data(),
                countryCode: select.val()
            }, (response) => {
                if (!response.content) {
                    addedFieldContainer.fadeOut('slow', () => {
                        addedFieldContainer.html('');
                        
                        addedFieldContainer.removeAttr('data-loading');
                        form.removeClass('loading');
                    });
                } else {
                    addedFieldContainer.fadeOut('slow', () => {
                        addedFieldContainer.html((response.content));
                        
                        addedFieldContainer.removeAttr('data-loading');
                        
                        addedFieldContainer.fadeIn('fast', () => {
                            form.removeClass('loading');
                        });
                    });
                }
            });
        });
        
        if (addedFieldContainer.data('no-init') != 1 && countrySelect.val() !== '') {
            countrySelect.trigger('change');
        }
        
        if ($.trim($('div.js-added-field-container').text()) === '') {
            $('select.country-select').trigger('change');
        }
    }
    additionalField();
});
