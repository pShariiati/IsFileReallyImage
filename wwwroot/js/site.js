// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// isImage
//if (jQuery.validator != undefined) {
//}

var imageInputsWithProblems = [];

if (jQuery.validator) {
    jQuery.validator.addMethod('isImage', function (value, element, param) {
        var selectedFile = element.files[0];
        if (selectedFile === undefined) {
            return true;
        }
        var whiteListExtensions = $(element).data('val-whitelistextensions').split(',');
        if (!whiteListExtensions.includes(selectedFile.type)) {
            return false;
        }
        var currentElementId = $(element).attr('id');
        var currentForm = $(element).parents('form');

        if (imageInputsWithProblems.includes(currentElementId)) {
            removeItemInArray(imageInputsWithProblems, currentElementId);
            return false;
        }

        if ($('#image-preview-box-temp').length === 0) {
            $('body').append('<img class="d-none" id="image-preview-box-temp" />');
        }
        $('#image-preview-box-temp').attr('src', URL.createObjectURL(selectedFile));
        $('#image-preview-box-temp').off('error');
        $('#image-preview-box-temp').on('error',
            function () {
                imageInputsWithProblems.push(currentElementId);
                currentForm.validate().element(`#${currentElementId}`);
            });
        return true;
    });
    jQuery.validator.unobtrusive.adapters.addBool('isImage');
}

function removeItemInArray(arr, item) {
    var found = arr.indexOf(item);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(item);
    }
}
$('input[type="file"][data-val-isimage]').attr('accept', 'image/*')